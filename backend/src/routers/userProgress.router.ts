import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Types } from 'mongoose';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import UserProgress from '@/models/userProgress.model';

export const userProgressRouter = createTRPCRouter({
  myProgress: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const records = await UserProgress.find({ user: new Types.ObjectId(user.userId) })
      .populate('bookId', 'name slug')
      .populate('chapterId', 'name slug')
      .populate('headingId', 'name slug')
      .populate('subHeadingId', 'name slug')
      .lean();

    return { success: true, data: records };
  }),

  weakSubHeadings: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const records = await UserProgress.find({
      user: new Types.ObjectId(user.userId),
      masteryBand: 'weak',
    })
      .sort({ openLoopCount: -1, masteryScore: 1 })
      .populate('subHeadingId', 'name slug')
      .populate('headingId', 'name slug')
      .populate('chapterId', 'name slug')
      .lean();

    return { success: true, data: records };
  }),

  dueForReview: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const records = await UserProgress.find({
      user: new Types.ObjectId(user.userId),
      nextReviewAt: { $lte: new Date() },
    })
      .sort({ nextReviewAt: 1 })
      .populate('subHeadingId', 'name slug')
      .populate('chapterId', 'name slug')
      .lean();

    return { success: true, data: records };
  }),

  openLoops: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const records = await UserProgress.find({
      user: new Types.ObjectId(user.userId),
      openLoopCount: { $gt: 0 },
    })
      .sort({ openLoopCount: -1 })
      .populate('subHeadingId', 'name slug')
      .populate('headingId', 'name slug')
      .populate('chapterId', 'name slug')
      .lean();

    const totalOpenLoops = records.reduce((s, r) => s + (r.openLoopCount ?? 0), 0);

    return { success: true, totalOpenLoops, data: records };
  }),

  dismissLoop: protectedProcedure
    .input(z.object({ progressId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

      if (!Types.ObjectId.isValid(input.progressId)) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid progress ID' });
      }

      const result = await UserProgress.updateOne(
        { _id: new Types.ObjectId(input.progressId), user: new Types.ObjectId(user.userId) },
        { $inc: { openLoopCount: -1 } },
      );

      if (!result.matchedCount) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Progress record not found' });
      }

      return { success: true };
    }),

  subHeadingProgress: protectedProcedure
    .input(z.object({ subHeadingId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const record = await UserProgress.findOne({
        user: new Types.ObjectId(user.userId),
        subHeadingId: new Types.ObjectId(input.subHeadingId),
      }).lean();

      return { success: true, data: record ?? null };
    }),
});
