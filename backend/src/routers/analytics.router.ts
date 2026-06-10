import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Types } from 'mongoose';
import { createTRPCRouter, superAdminProcedure, teacherProcedure, protectedProcedure } from '@/trpc/trpc';
import McqAttempt from '@/models/mcqAttempt.model';
import Mcqs from '@/models/mcqs.model';
import UserProgress from '@/models/userProgress.model';
import { resolveUserInstitutionId } from '@/trpc/lib/resolveInstitution';

export const analyticsRouter = createTRPCRouter({
  /**
   * Top MCQs with the highest wrong-answer rates and which distractor option was chosen most.
   * Institution-scoped for teachers, global for super admins.
   */
  distractorIntelligence: teacherProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).optional().default(10) }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });
      const institutionId = await resolveUserInstitutionId(user.userId);

      const matchStage = institutionId
        ? { isCorrect: false, institutionId: new Types.ObjectId(institutionId) }
        : { isCorrect: false };

      const result = await McqAttempt.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: { mcqId: '$mcqId', selectedOption: '$selectedOption' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        {
          $group: {
            _id: '$_id.mcqId',
            totalWrong: { $sum: '$count' },
            topDistractor: { $first: '$_id.selectedOption' },
            topDistractorCount: { $first: '$count' },
          },
        },
        { $sort: { totalWrong: -1 } },
        { $limit: input.limit },
        {
          $lookup: {
            from: 'mcqs',
            localField: '_id',
            foreignField: '_id',
            as: 'mcq',
          },
        },
        { $unwind: { path: '$mcq', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'mcqattempts',
            let: { mcqId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$mcqId', '$$mcqId'] } } },
              { $group: { _id: null, total: { $sum: 1 } } },
            ],
            as: 'totalAttempts',
          },
        },
        {
          $project: {
            _id: 0,
            mcqId: { $toString: '$_id' },
            question: '$mcq.question',
            options: '$mcq.options',
            correctOption: '$mcq.correctOption',
            topDistractor: 1,
            topDistractorCount: 1,
            totalWrong: 1,
            totalAttempts: { $ifNull: [{ $arrayElemAt: ['$totalAttempts.total', 0] }, 0] },
            wrongRate: {
              $cond: [
                { $gt: [{ $ifNull: [{ $arrayElemAt: ['$totalAttempts.total', 0] }, 0] }, 0] },
                { $divide: ['$totalWrong', { $ifNull: [{ $arrayElemAt: ['$totalAttempts.total', 0] }, 0] }] },
                0,
              ],
            },
          },
        },
      ]);

      return { success: true, data: result };
    }),

  /**
   * Class-wide student progress overview for teachers.
   */
  classProgressOverview: teacherProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const institutionId = await resolveUserInstitutionId(user.userId);
    if (!institutionId) return { success: true, data: [] };

    const result = await McqAttempt.aggregate([
      { $match: { institutionId: new Types.ObjectId(institutionId) } },
      {
        $group: {
          _id: '$userId',
          total: { $sum: 1 },
          correct: { $sum: { $cond: ['$isCorrect', 1, 0] } },
          confidentMistakes: {
            $sum: { $cond: [{ $eq: ['$outcomeType', 'confident_mistake'] }, 1, 0] },
          },
        },
      },
      { $sort: { correct: -1 } },
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
        $lookup: {
          from: 'userprogresses',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$user', '$$userId'] } } },
            { $group: { _id: null, openLoops: { $sum: '$openLoopCount' }, weakCount: { $sum: { $cond: [{ $eq: ['$masteryBand', 'weak'] }, 1, 0] } } } },
          ],
          as: 'progress',
        },
      },
      {
        $project: {
          _id: 0,
          userId: { $toString: '$_id' },
          name: '$user.username',
          total: 1,
          correct: 1,
          confidentMistakes: 1,
          accuracy: { $cond: [{ $gt: ['$total', 0] }, { $divide: ['$correct', '$total'] }, 0] },
          openLoops: { $ifNull: [{ $arrayElemAt: ['$progress.openLoops', 0] }, 0] },
          weakSubHeadings: { $ifNull: [{ $arrayElemAt: ['$progress.weakCount', 0] }, 0] },
        },
      },
    ]);

    return { success: true, data: result };
  }),

  /**
   * Students with 3+ confident mistakes in any topic this week — for teacher alerts.
   */
  confidentMistakeAlerts: teacherProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const institutionId = await resolveUserInstitutionId(user.userId);

    const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
    const matchStage = {
      outcomeType: 'confident_mistake',
      attemptedAt: { $gte: oneWeekAgo },
      ...(institutionId ? { institutionId: new Types.ObjectId(institutionId) } : {}),
    };

    const result = await McqAttempt.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { userId: '$userId', mcqId: '$mcqId' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.userId',
          totalConfidentMistakes: { $sum: '$count' },
          affectedMcqs: { $addToSet: '$_id.mcqId' },
        },
      },
      { $match: { totalConfidentMistakes: { $gte: 3 } } },
      { $sort: { totalConfidentMistakes: -1 } },
      {
        $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          userId: { $toString: '$_id' },
          name: '$user.username',
          email: '$user.email',
          totalConfidentMistakes: 1,
          affectedMcqCount: { $size: '$affectedMcqs' },
        },
      },
    ]);

    return { success: true, data: result };
  }),

  /**
   * Platform-wide stats for super admins.
   */
  platformStats: superAdminProcedure.query(async () => {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 86400000);
    const weekAgo = new Date(now.getTime() - 7 * 86400000);

    const [dauAgg, wauAgg, totalAgg, highErrorMcqs] = await Promise.all([
      McqAttempt.aggregate([
        { $match: { attemptedAt: { $gte: dayAgo } } },
        { $group: { _id: '$userId' } },
        { $count: 'count' },
      ]),
      McqAttempt.aggregate([
        { $match: { attemptedAt: { $gte: weekAgo } } },
        { $group: { _id: '$userId' } },
        { $count: 'count' },
      ]),
      McqAttempt.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, correct: { $sum: { $cond: ['$isCorrect', 1, 0] } } } },
      ]),
      // MCQs with error rate > 60%
      McqAttempt.aggregate([
        { $group: { _id: '$mcqId', total: { $sum: 1 }, wrong: { $sum: { $cond: [{ $eq: ['$isCorrect', false] }, 1, 0] } } } },
        { $match: { total: { $gte: 5 } } },
        { $addFields: { errorRate: { $divide: ['$wrong', '$total'] } } },
        { $match: { errorRate: { $gte: 0.6 } } },
        { $sort: { errorRate: -1 } },
        { $limit: 10 },
        { $lookup: { from: 'mcqs', localField: '_id', foreignField: '_id', as: 'mcq' } },
        { $unwind: { path: '$mcq', preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, mcqId: { $toString: '$_id' }, question: '$mcq.question', total: 1, wrong: 1, errorRate: 1 } },
      ]),
    ]);

    return {
      success: true,
      dau: dauAgg[0]?.count ?? 0,
      wau: wauAgg[0]?.count ?? 0,
      totalAttempts: totalAgg[0]?.total ?? 0,
      overallAccuracy: totalAgg[0]?.total > 0 ? totalAgg[0].correct / totalAgg[0].total : 0,
      highErrorMcqs,
    };
  }),
});
