import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import {
  type AuthRegisterFormValues,
  type AuthLoginFormValues,
  type AuthOtpVerificationFormValues,
  type AuthForgotPasswordFormValues,
  type AuthForgotPasswordOtpVerificationFormValues,
  type AuthResetPasswordFormValues,
} from '@muzammil328/education-packages';
import { type RefreshTokenInput } from '@muzammil328/education-packages/types';
import { RoleEnum, OtpPurposeEnum } from '@muzammil328/education-packages/enums';

import { logTreeStep } from '@muzammil328/services';
import { sendVerificationOtp, sendPasswordResetOtp } from '@/infrastructure/email.service';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { jwtService } from '@/infrastructure/jwt.service';
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
type Role = (typeof RoleEnum)[keyof typeof RoleEnum];

export const authService = {
  async register(input: AuthRegisterFormValues) {
    logTreeStep('AUTH_REGISTER_START');

    const { username, email, password } = input;

    const existingByEmail = await userRepository.findByEmail(email);
    if (existingByEmail) throw AppError.conflict('EMAIL_ALREADY_EXISTS');

    const existingByUsername = await userRepository.findByUsername(username);
    if (existingByUsername) throw AppError.conflict('USERNAME_ALREADY_EXISTS');

    const hashedPassword = await bcryptService.hash(password);

    const user = await userRepository.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: RoleEnum.Student,
      isEmailVerified: false,
      enrolledClasses: [],
      badges: [],
      dailyStreak: 0,
    });

    const userId = String(user._id);
    const { otp } = await otpService.createOtp(new Types.ObjectId(userId), OtpPurposeEnum.EMAIL_VERIFICATION);

    await sendVerificationOtp({ email, username, otp });

    logTreeStep('AUTH_REGISTER_SUCCESS', {
      meta: {
        userId, email
      }
    });

    return {
      userId,
      username: user.username,
      email: user.email,
      role: user.role ?? RoleEnum.Student,
    };
  },

  async otpVerification(input: AuthOtpVerificationFormValues) {
    logTreeStep('authService.otpVerification');

    const { email, otp } = input;

    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound('User not found');

    const userId = String(user._id);
    const isValid = await otpService.verifyOtp(new Types.ObjectId(userId), otp, OtpPurposeEnum.EMAIL_VERIFICATION);
    if (!isValid) throw AppError.unauthorized('Invalid or expired OTP');

    logTreeStep('OTP verified successfully');

    return { success: true, message: 'Email verified successfully' };
  },

  async login(input: AuthLoginFormValues) {
    logTreeStep('authService.login');

    const { email, password } = input;

    const user = await userRepository.findByEmailWithAuth(email);
    if (!user) throw AppError.unauthorized('Invalid credentials');

    const isPasswordValid = await bcryptService.compare(password, user.password);
    if (!isPasswordValid) throw AppError.unauthorized('Invalid credentials');

    const userId = String(user._id);
    const role = (user.role as Role) ?? RoleEnum.Student;
    const accessToken = jwtService.signAccess({ userId, role });
    const refreshToken = jwtService.signRefresh({ userId, role });

    const hashedRefreshToken = await bcryptService.hash(refreshToken);
    await userRepository.findByIdAndUpdate(new Types.ObjectId(userId), {
      hashedToken: hashedRefreshToken,
      revoked: false,
    });

    logTreeStep('User logged in successfully');

    return {
      user: {
        id: userId,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  },

  async logout(userId: string) {
    logTreeStep('authService.logout');

    if (!Types.ObjectId.isValid(userId)) throw AppError.badRequest('Invalid user ID');

    const user = await userRepository.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { revoked: true, hashedToken: '', expiresToken: null },
      { new: true },
    );
    if (!user) throw AppError.notFound('User not found');

    logTreeStep('User logged out successfully');

    return { message: 'Logged out successfully' };
  },

  async forgotPassword(input: AuthForgotPasswordFormValues) {
    logTreeStep('authService.forgotPassword');

    const { email } = input;

    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound('User not found');

    const userId = String(user._id);
    const { otp } = await otpService.createOtp(new Types.ObjectId(userId), OtpPurposeEnum.PASSWORD_RESET);

    await sendPasswordResetOtp({ email, username: user.username, otp });

    logTreeStep('Password reset OTP sent successfully');

    return { message: 'Password reset OTP sent to email' };
  },

  async verifyForgotPasswordOtp(input: AuthForgotPasswordOtpVerificationFormValues) {
    logTreeStep('authService.verifyForgotPasswordOtp');

    const { email, otp } = input;

    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound('User not found');

    const userId = String(user._id);
    const isValid = await otpService.verifyOtp(new Types.ObjectId(userId), otp, OtpPurposeEnum.PASSWORD_RESET);
    if (!isValid) throw AppError.unauthorized('Invalid or expired OTP');

    logTreeStep('Forgot password OTP verified successfully');

    return { message: 'OTP verified successfully' };
  },

  async resetPassword(input: AuthResetPasswordFormValues) {
    logTreeStep('authService.resetPassword');

    const { email, newPassword } = input;

    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound('User not found');

    const hashedPassword = await bcryptService.hash(newPassword);
    await userRepository.findByIdAndUpdate(
      new Types.ObjectId(user._id),
      { password: hashedPassword },
      { new: true },
    );

    logTreeStep('Password reset successfully');

    return { message: 'Password changed successfully' };
  },

  async refreshToken(input: RefreshTokenInput) {
    logTreeStep('authService.refreshToken');

    const { refreshToken: incomingToken } = input;

    const decoded = jwtService.verifyRefresh(incomingToken);
    if (!decoded.valid || !decoded.payload) throw AppError.unauthorized('Invalid refresh token');

    const payload = decoded.payload as unknown as { userId: string; role: string };

    const user = await userRepository.findByIdWithSecrets(payload.userId, ['+revoked', '+hashedToken']);
    if (!user || user.revoked || !user.hashedToken) throw AppError.unauthorized('Invalid refresh token');

    const isTokenValid = await bcryptService.compare(incomingToken, user.hashedToken);
    if (!isTokenValid) throw AppError.unauthorized('Invalid refresh token');

    const userId = String(user._id);
    const role = (user.role as Role) ?? RoleEnum.Student;
    const accessToken = jwtService.signAccess({ userId, role });
    const newRefreshToken = jwtService.signRefresh({ userId, role });

    const hashedRefreshToken = await bcryptService.hash(newRefreshToken);
    await userRepository.findByIdAndUpdate(new Types.ObjectId(userId), {
      hashedToken: hashedRefreshToken,
      revoked: false,
    });

    logTreeStep('Tokens refreshed successfully');

    return {
      tokens: { accessToken, refreshToken: newRefreshToken },
    };
  },
};
