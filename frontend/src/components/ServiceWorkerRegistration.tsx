'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(reg => {
          // Trigger background sync when coming back online
          window.addEventListener('online', () => {
            if ('sync' in reg) {
              (reg as ServiceWorkerRegistration & { sync: { register(tag: string): Promise<void> } })
                .sync.register('mcq-attempt-sync').catch(() => {});
            }
          });
        })
        .catch(() => {});
    }
  }, []);

  return null;
}
