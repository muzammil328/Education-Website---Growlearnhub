import { ApiResponse } from '@muzammil328/types';

export interface AuthUserProfile {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export type AuthRegisterResponse = ApiResponse<AuthUserProfile>;

export type AuthLoginResponse = ApiResponse<{
  user: AuthUserProfile;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}>;

export type AuthOtpVerificationResponse = ApiResponse<null>;
export type AuthLogoutResponse = ApiResponse<null>;
export type AuthRefreshResponse = ApiResponse<null>;
export type AuthForgotPasswordResponse = ApiResponse<null>;
export type AuthVerifyForgotPasswordResponse = ApiResponse<null>;
export type AuthResetPasswordResponse = ApiResponse<null>;

export type AuthUpdateProfileResponse = ApiResponse<{
  user: AuthUserProfile;
}>;

export type UpdateProfileInput = {
  username?: string;
  email?: string;
};

export interface RefreshTokenInput {
  refreshToken: string;
}