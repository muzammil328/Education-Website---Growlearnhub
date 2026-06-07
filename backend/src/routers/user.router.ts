import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { StatusCode } from '@muzammil328/types';
import {
  updateProfileSchema,
} from '@muzammil328/education-packages';
import type {
  AuthUpdateProfileResponse,
} from '@muzammil328/education-packages/types';
import { createTRPCRouter, protectedProcedure, superAdminProcedure } from '@/trpc/trpc';
import { userService } from '../services/user.service';
import User from '@/models/user.model';
import Class from '@/models/class.model';
import Book from '@/models/book.model';
import Chapter from '@/models/chapter.model';
import Heading from '@/models/heading.model';
import SubHeading from '@/models/subHeading.model';
import Board from '@/models/board.model';
import Service from '@/models/service.model';
import Mcqs from '@/models/mcqs.model';

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

  getStats: superAdminProcedure.query(async () => {
    const [
      totalUsers,
      superAdmins,
      admins,
      teachers,
      students,
      totalClasses,
      totalBooks,
      totalChapters,
      totalHeadings,
      totalSubHeadings,
      totalBoards,
      totalServices,
      totalMcqs,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'super_admin' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'student' }),
      Class.countDocuments(),
      Book.countDocuments(),
      Chapter.countDocuments(),
      Heading.countDocuments(),
      SubHeading.countDocuments(),
      Board.countDocuments(),
      Service.countDocuments(),
      Mcqs.countDocuments(),
    ]);

    return {
      users: { total: totalUsers, superAdmins, admins, teachers, students },
      content: {
        classes: totalClasses,
        books: totalBooks,
        chapters: totalChapters,
        headings: totalHeadings,
        subHeadings: totalSubHeadings,
        boards: totalBoards,
        services: totalServices,
        mcqs: totalMcqs,
      },
    };
  }),
});
