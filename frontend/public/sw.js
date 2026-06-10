const CACHE_NAME = 'glh-v1';
const OFFLINE_QUEUE_DB = 'glh-offline-queue';
const OFFLINE_QUEUE_STORE = 'attempts';

// Static assets to precache on install
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/favicon/favicon.ico',
  '/manifest.json',
];

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

// ─── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and browser-extension requests
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // tRPC / API calls → network-first, no cache
  if (url.pathname.startsWith('/trpc') || url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({ error: 'offline' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 503,
      }))
    );
    return;
  }

  // Next.js static assets (_next/static) → cache-first
  if (url.pathname.startsWith('/_next/static')) {
    event.respondWith(
      caches.match(request).then(cached => cached ?? fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return res;
      }))
    );
    return;
  }

  // Images → cache-first with 7-day TTL (stored in cache, no metadata needed)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => cached ?? fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => new Response('', { status: 404 })))
    );
    return;
  }

  // HTML pages → network-first, fall back to cache, then /offline
  event.respondWith(
    fetch(request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return res;
      })
      .catch(() => caches.match(request).then(cached => cached ?? caches.match('/offline')))
  );
});

// ─── Background Sync ──────────────────────────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'mcq-attempt-sync') {
    event.waitUntil(flushOfflineQueue());
  }
});

async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(OFFLINE_QUEUE_DB, 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(OFFLINE_QUEUE_STORE, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = () => reject(req.error);
  });
}

async function flushOfflineQueue() {
  const db = await openDB();
  const tx = db.transaction(OFFLINE_QUEUE_STORE, 'readwrite');
  const store = tx.objectStore(OFFLINE_QUEUE_STORE);
  const all = await new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  for (const item of all) {
    try {
      const res = await fetch(item.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...item.headers },
        body: item.body,
        credentials: 'include',
      });
      if (res.ok) {
        await new Promise((resolve, reject) => {
          const del = db.transaction(OFFLINE_QUEUE_STORE, 'readwrite').objectStore(OFFLINE_QUEUE_STORE).delete(item.id);
          del.onsuccess = resolve;
          del.onerror = reject;
        });
      }
    } catch {
      // Leave in queue to retry next sync
    }
  }
}

// ─── Message from client ──────────────────────────────────────────────────────
// Clients post { type: 'QUEUE_ATTEMPT', payload: { url, headers, body } }
self.addEventListener('message', event => {
  if (event.data?.type === 'QUEUE_ATTEMPT') {
    openDB().then(db => {
      const tx = db.transaction(OFFLINE_QUEUE_STORE, 'readwrite');
      tx.objectStore(OFFLINE_QUEUE_STORE).add({
        url: event.data.payload.url,
        headers: event.data.payload.headers ?? {},
        body: event.data.payload.body,
        queuedAt: Date.now(),
      });
    });
  }
});
