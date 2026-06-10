import type { Request, Response } from 'express';
import { COOKIE_CONFIG } from '@muzammil328/types';

const ACCESS_COOKIE = 'token';
const REFRESH_COOKIE = COOKIE_CONFIG.REFRESH_TOKEN_NAME;

const BASE_OPTIONS = {
  httpOnly: COOKIE_CONFIG.HTTP_ONLY,
  secure: process.env.NODE_ENV === 'production',
  sameSite: COOKIE_CONFIG.SAME_SITE as unknown as 'lax' | 'strict' | 'none',
  path: '/',
};

const ACCESS_OPTIONS = {
  ...BASE_OPTIONS,
  httpOnly: false,
};

export const cookieService = {

  setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }): void {
    res.cookie(ACCESS_COOKIE, tokens.accessToken, ACCESS_OPTIONS);
    res.cookie(REFRESH_COOKIE, tokens.refreshToken, { ...BASE_OPTIONS, maxAge: COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE });
  },

  clearAuthCookies(res: Response): void {
    res.clearCookie(ACCESS_COOKIE,  { path: '/' });
    res.clearCookie(REFRESH_COOKIE, { path: '/' });
  },

  getAccessToken(req: Request): string | null {
    return (req.cookies as Record<string, string>)?.[ACCESS_COOKIE] ?? null;
  },

  getRefreshToken(req: Request): string | null {
    return (req.cookies as Record<string, string>)?.[REFRESH_COOKIE] ?? null;
  },
};