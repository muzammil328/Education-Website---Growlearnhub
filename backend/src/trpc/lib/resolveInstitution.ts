import { Types } from 'mongoose';
import { User } from '../../models/user.model';

const cache = new Map<string, { institutionId?: string; expiresAt: number }>();
const TTL_MS = 60_000;

export async function resolveUserInstitutionId(userId: string): Promise<string | undefined> {
  if (!Types.ObjectId.isValid(userId)) return undefined;

  const now = Date.now();
  const cached = cache.get(userId);
  if (cached && cached.expiresAt > now) return cached.institutionId;

  const user = await User.findById(userId).select('institutionId').lean<{
    institutionId?: Types.ObjectId;
  }>();
  const institutionId = user?.institutionId ? String(user.institutionId) : undefined;

  cache.set(userId, { institutionId, expiresAt: now + TTL_MS });
  return institutionId;
}

export function clearInstitutionCache(userId: string): void {
  cache.delete(userId);
}
