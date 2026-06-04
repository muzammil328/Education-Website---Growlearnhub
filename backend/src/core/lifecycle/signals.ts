import { logTreeStep } from '@muzammil328/services';
import { onShutdown, onForceShutdown } from './on-shutdown';
import { config } from '@config/env.config';

const SHUTDOWN_GRACEFUL = 5000;

/**
 * Process Signal Handlers
 *
 * This module handles process signals (SIGINT, SIGTERM, etc.)
 * for graceful application shutdown.
 */

let isShuttingDown = false;
let shutdownTimer: NodeJS.Timeout | null = null;

/**
 * Setup signal handlers for graceful shutdown
 */
export function setupSignalHandlers(): void {
  // SIGINT - Interrupt signal (Ctrl+C)
  process.on('SIGINT', handleShutdown);

  // SIGTERM - Termination signal (used by process managers)
  process.on('SIGTERM', handleShutdown);

  // Uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    logTreeStep(`🚨 Uncaught Exception: ${error.message}`);
    handleShutdown();
  });

  // Unhandled promise rejections
  process.on('unhandledRejection', (reason: unknown) => {
    const msg = reason instanceof Error ? reason.message : String(reason);
    logTreeStep(`⚠️ Unhandled Promise Rejection: ${msg}`);
    // Don't exit on unhandled rejection in production
    if (config.NODE_ENV === 'production') {
      logTreeStep('⚠️ Continuing despite unhandled rejection');
    } else {
      handleShutdown();
    }
  });

  logTreeStep('Signal handlers registered');
}

/**
 * Handle shutdown signal
 */
async function handleShutdown(): Promise<void> {
  if (isShuttingDown) {
    logTreeStep('⚠️ Shutdown already in progress, forcing exit...');
    process.exit(1);
    return;
  }

  isShuttingDown = true;
  logTreeStep('🛑 Shutdown signal received, starting graceful shutdown...');

  // Set timeout for force shutdown
  shutdownTimer = setTimeout(() => {
    logTreeStep('⏰ Graceful shutdown timeout exceeded, forcing shutdown...');
    onForceShutdown();
  }, SHUTDOWN_GRACEFUL);

  try {
    await onShutdown();

    // Clear the timeout if shutdown completed successfully
    if (shutdownTimer) {
      clearTimeout(shutdownTimer);
      shutdownTimer = null;
    }

    logTreeStep('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`❌ Error during graceful shutdown: ${err.message}`);

    if (shutdownTimer) {
      clearTimeout(shutdownTimer);
      shutdownTimer = null;
    }

    process.exit(1);
  }
}

/**
 * Cleanup signal handlers (for testing)
 */
export function cleanupSignalHandlers(): void {
  process.removeAllListeners('SIGINT');
  process.removeAllListeners('SIGTERM');
  process.removeAllListeners('uncaughtException');
  process.removeAllListeners('unhandledRejection');

  if (shutdownTimer) {
    clearTimeout(shutdownTimer);
    shutdownTimer = null;
  }

  isShuttingDown = false;
}

export default { setupSignalHandlers, cleanupSignalHandlers };
