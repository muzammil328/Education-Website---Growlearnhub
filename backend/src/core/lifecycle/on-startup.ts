import { logTreeStep } from '@muzammil328/services';
import { initRedis } from '@config/redis.config';
import { connectMongo } from '@config/db.config';
import { initializeAuthServer } from '@muzammil328/services';
import { config } from '@config/env.config';

export async function initializeServices(): Promise<void> {
  try {
    logTreeStep('Initializing services...');

    const redisInit = initRedis()
      .then(() => logTreeStep('Redis connected successfully'))
      .catch((redisError: unknown) => {
        const err = redisError instanceof Error ? redisError.message : String(redisError);
        logTreeStep(`⚠️ Redis connection failed, continuing without Redis: ${err}`);
      });

    await Promise.all([
      connectMongo({ uri: config.MONGODB_URI }),
      redisInit,
    ]);

    const accessSecret = config.JWT_ACCESS_TOKEN_SECRET_KEY ?? config.JWT_REFRESH_TOKEN_SECRET_KEY;
    const refreshSecret = config.JWT_REFRESH_TOKEN_SECRET_KEY;

    initializeAuthServer({
      accessSecret,
      refreshSecret,
      accessExpiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1d',
      refreshExpiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
    logTreeStep('Token service initialized');

    logTreeStep('✅ Services initialized');
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`❌ Failed to initialize services: ${err.message}`);
    throw error;
  }
}
