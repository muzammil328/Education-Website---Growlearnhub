import 'module-alias/register';
import { createExpressApp } from '@/core/servers/express';
import { initializeServices } from '@/core/lifecycle/on-startup';
import { registerGlobalErrorHandlers, logger } from '@muzammil328/services';

registerGlobalErrorHandlers(logger);

const app = createExpressApp();

let initialized = false;

export default async function handler(req: any, res: any) {
  if (!initialized) {
    initialized = true;
    initializeServices().catch(err => {
      logger.error('Failed to initialize services:', err);
    });
  }
  app(req, res);
}