import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const otpVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(4).max(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const forgotPasswordOtpVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(4).max(8),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export type AuthRegisterFormValues = z.infer<typeof registerSchema>;
export type AuthLoginFormValues = z.infer<typeof loginSchema>;
export type AuthOtpVerificationFormValues = z.infer<typeof otpVerificationSchema>;
export type AuthForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type AuthForgotPasswordOtpVerificationFormValues = z.infer<typeof forgotPasswordOtpVerificationSchema>;
export type AuthResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type AuthUpdateProfileFormValues = z.infer<typeof updateProfileSchema>;