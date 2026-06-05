import {
  createRedisClient,
  getRedisClient,
  closeRedisClient,
  cacheSet,
  cacheGet,
  cacheDelete,
  cacheDeletePattern,
  cacheGetOrSet,
  checkRateLimit,
  checkSlidingRateLimit,
} from '@muzammil328/db';
import { config } from '@/config/env.config';

export async function initRedis() {
  try {
    const existing = getRedisClient();
    existing.ping();
    return;
  } catch {
    const client = createRedisClient({
      url: config.REDIS_URL,
      enableOfflineQueue: true,
      maxRetries: 10,
      retryDelayMs: 200,
    });

    try {
      await client.ping();
    } catch {
      // Redis unavailable — continue without it
    }
  }
}

export default {
  initRedis,
  getRedisClient,
  cacheSet,
  cacheGet,
  cacheDelete,
  cacheDeletePattern,
  cacheGetOrSet,
  checkRateLimit,
  checkSlidingRateLimit,
  closeRedisClient,
};
