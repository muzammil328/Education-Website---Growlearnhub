import mongoose, { Schema } from 'mongoose';
import type { IUser } from '@muzammil328/education-packages/types';
import { RoleEnum, SubscriptionPlanEnum } from '@muzammil328/education-packages/enums';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.Student,
    },
    isEmailVerified: { type: Boolean, default: false },

    hashedToken: { type: String, select: false },
    expiresToken: { type: Date, select: false },
    revoked: { type: Boolean, default: false, select: false },

    deviceInfo: {
      type: {
        userAgent: { type: String },
        ip: { type: String },
      },
      select: false,
    },

    refreshTokens: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, auto: true },
          userId: { type: String, required: true },
          hashedToken: { type: String, required: true },
          expiresAt: { type: Date, required: true },
          revoked: { type: Boolean, default: false },
          deviceInfo: {
            userAgent: { type: String },
            ip: { type: String },
          },
        },
      ],
      select: false,
    },

    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', index: true },

    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    badges: [{ type: String }],
    dailyStreak: { type: Number, default: 0 },
    lastLogin: { type: Date },

    subscriptionPlan: {
      type: String,
      enum: Object.values(SubscriptionPlanEnum),
      default: SubscriptionPlanEnum.FREE,
    },
    subscriptionExpiresAt: { type: Date },

    // OTP LIFECYCLE NOTE: hashedOtp/expiresOtp/used are application-layer enforced.
    // otpService.verifyOtp() checks expiresOtp before comparing. Fields hidden via select:false.
    // Future: extract into a separate OtpRecord collection with a TTL index.
    hashedOtp: { type: String, select: false },
    expiresOtp: { type: Date, select: false },
    used: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        ret['id'] = (ret['_id'] as { toString(): string } | undefined)?.toString();
        delete ret['_id'];
        delete ret['__v'];
        return ret;
      },
    },
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;