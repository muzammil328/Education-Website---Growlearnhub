import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Types } from 'mongoose';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import UserProgress from '@/models/userProgress.model';
import McqAttempt from '@/models/mcqAttempt.model';
import Mcqs from '@/models/mcqs.model';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const DIFFICULTY_MAP = {
  weak: 'easy',
  developing: 'medium',
  strong: 'hard',
} as const;

export const adaptiveMcqRouter = createTRPCRouter({
  /**
   * Returns a batch of MCQs tailored to the student's current mastery level for a subHeading.
   * Priority: spaced-repetition due items → recovery queue (recent wrong answers) → new questions.
   */
  getNextBatch: protectedProcedure
    .input(
      z.object({
        subHeadingId: z.string().min(1),
        sessionId: z.string().optional(),
        mode: z
          .enum([
            'practice',
            'exam_sim',
            'weak_topic',
            'focused_drill',
            'speed_round',
            'challenge',
            'revision',
            'micro_burst',
          ])
          .optional()
          .default('practice'),
        limit: z.number().int().min(1).max(50).optional().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

      if (!Types.ObjectId.isValid(input.subHeadingId)) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid subHeadingId' });
      }

      const userId = new Types.ObjectId(user.userId);
      const subHeadingId = new Types.ObjectId(input.subHeadingId);

      // Get student's mastery for this subHeading
      const progress = await UserProgress.findOne({ user: userId, subHeadingId }).lean();
      const masteryBand = progress?.masteryBand ?? 'weak';
      const difficultyBand = DIFFICULTY_MAP[masteryBand];

      // Get MCQ IDs the student answered correctly recently (last 7 days) — skip these
      const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
      const recentCorrectAttempts = await McqAttempt.find({
        userId,
        isCorrect: true,
        attemptedAt: { $gte: sevenDaysAgo },
      })
        .select('mcqId')
        .lean();
      const recentCorrectIds = recentCorrectAttempts.map(a => a.mcqId);

      // Get MCQs the student got wrong recently (recovery queue priority)
      const recentWrongAttempts = await McqAttempt.find({
        userId,
        isCorrect: false,
        attemptedAt: { $gte: sevenDaysAgo },
      })
        .select('mcqId')
        .lean();
      const recoveryIds = recentWrongAttempts
        .map(a => a.mcqId)
        .filter(id => !recentCorrectIds.some(cid => String(cid) === String(id)));

      // Base filter: global/public MCQs in this subHeading, matching difficulty, active
      const baseFilter = {
        subHeadingId,
        status: StatusEnum.Active,
        difficulty: difficultyBand,
      };

      // 1. Recovery queue MCQs (wrong recently)
      const recoveryMcqs =
        recoveryIds.length > 0
          ? await Mcqs.find({ ...baseFilter, _id: { $in: recoveryIds } })
              .select('question options correctOption difficulty explanation examinersNote')
              .limit(Math.ceil(input.limit / 2))
              .lean()
          : [];

      const recoveryMcqIds = recoveryMcqs.map(m => m._id);

      // 2. New questions (not in recovery, not recently correct)
      const excludeIds = [...recentCorrectIds, ...recoveryMcqIds];
      const newMcqs = await Mcqs.find({
        ...baseFilter,
        _id: { $nin: excludeIds },
      })
        .select('question options correctOption difficulty explanation examinersNote')
        .limit(input.limit - recoveryMcqs.length)
        .lean();

      const allMcqs = [...recoveryMcqs, ...newMcqs];

      // Shuffle
      for (let i = allMcqs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allMcqs[i], allMcqs[j]] = [allMcqs[j], allMcqs[i]];
      }

      return {
        success: true,
        masteryBand,
        difficultyBand,
        data: allMcqs.map(m => ({
          id: String(m._id),
          question: m.question,
          options: m.options,
          difficulty: m.difficulty,
          isRecovery: recoveryMcqIds.some(rid => String(rid) === String(m._id)),
        })),
      };
    }),

  /**
   * Micro Burst: 5 targeted questions from weakest subHeading + spaced repetition due items + 1 new.
   */
  getMicroBurst: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const userId = new Types.ObjectId(user.userId);

    // Weakest subHeading
    const weakest = await UserProgress.findOne({
      user: userId,
      masteryBand: 'weak',
    })
      .sort({ masteryScore: 1 })
      .lean();

    if (!weakest?.subHeadingId) {
      return { success: true, data: [], message: 'No weak subHeadings found' };
    }

    const subHeadingId = weakest.subHeadingId as Types.ObjectId;
    const difficultyBand = DIFFICULTY_MAP[weakest.masteryBand ?? 'weak'];

    // Get 4 from weakest subHeading
    const weakMcqs = await Mcqs.find({
      subHeadingId,
      status: StatusEnum.Active,
      difficulty: difficultyBand,
    })
      .select('question options correctOption difficulty')
      .limit(4)
      .lean();

    // Get 1 spaced-repetition due
    const dueProgress = await UserProgress.findOne({
      user: userId,
      nextReviewAt: { $lte: new Date() },
      subHeadingId: { $ne: subHeadingId },
    })
      .sort({ nextReviewAt: 1 })
      .lean();

    let dueMcq = null;
    if (dueProgress?.subHeadingId) {
      dueMcq = await Mcqs.findOne({
        subHeadingId: dueProgress.subHeadingId,
        status: StatusEnum.Active,
      })
        .select('question options correctOption difficulty')
        .lean();
    }

    const burst = [...weakMcqs, ...(dueMcq ? [dueMcq] : [])].slice(0, 5);

    return {
      success: true,
      data: burst.map(m => ({
        id: String(m._id),
        question: m.question,
        options: m.options,
        difficulty: m.difficulty,
      })),
    };
  }),
});
