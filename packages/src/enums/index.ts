import { z } from 'zod';

/* =========================
 * Roles
 * ========================= */

export const RoleEnum = {
  Student: 'student',
  Teacher: 'teacher',
  SuperAdmin: 'super_admin',
} as const;

export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];

/* =========================
 * Institution
 * ========================= */

export const InstitutionTypeEnum = {
  SCHOOL: 'school',
  COLLEGE: 'college',
  COACHING_CENTER: 'coaching_center',
} as const;

export type InstitutionTypeValue =
  (typeof InstitutionTypeEnum)[keyof typeof InstitutionTypeEnum];

/* =========================
 * Authentication
 * ========================= */

export const OtpPurposeEnum = {
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
} as const;

export type OtpPurposeValue =
  (typeof OtpPurposeEnum)[keyof typeof OtpPurposeEnum];

/* =========================
 * MCQ
 * ========================= */

export const McqScopeEnum = {
  GLOBAL: 'global',
  INSTITUTION: 'institution',
} as const;

export type McqScopeValue =
  (typeof McqScopeEnum)[keyof typeof McqScopeEnum];

export const DifficultyEnum = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export type DifficultyLevel =
  (typeof DifficultyEnum)[keyof typeof DifficultyEnum];

/* =========================
 * General Status
 * ========================= */

export const StatusEnum = {
  Active: 'active',
  Inactive: 'inactive',
} as const;

export type Status =
  (typeof StatusEnum)[keyof typeof StatusEnum];

/* =========================
 * Subscription
 * ========================= */

export const SubscriptionPlanEnum = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export type SubscriptionPlanValue =
  (typeof SubscriptionPlanEnum)[keyof typeof SubscriptionPlanEnum];

/* =========================
 * Payments
 * ========================= */

export const PaymentTypeEnum = {
  Subscription: 'subscription',
  OneTime: 'one-time',
  Institution: 'institution',
} as const;

export type PaymentType =
  (typeof PaymentTypeEnum)[keyof typeof PaymentTypeEnum];

export const PaymentStatusEnum = {
  Pending: 'pending',
  Completed: 'completed',
  Failed: 'failed',
  Refunded: 'refunded',
} as const;

export type PaymentStatus =
  (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];

/* =========================
 * Feedback
 * ========================= */

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