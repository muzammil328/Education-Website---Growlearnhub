import { AUTH_CONFIG } from '@muzammil328/types';
import { createJwt } from '@muzammil328/services';
import config from '@/config/env.config';

export interface TokenPayload {
  userId: string;
  role: string;
  [key: string]: unknown;
}

export interface TokenResult {
  valid: boolean;
  payload?: TokenPayload;
}

const coreJwt = createJwt({
  accessSecret: config.JWT_ACCESS_TOKEN_SECRET_KEY || 'fallback-access-secret-that-is-at-least-32-chars-long!!',
  refreshSecret: config.JWT_REFRESH_TOKEN_SECRET_KEY,
  accessExpiresIn: AUTH_CONFIG.ACCESS_TOKEN_EXPIRY,
  refreshExpiresIn: `${AUTH_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS}d`,
});

export const jwtService = {
  signAccess(payload: TokenPayload): string {
    return coreJwt.signAccess(payload);
  },

  signRefresh(payload: TokenPayload): string {
    return coreJwt.signRefresh(payload);
  },

  signBoth(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    return {
      accessToken: coreJwt.signAccess(payload),
      refreshToken: coreJwt.signRefresh(payload),
    };
  },

  verifyAccess(token: string): TokenResult {
    const result = coreJwt.verifyAccess(token);
    if (!result.valid || !result.payload) {
      return { valid: false };
    }
    return { valid: true, payload: result.payload as TokenPayload };
  },

  verifyRefresh(token: string): TokenResult {
    const result = coreJwt.verifyRefresh(token);
    if (!result.valid || !result.payload) {
      return { valid: false };
    }
    return { valid: true, payload: result.payload as TokenPayload };
  },
};
