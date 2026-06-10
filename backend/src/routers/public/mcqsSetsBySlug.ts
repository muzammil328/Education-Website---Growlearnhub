import { z } from 'zod';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import Mcqs from '@/models/mcqs.model';

const inputSchema = z.object({
  classSlug: z.string().min(1),
  bookSlug: z.string().optional(),
  chapterSlug: z.string().optional(),
  headingSlug: z.string().optional(),
  subHeadingSlug: z.string().optional(),
});

const SET_SIZE = 10;

export const mcqsSetsBySlug = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    try {
      const { classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug } = input;

      const pipeline: Record<string, unknown>[] = [
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
          },
        },
        { $unwind: { path: '$class', preserveNullAndEmptyArrays: false } },
        { $match: { 'class.slug': classSlug } },
      ];

      if (bookSlug) {
        pipeline.push(
          { $lookup: { from: 'books', localField: 'bookId', foreignField: '_id', as: 'book' } },
          { $unwind: { path: '$book', preserveNullAndEmptyArrays: false } },
          { $match: { 'book.slug': bookSlug } },
        );
      }

      if (chapterSlug) {
        pipeline.push(
          { $lookup: { from: 'chapters', localField: 'chapterId', foreignField: '_id', as: 'chapter' } },
          { $unwind: { path: '$chapter', preserveNullAndEmptyArrays: false } },
          { $match: { 'chapter.slug': chapterSlug } },
        );
      }

      if (headingSlug) {
        pipeline.push(
          {
            $lookup: {
              from: 'headings',
              localField: 'headingId',
              foreignField: '_id',
              as: 'heading',
            },
          },
          { $unwind: { path: '$heading', preserveNullAndEmptyArrays: true } },
          { $match: { 'heading.slug': headingSlug } },
        );
      }

      if (subHeadingSlug) {
        pipeline.push(
          {
            $lookup: {
              from: 'subheadings',
              localField: 'subHeadingId',
              foreignField: '_id',
              as: 'subHeading',
            },
          },
          { $unwind: { path: '$subHeading', preserveNullAndEmptyArrays: true } },
          { $match: { 'subHeading.slug': subHeadingSlug } },
        );
      }

      pipeline.push({ $match: { status: 'active' } });
      pipeline.push({ $count: 'total' });

      const result = await Mcqs.aggregate(pipeline as any);
      const totalMcqs = result[0]?.total ?? 0;
      const totalSets = Math.ceil(totalMcqs / SET_SIZE);

      const sets = Array.from({ length: totalSets }, (_, i) => ({
        setNumber: i + 1,
        count: i === totalSets - 1 ? totalMcqs - i * SET_SIZE : SET_SIZE,
      }));

      return {
        success: true,
        message: 'MCQ sets fetched successfully',
        data: {
          totalMcqs,
          totalSets,
          setSize: SET_SIZE,
          sets,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
