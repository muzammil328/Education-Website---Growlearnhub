import mongoose, { Schema } from 'mongoose';
import type { IOtp } from '@muzammil328/education-packages/types';
import { OtpPurposeEnum, OTP_PURPOSE_VALUES } from '@muzammil328/education-packages/enums';

const OtpSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    hashedOtp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    purpose: {
      type: String,
      enum: OTP_PURPOSE_VALUES,
      required: true,
    },
    attempts: { type: Number, default: 0 },
    maxAttempts: { type: Number, default: 5 },
  },
  { timestamps: true }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OtpSchema.index({ userId: 1, purpose: 1 });

export const Otp = mongoose.model<IOtp>('Otp', OtpSchema);
export default Otp;
