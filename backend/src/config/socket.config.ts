import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { config } from '@/config/env.config';

let io: Server | null = null;

/**
 * Initialize Socket.IO server
 * @param server HTTP server instance
 * @returns Socket.IO server instance
 */
export function initSocket(server: HTTPServer): Server {
  io = new Server(server, {
    cors: {
      origin: config.CLIENT_URL ? [config.CLIENT_URL] : ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Authorization'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  console.log('✅ Socket.IO initialized');
  return io;
}

/**
 * Get the Socket.IO server instance
 * @returns Socket.IO server instance
 * @throws Error if Socket.IO is not initialized
 */
export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.IO not initialized! Call initSocket() first.');
  }
  return io;
}

/**
 * Close Socket.IO server
 */
export function closeSocket(): void {
  if (io) {
    io.close();
    io = null;
    console.log('✅ Socket.IO closed');
  }
}

export default { initSocket, getIO, closeSocket };
