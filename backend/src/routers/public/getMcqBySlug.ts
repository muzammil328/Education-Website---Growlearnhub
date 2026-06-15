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

      const c = mcq.classId as { name?: string; slug?: string } | null;
      const b = mcq.bookId as { name?: string; slug?: string } | null;
      const ch = mcq.chapterId as { name?: string; slug?: string } | null;
      const h = mcq.headingId as { name?: string; slug?: string } | null;
      const sh = mcq.subHeadingId as { name?: string; slug?: string } | null;

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
          classSlug: c?.slug,
          bookName: b?.name,
          bookSlug: b?.slug,
          chapterName: ch?.name,
          chapterSlug: ch?.slug,
          headingName: h?.name,
          headingSlug: h?.slug,
          subHeadingName: sh?.name,
          subHeadingSlug: sh?.slug,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
