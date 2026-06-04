import cookieParser from 'cookie-parser';
import cors from 'cors';
import { registerRoutes } from './routes';
import express, { Express, Request, Response, NextFunction } from 'express';
import { flushRequestLogBuffer, logger, runWithRequestLogBuffer } from '@muzammil328/services';
import { globalErrorHandler } from '@muzammil328/utils';
import { createHelmet } from '@muzammil328/services';
import { config } from '@config/env.config';

const helmetMiddleware = createHelmet();
const corsMiddleware = cors({
  origin: config.CORS_ORIGIN.split(',').filter(Boolean),
  credentials: true,
});

/**
 * Create and configure Express application
 * @returns Configured Express app instance
 */
export function createExpressApp(): Express {
  const app = express();

  // Security headers
  app.use(helmetMiddleware);

  // CORS configuration
  app.use(corsMiddleware);

  // Webhook

  // Body parsers (for all other routes)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Request logging for API visibility in terminal
  app.use((req: Request, res: Response, next: NextFunction) => {
    runWithRequestLogBuffer(() => {
      const startedAt = Date.now();

      res.on('finish', () => {
        const durationMs = Date.now() - startedAt;
        logger.info('----------------------------------');
        logger.info(`  ├─ HTTP ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`);
        const hasBufferedLogs = flushRequestLogBuffer();
        if (!hasBufferedLogs) {
          logger.info('----------------------------------');
        }
      });

      next();
    });
  });

  // Register all routes
  registerRoutes(app);

  // Global error handling middleware (must be last)
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    globalErrorHandler(err, req, res, next);
  });

  return app;
}
export default createExpressApp;
