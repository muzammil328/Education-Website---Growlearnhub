import { logTreeStep } from '@muzammil328/services';
import { shutdownServer } from '../servers';
import { disconnectMongo } from '@config/db.config';

export async function onShutdown(): Promise<void> {
  try {
    logTreeStep('🛑 Running shutdown cleanup...');

    // shutdownServer closes Socket.IO, Redis, and the HTTP server
    await shutdownServer();

    await disconnectMongo();

    logTreeStep('✅ Shutdown cleanup completed');
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`❌ Error during shutdown cleanup: ${err.message}`);
    throw error;
  }
}

export async function onForceShutdown(): Promise<void> {
  logTreeStep('⚠️ Force shutdown triggered');
  try {
    await onShutdown();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`❌ Error during force shutdown: ${err.message}`);
  } finally {
    process.exit(1);
  }
}
