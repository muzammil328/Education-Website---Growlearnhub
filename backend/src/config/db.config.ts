import mongoose from 'mongoose';
import {
  type ConnectionLogger,
  type ConnectionState,
  type DocumentId,
  type MongoConnectionOptions,
  defaultLogger,
  STATE_MAP,
  toObjectId,
  BaseRepository,
} from '@muzammil328/db';

export type { DocumentId };
export { toObjectId, BaseRepository };

async function attemptConnect(uri: string): Promise<void> {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

/**
 * Connects to MongoDB with automatic retry on failure.
 * Safe to call multiple times — no-ops if already connected.
 *
 * @example
 * await connectMongo({ uri: process.env.MONGODB_URI!, maxRetries: 3 });
 */
export async function connectMongo(options: MongoConnectionOptions): Promise<void> {
  const { uri, maxRetries = 3, retryDelayMs = 500, logger = defaultLogger() } = options;

  if (mongoose.connection.readyState === 1) {
    logger.info('MongoDB already connected — reusing existing connection');
    return;
  }

  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      await attemptConnect(uri);
      logger.info('MongoDB connected successfully');
      registerListeners(logger);
      return;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (attempt >= maxRetries) {
        logger.error(`MongoDB connection failed after ${maxRetries} attempts`, {
          message: error.message,
        });
        throw error;
      }
      const delay = retryDelayMs * attempt;
      logger.warn(
        `MongoDB connection attempt ${attempt} failed — retrying in ${delay}ms: ${error.message}`
      );
      await sleep(delay);
    }
  }
}

/**
 * Gracefully closes the MongoDB connection.
 * Safe to call even if not connected.
 */
export async function disconnectMongo(logger: ConnectionLogger = defaultLogger()): Promise<void> {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected successfully');
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error(`Failed to disconnect MongoDB: ${error.message}`);
    throw error;
  }
}

/**
 * Returns the current connection state as a human-readable string.
 */
export function getConnectionState(): ConnectionState {
  return STATE_MAP[mongoose.connection.readyState] ?? 'disconnected';
}

/**
 * Returns true when Mongoose reports the connection is ready.
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

function registerListeners(logger: ConnectionLogger): void {
  mongoose.connection.removeAllListeners();

  mongoose.connection.on('error', (err: Error) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });
  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });
  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
