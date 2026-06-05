import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/utils';
import { StatusCode } from '@muzammil328/types';
import { Types } from 'mongoose';
import { z } from 'zod';
import {
  registerSchema,
  otpVerificationSchema,
  loginSchema,
  forgotPasswordSchema,
  forgotPasswordOtpVerificationSchema,
  resetPasswordSchema,
} from '@muzammil328/education-packages';
import type {
  AuthRegisterResponse,
  AuthOtpVerificationResponse,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthForgotPasswordResponse,
  AuthVerifyForgotPasswordResponse,
  AuthResetPasswordResponse,
  AuthRefreshResponse,
  AuthUserProfile,
} from '@muzammil328/education-packages/types';
import { logTreeStep } from '@muzammil328/services';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc/trpc';
import { cookieService } from '@/infrastructure/cookie.service';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }): Promise<AuthRegisterResponse> => {
      try {
        const result = await authService.register(input);
        logTreeStep('User registration successful');
        return {
          success: true,
          status: StatusCode.CREATED,
          message: 'Registration successful',
          data: {
            userId: result.userId,
            username: result.username,
            email: result.email,
            role: result.role ?? '',
          },
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  otpVerification: publicProcedure
    .input(otpVerificationSchema)
    .mutation(async ({ input }): Promise<AuthOtpVerificationResponse> => {
      try {
        await authService.otpVerification(input);
        return {
          success: true,
          status: StatusCode.OK,
          message: 'OTP verified successfully',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }): Promise<AuthLoginResponse> => {
      try {
        const result = await authService.login(input);
        cookieService.setAuthCookies(ctx.res, result.tokens);
        logTreeStep('User login successful');
        return {
          success: true,
          status: StatusCode.OK,
          message: 'Login successful',
          data: {
            user: {
              userId: result.user.id,
              username: result.user.username,
              email: result.user.email,
              role: result.user.role ?? '',
            },
            token: result.tokens,
          },
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  logout: protectedProcedure
    .input(z.void())
    .mutation(async ({ ctx }): Promise<AuthLogoutResponse> => {
      try {
        const userId = ctx.user?.userId;
        if (!userId || !Types.ObjectId.isValid(userId)) {
          throw AppError.unauthorized('Invalid user ID');
        }
        await authService.logout(userId);
        cookieService.clearAuthCookies(ctx.res);
        return {
          success: true,
          status: StatusCode.OK,
          message: 'Logged out successfully',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  refreshToken: publicProcedure
    .input(z.void())
    .mutation(async ({ ctx }): Promise<AuthRefreshResponse> => {
      try {
        const token = cookieService.getRefreshToken(ctx.req);
        if (!token) throw AppError.unauthorized('No refresh token provided');
        const result = await authService.refreshToken({ refreshToken: token });
        cookieService.setAuthCookies(ctx.res, result.tokens);
        logTreeStep('Tokens refreshed via cookie');
        return {
          success: true,
          status: StatusCode.OK,
          message: 'Tokens refreshed successfully',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  forgotPassword: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input }): Promise<AuthForgotPasswordResponse> => {
      try {
        await authService.forgotPassword(input);
        return {
          success: true,
          status: StatusCode.OK,
          message: 'OTP sent to email',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  verifyForgotPassword: publicProcedure
    .input(forgotPasswordOtpVerificationSchema)
    .mutation(async ({ input }): Promise<AuthVerifyForgotPasswordResponse> => {
      try {
        await authService.verifyForgotPasswordOtp(input);
        return {
          success: true,
          status: StatusCode.OK,
          message: 'OTP verified successfully',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }): Promise<AuthResetPasswordResponse> => {
      try {
        await authService.resetPassword(input);
        return {
          success: true,
          status: StatusCode.OK,
          message: 'Password reset successfully',
          data: null,
        };
      } catch (error) {
        throw toTrpcError(error);
      }
    }),

  getMe: protectedProcedure
    .query(async ({ ctx }): Promise<AuthUserProfile> => {
      const userId = ctx.user?.userId;
      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw toTrpcError(AppError.unauthorized('Invalid user ID'));
      }
      return userService.getMe(userId);
    }),
});
