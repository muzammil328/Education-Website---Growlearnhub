import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

type ExpressRequest = CreateExpressContextOptions['req'];
type ExpressResponse = CreateExpressContextOptions['res'];
import { createJwt } from '@muzammil328/core';
import { config } from '@config/env.config';
import User from '../models/user.model';

const jwt = createJwt({
  accessSecret: config.JWT_ACCESS_TOKEN_SECRET_KEY ?? 'your-secret-key',
  refreshSecret: config.JWT_REFRESH_TOKEN_SECRET_KEY ?? 'your-refresh-secret',
});

export type AuthUser = {
  userId: string;
  email?: string;
  role: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: Date;
  institutionId?: string;
};

export type TRPCContext = {
  user: AuthUser | null;
  req: ExpressRequest;
  res: ExpressResponse;
};

const verifyAccessToken = async (token: string): Promise<AuthUser | null> => {
  const verification = jwt.verifyAccess(token);
  if (!verification.valid || !verification.payload) {
    return null;
  }

  const payload = verification.payload;
  const rawUserId = payload['userId'] ?? payload['id'];
  if (!rawUserId) {
    return null;
  }

  const id = String(rawUserId);
  const email = payload['email'] ? String(payload['email']) : undefined;
  const role = payload['role'] ? String(payload['role']) : 'guest';

  const user = await User.findById(id)
    .select('subscriptionPlan subscriptionExpiresAt institutionId')
    .lean();

  return {
    userId: id,
    email,
    role,
    subscriptionPlan: user?.subscriptionPlan ?? 'free',
    subscriptionExpiresAt: user?.subscriptionExpiresAt ?? undefined,
    institutionId: user?.institutionId?.toString(),
  };
};

const extractToken = (req: ExpressRequest): string | null => {
  const cookies = req.cookies as Record<string, string> | undefined;
  const cookie = cookies?.['token'];
  if (cookie) return cookie;

  const headers = req.headers as Record<string, string | string[] | undefined>;
  const authHeader = headers['authorization'];
  const header = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (header?.startsWith('Bearer ')) {
    return header.slice(7);
  }

  return null;
};

export const createTRPCContext = async (
  opts: CreateExpressContextOptions
): Promise<TRPCContext> => {
  const token = extractToken(opts.req);
  const user = token ? await verifyAccessToken(token) : null;
  return { user, req: opts.req, res: opts.res };
};
