import { Express } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { StatusCode } from '@muzammil328/types';

// Import all routes
import { appRouter } from '../../trpc/router';
import { createTRPCContext } from '../../trpc/context';

export function registerRoutes(app: Express): void {
  // Health check route
  app.get('/health', (_req, res) => {
    res.status(StatusCode.OK).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }) as Parameters<Express['use']>[1]
  );

  // 404 handler for unknown routes (must be after all routes)
  app.use((req, res) => {
    res.status(StatusCode.NOT_FOUND).json({
      message: 'Route not found',
      path: req.path,
      method: req.method,
    });
  });
}

export default registerRoutes;
