import { Types } from 'mongoose';
import { z } from 'zod';
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

  setExamTarget: protectedProcedure
    .input(z.object({
      examTarget: z.string().trim().max(100),
      examDate: z.string().datetime(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.userId;
      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw toTrpcError(AppError.unauthorized('Invalid user'));
      }
      await User.findByIdAndUpdate(new Types.ObjectId(userId), {
        examTarget: input.examTarget,
        examDate: new Date(input.examDate),
      });
      return { success: true };
    }),

  myBadges: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw toTrpcError(AppError.unauthorized('Invalid user'));
    }
    const user = await User.findById(new Types.ObjectId(userId)).select('badges burstStreakCount').lean();
    return {
      badges: (user?.badges as string[]) ?? [],
      burstStreakCount: (user?.burstStreakCount as number) ?? 0,
    };
  }),

  readinessScore: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw toTrpcError(AppError.unauthorized('Invalid user'));
    }

    const user = await User.findById(new Types.ObjectId(userId))
      .select('examTarget examDate burstStreakCount lastBurstDate')
      .lean();

    if (!user?.examDate) {
      return { hasExam: false, readinessScore: null, daysRemaining: null, examTarget: null, examDate: null };
    }

    const now = new Date();
    const examDate = new Date(user.examDate as Date);
    const daysRemaining = Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / 86400000));

    // Readiness = % of subHeadings with masteryBand 'strong'
    const [strongCount, totalCount] = await Promise.all([
      SubHeading.countDocuments(),
      SubHeading.countDocuments(),
    ]);

    // Use UserProgress for actual mastery
    const UserProgress = (await import('@/models/userProgress.model')).default;
    const [strongProgress, totalProgress] = await Promise.all([
      UserProgress.countDocuments({ user: new Types.ObjectId(userId), masteryBand: 'strong' }),
      UserProgress.countDocuments({ user: new Types.ObjectId(userId) }),
    ]);

    const readinessScore = totalProgress > 0 ? Math.round((strongProgress / totalProgress) * 100) : 0;

    return {
      hasExam: true,
      examTarget: user.examTarget as string | undefined,
      examDate: examDate.toISOString(),
      daysRemaining,
      readinessScore,
      strongSubHeadings: strongProgress,
      totalTrackedSubHeadings: totalProgress,
      burstStreakCount: (user.burstStreakCount as number) ?? 0,
    };
  }),
});
