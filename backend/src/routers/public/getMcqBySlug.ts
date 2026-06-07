import { z } from 'zod';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import Mcqs from '@/models/mcqs.model';

export const getMcqBySlug = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const mcq = await Mcqs.findOne({ slug: input.slug, status: 'active' })
        .populate('classId', 'name slug')
        .populate('bookId', 'name slug')
        .populate('chapterId', 'name slug')
        .populate('headingId', 'name slug')
        .populate('subHeadingId', 'name slug')
        .lean();

      if (!mcq) {
        throw new Error('MCQ not found');
      }

      const c = mcq.classId as { name?: string } | null;
      const b = mcq.bookId as { name?: string } | null;
      const ch = mcq.chapterId as { name?: string } | null;
      const h = mcq.headingId as { name?: string } | null;
      const sh = mcq.subHeadingId as { name?: string } | null;

      return {
        success: true,
        data: {
          mcqId: String(mcq._id),
          slug: mcq.slug,
          question: mcq.question,
          options: mcq.options,
          correctOption: mcq.correctOption,
          explanation: mcq.explanation,
          difficulty: mcq.difficulty,
          className: c?.name,
          bookName: b?.name,
          chapterName: ch?.name,
          headingName: h?.name,
          subHeadingName: sh?.name,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
