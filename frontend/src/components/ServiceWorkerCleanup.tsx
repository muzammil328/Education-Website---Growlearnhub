'use client';

import { useEffect } from 'react';

// PWA support has been removed. This unregisters any service worker and
// clears caches left behind on returning visitors' browsers, since a stale
// SW would otherwise keep intercepting requests with offline fallbacks.
export default function ServiceWorkerCleanup() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
      });
    }
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
    }
  }, []);

  return null;
}
