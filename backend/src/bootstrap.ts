import { startServer } from './core/servers';
import { createExpressApp } from './core/servers/express';
import { initializeServices } from './core/lifecycle/on-startup';
import { onShutdown } from './core/lifecycle/on-shutdown';
import { setupSignalHandlers } from './core/lifecycle/signals';
import { logTreeStep, registerGlobalErrorHandlers, logger } from '@muzammil328/services';

const app = createExpressApp();

export async function bootstrap(): Promise<void> {
  try {
    logTreeStep('Starting application bootstrap...');

    registerGlobalErrorHandlers(logger);
    setupSignalHandlers();

    await initializeServices();

    await startServer(app);
    logTreeStep('✅ HTTP server started');
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`❌ Application startup failed: ${err.message}`);
    logTreeStep(`Stack trace: ${err.stack || 'No stack trace'}`);
    process.exit(1);
  }
}

export async function shutdown(): Promise<void> {
  return onShutdown();
}
