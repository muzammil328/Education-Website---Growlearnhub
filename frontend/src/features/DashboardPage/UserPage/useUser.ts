import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  enrollInClass,
  addBadgeToUser,
} from './UserServices';
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

export const useUsers = (params: GetUsersParams) => {
  return useQuery<GetUsersResponse, Error>({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    refetchOnWindowFocus: false,
  });
};

export const useUser = (id: string) => {
  return useQuery<GetUserByIdResponse, Error>({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });
};

export const useUserProfile = () => {
  return useQuery<GetUserProfileResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserResponse, Error, { id: string; updates: UpdateUserData }>({
    mutationFn: ({ id, updates }) => updateUser(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: id => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserProfileResponse, Error, Partial<UpdateUserData>>({
    mutationFn: data => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useDeleteUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserProfileResponse, Error>({
    mutationFn: () => deleteUserProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useEnrollInClass = () => {
  const queryClient = useQueryClient();

  return useMutation<EnrollClassResponse, Error, { userId: string; classId: string }>({
    mutationFn: ({ userId, classId }) => enrollInClass(userId, classId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useAddBadge = () => {
  const queryClient = useQueryClient();

  return useMutation<AddBadgeResponse, Error, { userId: string; badge: string }>({
    mutationFn: ({ userId, badge }) => addBadgeToUser(userId, badge),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
