import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const registerFormSchema = z.object({
  username: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const otpVerificationFormSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().trim().min(4).max(8),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().email(),
});

export const otpForgotPasswordFormSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().trim().min(4).max(8),
});

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
export type OtpVerificationFormValues = z.infer<typeof otpVerificationFormSchema>;
export type OTPForgotPasswordFormValues = z.infer<typeof otpForgotPasswordFormSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;