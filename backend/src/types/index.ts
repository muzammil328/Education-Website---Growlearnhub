export * from '@muzammil328/education-packages/types';
export type ObjectId = import('mongoose').Types.ObjectId;
export interface DeviceInfo {
  userAgent?: string;
  ip?: string;
}

export interface RefreshTokenDoc {
  _id: unknown;
  userId: unknown;
  hashedToken: string;
  expiresAt: Date;
  revoked: boolean;
  replacedByToken?: string;
  deleteOne(): Promise<void>;
  save(): Promise<void>;
}

export interface RefreshTokenModelInterface {
  create(data: {
    userId: string;
    hashedToken: string;
    expiresAt: Date;
    revoked: boolean;
    deviceInfo?: DeviceInfo;
  }): Promise<unknown>;
  findOne(query: Record<string, unknown>): Promise<RefreshTokenDoc | null>;
  findById(id: string): Promise<RefreshTokenDoc | null>;
  updateMany(
    query: Record<string, unknown>,
    update: Record<string, unknown>
  ): Promise<{ modifiedCount: number }>;
  findOneAndUpdate(
    query: Record<string, unknown>,
    update: Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<RefreshTokenDoc | null>;
}
