import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/utils';
import { StatusCode } from '@muzammil328/types';
import {
  updateProfileSchema,
} from '@muzammil328/education-packages';
import type {
  AuthUpdateProfileResponse,
} from '@muzammil328/education-packages/types';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import { userService } from '../services/user.service';

export const authRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw toTrpcError(AppError.unauthorized('Invalid user ID'));
    }

    return userService.getMe(userId);
  }),

  updateProfile: protectedProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }): Promise<AuthUpdateProfileResponse> => {
    const userId = ctx.user?.userId;

    const updated = await userService.update(userId as string, input);

    if (!updated) {
      throw toTrpcError(AppError.notFound('User not found'));
    }

    return {
      success: true,
      status: StatusCode.OK,
      message: 'Profile updated successfully',
      data: {
        user: {
          userId: String(updated._id),
          username: updated.username,
          email: updated.email,
          role: updated.role ?? '',
        },
      },
    };
  }),
});
