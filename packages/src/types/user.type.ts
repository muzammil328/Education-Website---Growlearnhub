import { RoleEnum, SubscriptionPlanEnum } from '../enums';
import { Document, Types } from 'mongoose';

export interface PlanOption {
  id: string;
  variantId: string;
  billingModel: 'flat' | 'usage' | 'dynamic';
  tier: 'free' | 'basic' | 'pro' | 'business' | 'enterprise';
  name: string;
  price: number;
  yearlyPrice: number;
  responses: number;
  users: number;
  popular: boolean;
  features: string[];
}

type UserRole = (typeof RoleEnum)[keyof typeof RoleEnum];
type SubscriptionPlanValue = (typeof SubscriptionPlanEnum)[keyof typeof SubscriptionPlanEnum];

export interface RefreshTokenDoc {
  _id: Types.ObjectId;
  userId: string;
  hashedToken: string;
  expiresAt: Date;
  revoked: boolean;
  deviceInfo?: {
    userAgent?: string;
    ip?: string;
  };
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  isEmailVerified?: boolean;

  hashedToken?: string;
  expiresToken?: Date;
  revoked?: boolean;

  deviceInfo?: {
    userAgent?: string;
    ip?: string;
  };

  refreshTokens: RefreshTokenDoc[];

  institutionId?: Types.ObjectId;
  enrolledClasses: Types.ObjectId[];
  badges: string[];
  dailyStreak: number;
  lastLogin?: Date;
  subscriptionPlan?: SubscriptionPlanValue;
  subscriptionExpiresAt?: Date;
  examTarget?: string;
  examDate?: Date;
  lastBurstDate?: Date;
  burstStreakCount?: number;
  hashedOtp?: string;
  expiresOtp?: Date;
  used?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
