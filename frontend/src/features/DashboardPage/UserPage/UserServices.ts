import { request } from '@/lib/axios';
import { config } from '@/config';
import {
  GetUsersResponse,
  GetUserByIdResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  GetUserProfileResponse,
  UpdateUserProfileResponse,
  DeleteUserProfileResponse,
  EnrollClassResponse,
  AddBadgeResponse,
  UpdateUserData,
  GetUsersParams,
} from '@/types/user.types';

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  const queryParams = new URLSearchParams({
    page: String(params.page || 1),
    limit: String(params.limit || 10),
    sort: params.sort || 'createdAt',
    sortDirection: params.sortDirection || 'desc',
  });
  return request<GetUsersResponse>({
    url: `${config.user.get}?${queryParams.toString()}`,
    method: 'GET',
  });
};

export const getUserById = async (id: string): Promise<GetUserByIdResponse> => {
  return request<GetUserByIdResponse>({
    url: config.user.getById(id),
    method: 'GET',
  });
};

export const updateUser = async (id: string, data: UpdateUserData): Promise<UpdateUserResponse> => {
  return request<UpdateUserResponse>({
    url: config.user.update(id),
    method: 'PUT',
    data,
  });
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  return request<DeleteUserResponse>({
    url: config.user.delete(id),
    method: 'DELETE',
  });
};

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
  return request<GetUserProfileResponse>({
    url: config.user.getProfile,
    method: 'GET',
  });
};

export const updateUserProfile = async (
  data: Partial<UpdateUserData>
): Promise<UpdateUserProfileResponse> => {
  return request<UpdateUserProfileResponse>({
    url: config.user.updateProfile,
    method: 'PUT',
    data,
  });
};

export const deleteUserProfile = async (): Promise<DeleteUserProfileResponse> => {
  return request<DeleteUserProfileResponse>({
    url: config.user.deleteProfile,
    method: 'DELETE',
  });
};

export const enrollInClass = async (
  userId: string,
  classId: string
): Promise<EnrollClassResponse> => {
  return request<EnrollClassResponse>({
    url: config.user.enroll(userId, classId),
    method: 'POST',
    data: { classId },
  });
};

export const addBadgeToUser = async (userId: string, badge: string): Promise<AddBadgeResponse> => {
  return request<AddBadgeResponse>({
    url: config.user.addBadge(userId),
    method: 'POST',
    data: { badge },
  });
};
