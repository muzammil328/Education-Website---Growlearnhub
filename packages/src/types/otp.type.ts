import { Document, Types } from 'mongoose';
import type { OtpPurposeValue } from '../enums';

export interface IOtp extends Document {
  userId: Types.ObjectId;
  hashedOtp: string;
  expiresAt: Date;
  purpose: OtpPurposeValue;
  attempts: number;
  maxAttempts: number;
  createdAt?: Date;
  updatedAt?: Date;
}
