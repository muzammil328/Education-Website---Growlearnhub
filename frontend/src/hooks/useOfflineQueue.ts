'use client';

import { useCallback } from 'react';

const DB_NAME = 'glh-offline-queue';
const STORE = 'attempts';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = e => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Queue an MCQ attempt for background sync when offline.
 * Callers should use this as a fallback inside tRPC onError.
 */
export function useOfflineQueue() {
  const queueAttempt = useCallback(async (payload: {
    url: string;
    headers?: Record<string, string>;
    body: string;
  }) => {
    // Tell service worker to queue it (preferred — SW handles the flush)
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'QUEUE_ATTEMPT', payload });
      return;
    }

    // Fallback: store directly in IndexedDB (SW will pick up on next registration)
    try {
      const db = await openDB();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).add({ ...payload, queuedAt: Date.now() });
    } catch {
      // Silently fail — attempt is lost if no storage
    }
  }, []);

  /** Flush any locally-queued attempts now that we're online */
  const flushQueue = useCallback(async (tRPCUrl: string, cookies: string) => {
    if (!('indexedDB' in window)) return;
    try {
      const db = await openDB();
      const all: Array<{ id: number; url: string; headers: Record<string, string>; body: string }> = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).getAll();
        req.onsuccess = () => resolve(req.result as typeof all);
        req.onerror = () => reject(req.error);
      });

      for (const item of all) {
        try {
          const res = await fetch(item.url ?? tRPCUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Cookie: cookies, ...item.headers },
            body: item.body,
            credentials: 'include',
          });
          if (res.ok) {
            const tx2 = db.transaction(STORE, 'readwrite');
            tx2.objectStore(STORE).delete(item.id);
          }
        } catch {
          // Keep in queue
        }
      }
    } catch {
      // IndexedDB unavailable
    }
  }, []);

  return { queueAttempt, flushQueue };
}
