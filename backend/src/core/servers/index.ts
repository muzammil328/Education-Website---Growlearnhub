import http from 'http';
import { Express } from 'express';
import { initSocket, closeSocket } from '@config/socket.config';
import redis from '@config/redis.config';
import { logTreeStep } from '@muzammil328/services';
import { config } from '@config/env.config';

let server: http.Server | null = null;

export async function startServer(app: Express): Promise<void> {
  try {
    server = http.createServer(app);

    initSocket(server);

    server.listen(config.PORT, () => {
      logTreeStep(`🚀 Server is running at PORT: ${config.PORT}`);
      logTreeStep(`📡 Health check: http://localhost:${config.PORT}/health`);
    });

    server.on('error', (error: Error) => {
      logTreeStep(`Server error: ${error.message}`);
      throw error;
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep(`Failed to start server: ${err.message}`);
    await shutdownServer();
    process.exit(1);
  }
}

export async function shutdownServer(): Promise<void> {
  logTreeStep('🛑 Shutting down server...');

  closeSocket();
  await redis.closeRedisClient();

  if (server) {
    const httpServer = server;
    return new Promise(resolve => {
      httpServer.close(() => {
        logTreeStep('✅ HTTP server closed');
        resolve();
      });
    });
  }
}

export function getServer(): http.Server | null {
  return server;
}
