import { z } from 'zod';
export const Role = {
  GUEST: 'guest' as const,
  ADMIN: 'admin' as const,
  SUPER_ADMIN: 'super_admin' as const,
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const DifficultyEnum = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export const RoleEnum = {
  Student: 'student',
  Teacher: 'teacher',
  Guest: Role.GUEST,
  Admin: Role.ADMIN,
  SuperAdmin: Role.SUPER_ADMIN,
} as const;
export type UserRole = (typeof RoleEnum)[keyof typeof RoleEnum];


export const StatusEnum = {
  Active: 'active',
  Inactive: 'inactive',
} as const;

export const PaymentStatusEnum = {
  Pending: 'pending',
  Completed: 'completed',
  Failed: 'failed',
  Refunded: 'refunded',
} as const;

export const PaymentTypeEnum = {
  Subscription: 'subscription',
  OneTime: 'one-time',
  Institution: 'institution',
} as const;

export const SortOrderEnum = {
  Ascending: 'asc',
  Descending: 'desc',
} as const;

export const FeedbackTypeEnum = {
  Contact: 'contact',
  BugReport: 'bug-report',
  FeatureRequest: 'feature-request',
} as const;

export const FeedbackStatusEnum = {
  Pending: 'pending',
  Resolved: 'resolved',
  Rejected: 'rejected',
} as const;

// EntityStatus — canonical status enum used by all domain models
export const EntityStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type EntityStatusValue = (typeof EntityStatus)[keyof typeof EntityStatus];
export const ENTITY_STATUS_VALUES = Object.values(EntityStatus) as [EntityStatusValue, ...EntityStatusValue[]];
export const entityStatusSchema = z.enum(ENTITY_STATUS_VALUES);

// Difficulty — canonical difficulty enum
export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type DifficultyValue = (typeof Difficulty)[keyof typeof Difficulty];
export const difficultySchema = z.enum([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);

// McqScope — visibility scope for MCQ questions
export const McqScope = {
  GLOBAL: 'global',
  INSTITUTION: 'institution',
} as const;

export type McqScopeValue = (typeof McqScope)[keyof typeof McqScope];

// InstitutionType — type of educational institution
export const InstitutionTypeEnum = {
  SCHOOL: 'school',
  COLLEGE: 'college',
  COACHING_CENTER: 'coaching_center',
} as const;

export type InstitutionTypeValue = (typeof InstitutionTypeEnum)[keyof typeof InstitutionTypeEnum];

// OtpPurpose — purpose of an OTP record
export const OtpPurposeEnum = {
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
} as const;

export type OtpPurposeValue = (typeof OtpPurposeEnum)[keyof typeof OtpPurposeEnum];
export const OTP_PURPOSE_VALUES = Object.values(OtpPurposeEnum) as [OtpPurposeValue, ...OtpPurposeValue[]];

// SubscriptionPlan — pricing plan
export const SubscriptionPlanEnum = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export type SubscriptionPlanValue = (typeof SubscriptionPlanEnum)[keyof typeof SubscriptionPlanEnum];
