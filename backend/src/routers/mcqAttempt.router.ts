import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Types } from 'mongoose';
import Mcqs from '@/models/mcqs.model';
import McqAttempt from '../models/mcqAttempt.model';
import { McqScope } from '@muzammil328/education-packages/enums';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import { resolveUserInstitutionId } from '@/trpc/lib/resolveInstitution';

const submitInputSchema = z.object({
  mcqId: z.string().min(1),
  selectedOption: z.number().int().min(0),
  timeTakenMs: z.number().int().min(0).optional(),
});

const historyInputSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
});

const leaderboardInputSchema = z.object({
  limit: z.number().int().positive().max(100).optional().default(20),
});

export const mcqAttemptRouter = createTRPCRouter({
  /**
   * Append-only attempt submission. Correctness is computed server-side from the
   * stored MCQ; the client cannot override `isCorrect`. There is no update or
   * delete procedure — scores can only be modified directly in MongoDB.
   */
  submit: protectedProcedure.input(submitInputSchema).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
    }

    if (!Types.ObjectId.isValid(input.mcqId)) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid MCQ ID' });
    }

    const mcq = await Mcqs.findById(input.mcqId).lean();
    if (!mcq) throw new TRPCError({ code: 'NOT_FOUND', message: 'MCQ not found' });

    const userInstitutionId = await resolveUserInstitutionId(user.userId);

    if (mcq.scope === McqScope.INSTITUTION) {
      const mcqInstId = mcq.institutionId ? String(mcq.institutionId) : undefined;
      if (!mcqInstId || mcqInstId !== userInstitutionId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This MCQ is not available to your institution',
        });
      }
    }

    if (input.selectedOption >= mcq.options.length) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid option index' });
    }

    const isCorrect = input.selectedOption === mcq.correctOption;

    const attempt = await McqAttempt.create({
      userId: new Types.ObjectId(user.userId),
      institutionId: userInstitutionId ? new Types.ObjectId(userInstitutionId) : undefined,
      mcqId: new Types.ObjectId(input.mcqId),
      selectedOption: input.selectedOption,
      isCorrect,
      timeTakenMs: input.timeTakenMs,
    });

    return {
      success: true,
      message: 'Attempt recorded',
      data: {
        attemptId: String(attempt._id),
        isCorrect,
        correctOption: mcq.correctOption,
      },
    };
  }),

  myHistory: protectedProcedure.input(historyInputSchema).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
    }

    const userId = new Types.ObjectId(user.userId);
    const offset = (input.page - 1) * input.limit;

    const [data, totalRecords] = await Promise.all([
      McqAttempt.find({ userId }).sort({ attemptedAt: -1 }).skip(offset).limit(input.limit).lean(),
      McqAttempt.countDocuments({ userId }),
    ]);

    return {
      success: true,
      data: (data as Array<Record<string, unknown>>).map(item => ({
        attemptId: String(item._id),
        mcqId: String(item.mcqId),
        selectedOption: item.selectedOption as number,
        isCorrect: item.isCorrect as boolean,
        timeTakenMs: item.timeTakenMs as number | undefined,
        attemptedAt: item.attemptedAt as Date | undefined,
      })),
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / input.limit),
        currentPage: input.page,
        pageSize: input.limit,
      },
    };
  }),

  myStats: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
    }

    const userId = new Types.ObjectId(user.userId);
    const [agg] = await McqAttempt.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          correct: { $sum: { $cond: ['$isCorrect', 1, 0] } },
        },
      },
    ]);
    const total = agg?.total ?? 0;
    const correct = agg?.correct ?? 0;
    return {
      total,
      correct,
      incorrect: total - correct,
      accuracy: total > 0 ? correct / total : 0,
    };
  }),

  institutionLeaderboard: protectedProcedure
    .input(leaderboardInputSchema)
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
      }

      const institutionId = await resolveUserInstitutionId(user.userId);
      if (!institutionId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No institution associated with this user',
        });
      }

      const result = await McqAttempt.aggregate([
        { $match: { institutionId: new Types.ObjectId(institutionId) } },
        {
          $group: {
            _id: '$userId',
            total: { $sum: 1 },
            correct: { $sum: { $cond: ['$isCorrect', 1, 0] } },
          },
        },
        { $sort: { correct: -1, total: 1 } },
        { $limit: input.limit },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            userId: { $toString: '$_id' },
            username: '$user.username',
            total: 1,
            correct: 1,
            accuracy: {
              $cond: [{ $gt: ['$total', 0] }, { $divide: ['$correct', '$total'] }, 0],
            },
          },
        },
      ]);

      return { success: true, data: result };
    }),
});
