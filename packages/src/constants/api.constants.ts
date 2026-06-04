/* =========================================================
   API VERSION
   ========================================================= */
export const API_VERSION        = 'v1' as const;
export const CACHE_BUSTER_PARAM = '_t' as const;

/* =========================================================
   TIMEOUTS
   ========================================================= */
export const TIMEOUTS = {
   API: 30_000,
   UPLOAD: 120_000,
  SESSION_WARNING: 300_000,
   DEBOUNCE: 300,
} as const;