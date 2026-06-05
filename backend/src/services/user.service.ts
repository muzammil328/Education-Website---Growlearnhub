import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { userRepository } from '../repository/user.repository';
import { AuthUserProfile, RoleType, UpdateProfileInput } from '@muzammil328/education-packages/types';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface GetUsersInput {
  role?: RoleType;
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
}

export interface GetDropdownInput {
  search?: string;
  role?: RoleType;
}

export interface UpdateUserInput {
  id: string;
  username?: string;
  email?: string;
  role?: RoleType;
  enrolledClasses?: string[];
}

export const userService = {
  async getMe(userId: string): Promise<AuthUserProfile> {
    if (!Types.ObjectId.isValid(userId)) {
      throw AppError.badRequest('Invalid user ID');
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const profile: AuthUserProfile = {
      userId: String(user._id),
      username: user.username,
      email: user.email,
      role: String(user.role || 'user'),
    };

    return profile;
  },

  async update(userId: string, input: UpdateProfileInput) {
    if (!Types.ObjectId.isValid(userId)) {
      throw AppError.badRequest('Invalid user ID');
    }

    const updateData: Record<string, string> = {};
    if (input.username) updateData.username = input.username;
    if (input.email) updateData.email = input.email;

    const updated = await userRepository.findByIdAndUpdate(new Types.ObjectId(userId), updateData, { new: true });
    if (!updated) {
      throw AppError.notFound('User not found');
    }

    return updated;
  },

  async getAll(input: GetUsersInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    const sort = input.sort ?? 'createdAt';

    const match: Record<string, unknown> = {};

    if (input.role) {
      match.role = input.role;
    }

    if (input.search) {
      const searchRegex = escapeRegex(input.search);
      match.$or = [
        { username: { $regex: searchRegex, $options: 'i' } },
        { email: { $regex: searchRegex, $options: 'i' } },
      ];
    }

    return userRepository.aggregatePaginate({
      pipeline: [
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        {
          $lookup: {
            from: 'classes',
            localField: 'enrolledClasses',
            foreignField: '_id',
            as: 'enrolledClassesDocs',
          },
        },
        {
          $project: {
            _id: 0,
            userId: '$_id',
            username: 1,
            email: 1,
            role: 1,
            isEmailVerified: 1,
            dailyStreak: 1,
            lastLogin: 1,
            enrolledClasses: {
              $map: {
                input: '$enrolledClassesDocs',
                as: 'cls',
                in: { classId: '$$cls._id', className: '$$cls.name' },
              },
            },
            badges: 1,
            createdAt: 1,
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid user ID');
    }

    const deleted = await userRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('User not found');
    }

    return deleted;
  }
};
