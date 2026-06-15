import { Server as HTTPServer } from 'http';
import {
  createSocketServer,
  getSocketServer,
  closeSocketServer,
  emitToAll,
  emitToRoom,
  emitToSocket,
  broadcastExcept,
  joinRoom,
  leaveRoom,
  getRoomSockets,
  getRoomCount,
  getConnectedCount,
} from '@muzammil328/services';
import { config } from '@/config/env.config';

export function initSocket(server: HTTPServer) {
  return createSocketServer({
    server,
    cors: {
      origin: config.CORS_ORIGIN ? [config.CORS_ORIGIN] : ['http://localhost:3000'],
      credentials: true,
    },
  });
}

export { getSocketServer as getIO, closeSocketServer as closeSocket };

export {
  emitToAll,
  emitToRoom,
  emitToSocket,
  broadcastExcept,
  joinRoom,
  leaveRoom,
  getRoomSockets,
  getRoomCount,
  getConnectedCount,
};

export default {
  initSocket,
  getIO: getSocketServer,
  closeSocket: closeSocketServer,
  emitToAll,
  emitToRoom,
  emitToSocket,
  broadcastExcept,
  joinRoom,
  leaveRoom,
  getRoomSockets,
  getRoomCount,
  getConnectedCount,
};
