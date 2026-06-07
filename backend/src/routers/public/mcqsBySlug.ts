import { z } from 'zod';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import Mcqs from '@/models/mcqs.model';

const mcqsBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  bookSlug: z.string().min(1),
  chapterSlug: z.string().min(1),
  headingSlug: z.string().optional(),
  subHeadingSlug: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export const mcqsBySlug = publicProcedure
  .input(mcqsBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const { classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug, page, limit } = input;

      const match: Record<string, unknown> = { status: 'active' };

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

        {
          $lookup: {
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
          },
        },
        { $unwind: { path: '$book', preserveNullAndEmptyArrays: false } },
        { $match: { 'book.slug': bookSlug } },

        {
          $lookup: {
            from: 'chapters',
            localField: 'chapterId',
            foreignField: '_id',
            as: 'chapter',
          },
        },
        { $unwind: { path: '$chapter', preserveNullAndEmptyArrays: false } },
        { $match: { 'chapter.slug': chapterSlug } },
      ];

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

      pipeline.push(
        { $match: match },
        {
          $facet: {
            data: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
              {
                $project: {
                  _id: 0,
                  mcqId: '$_id',
                  question: 1,
                  options: 1,
                  correctOption: 1,
                  explanation: 1,
                  difficulty: 1,
                  className: '$class.name',
                  bookName: '$book.name',
                  chapterName: '$chapter.name',
                  headingName: '$heading.name',
                  subHeadingName: '$subHeading.name',
                },
              },
            ],
            total: [{ $count: 'count' }],
          },
        },
      );

      const result = await Mcqs.aggregate(pipeline);
      const mcqs = result[0]?.data ?? [];
      const totalRecords = result[0]?.total[0]?.count ?? 0;
      const totalPages = Math.ceil(totalRecords / limit);

      return {
        success: true,
        message: 'MCQs fetched successfully',
        data: mcqs.map((item: Record<string, unknown>) => ({
          mcqId: String(item.mcqId),
          question: item.question,
          options: item.options,
          correctOption: item.correctOption,
          explanation: item.explanation,
          difficulty: item.difficulty,
          className: item.className,
          bookName: item.bookName,
          chapterName: item.chapterName,
          headingName: item.headingName,
          subHeadingName: item.subHeadingName,
        })),
        pagination: { totalRecords, totalPages, currentPage: page, pageSize: limit },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
