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
    getRedisClient();
    return;
  } catch {
    const client = createRedisClient({
      url: config.REDIS_URL,
    });

    await client.ping();
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
