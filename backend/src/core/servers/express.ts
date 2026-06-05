import cookieParser from 'cookie-parser';
import cors from 'cors';
import { registerRoutes } from './routes';
import express, { Express } from 'express';
import { globalErrorHandler } from '@muzammil328/server';
import { createHelmet, httpLogger, createCsrf, createApiRateLimiter } from '@muzammil328/services';
import { config } from '@config/env.config';

const helmetMiddleware = createHelmet();
const corsMiddleware = cors({
  origin: config.CORS_ORIGIN.split(',').filter(Boolean),
  credentials: true,
});
const csrfProtection = createCsrf();
const apiRateLimiter = createApiRateLimiter();

export function createExpressApp(): Express {
  const app = express();

  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(httpLogger);
  app.use(apiRateLimiter);
  app.use(csrfProtection);

  app.get('/csrf-token', (req, res) => {
    res.json({ token: (req as any).csrfToken?.() });
  });

  registerRoutes(app);

  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    globalErrorHandler(err, req, res, next);
  });

  return app;
}
export default createExpressApp;
