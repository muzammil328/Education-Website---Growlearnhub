import { ApiResponse, UserRole } from '@/types';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  badges?: string[];
  enrolledClasses?: string[];
  dailyStreak?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends Omit<CurrentUser, 'password'> {
  password?: never;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  role?: UserRole;
  badges?: string[];
  dailyStreak?: number;
}

export interface EnrollClassData {
  classId: string;
}

export interface AddBadgeData {
  badge: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}

export type GetUsersResponse = ApiResponse<CurrentUser[]>;
export type GetUserByIdResponse = ApiResponse<CurrentUser>;
export type UpdateUserResponse = ApiResponse<CurrentUser>;
export type DeleteUserResponse = ApiResponse<{ message: string }>;
export type GetUserProfileResponse = ApiResponse<UserProfile>;
export type UpdateUserProfileResponse = ApiResponse<UserProfile>;
export type DeleteUserProfileResponse = ApiResponse<{ message: string }>;
export type EnrollClassResponse = ApiResponse<CurrentUser>;
export type AddBadgeResponse = ApiResponse<CurrentUser>;

export interface IpropsDashboard {
  books?: number;
  classes?: number;
  chapters?: number;
  headings?: number;
  users?: number;
  subHeadings?: number;
  countown?: number;
  questions: number;
}
