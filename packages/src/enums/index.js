import { z } from 'zod';
export const Role = {
    GUEST: 'guest',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
};
export const DifficultyEnum = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard',
};
export const RoleEnum = {
    Student: 'student',
    Teacher: 'teacher',
    Guest: Role.GUEST,
    Admin: Role.ADMIN,
    SuperAdmin: Role.SUPER_ADMIN,
};
export const StatusEnum = {
    Active: 'active',
    Inactive: 'inactive',
};
export const PaymentStatusEnum = {
    Pending: 'pending',
    Completed: 'completed',
    Failed: 'failed',
    Refunded: 'refunded',
};
export const PaymentTypeEnum = {
    Subscription: 'subscription',
    OneTime: 'one-time',
    Institution: 'institution',
};
export const SortOrderEnum = {
    Ascending: 'asc',
    Descending: 'desc',
};
export const FeedbackTypeEnum = {
    Contact: 'contact',
    BugReport: 'bug-report',
    FeatureRequest: 'feature-request',
};
export const FeedbackStatusEnum = {
    Pending: 'pending',
    Resolved: 'resolved',
    Rejected: 'rejected',
};
// EntityStatus — canonical status enum used by all domain models
export const EntityStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
};
export const ENTITY_STATUS_VALUES = Object.values(EntityStatus);
export const entityStatusSchema = z.enum(ENTITY_STATUS_VALUES);
// Difficulty — canonical difficulty enum
export const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
};
export const difficultySchema = z.enum([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);
// McqScope — visibility scope for MCQ questions
export const McqScope = {
    GLOBAL: 'global',
    INSTITUTION: 'institution',
};
// InstitutionType — type of educational institution
export const InstitutionTypeEnum = {
    SCHOOL: 'school',
    COLLEGE: 'college',
    COACHING_CENTER: 'coaching_center',
};
// SubscriptionPlan — pricing plan
export const SubscriptionPlanEnum = {
    FREE: 'free',
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
};
