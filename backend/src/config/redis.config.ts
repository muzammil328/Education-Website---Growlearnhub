import { createClient, RedisClientType } from 'redis';
import { logTreeStep } from '@muzammil328/services';
import { withRetry } from '../utils/retry';
import { config } from '@/config/env.config';

let client: RedisClientType | null = null;

export async function initRedis(): Promise<RedisClientType> {
  if (client && client.isReady) {
    return client;
  }

  const redisUrl = config.REDIS_URL;
  logTreeStep(`🔌 Attempting to connect to Redis: ${redisUrl}`);

  await withRetry(
    async () => {
      const newClient = createClient({
        url: redisUrl,
        socket: {
          reconnectStrategy: retries => {
            if (retries > 20) {
              logTreeStep('Redis reconnection failed after 20 attempts');
              return new Error('Redis reconnection limit exceeded');
            }
            return Math.min(retries * 200, 5000);
          },
        },
      }) as RedisClientType;

      newClient.on('error', err => {
        logTreeStep(`Redis Client Error: ${err?.message ?? String(err)}`);
      });

      newClient.on('connect', () => {
        logTreeStep('Redis client connecting...');
      });

      newClient.on('ready', () => {
        logTreeStep(`✅ Connected to Redis: ${redisUrl}`);
      });

      newClient.on('end', () => {
        logTreeStep('Redis connection closed');
      });

      newClient.on('reconnecting', () => {
        logTreeStep('Redis reconnecting...');
      });

      await newClient.connect();
      client = newClient;
      return client;
    },
    {
      maxRetries: 1,
      initialDelay: 300,
      maxDelay: 300,
      onRetry: (attempt, error) => {
        logTreeStep(`Redis connection attempt ${attempt} failed: ${error.message}`);
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return client!;
}

export function getRedis(): RedisClientType | null {
  return client;
}

export function getRedisOrThrow(): RedisClientType {
  if (!client) {
    throw new Error('Redis not initialized! Call initRedis() first.');
  }
  return client;
}

export async function closeRedis(): Promise<void> {
  if (!client) {
    return;
  }

  try {
    await client.disconnect();
    logTreeStep('✅ Redis disconnected');
  } catch (error) {
    logTreeStep(
      `Error disconnecting Redis: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    client = null;
  }
}

export function isRedisConnected(): boolean {
  return client !== null && client.isReady;
}

export default { initRedis, getRedis, getRedisOrThrow, closeRedis, isRedisConnected };
