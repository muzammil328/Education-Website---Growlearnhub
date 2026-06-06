import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { getChapterBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch } from '@muzammil328/db';

export const chapterGetBySlug = publicProcedure
  .input(getChapterBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();
      const bookSlug = input.bookSlug?.trim();

      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await chapterRepository.aggregate({
        pipeline: chapterRepository
          .pipeline()
          .match(buildMatch({ status: 'active' }))
          .lookup({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
          })
          .lookup({
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
          })
          .match({
            'class.slug': classSlug,
            ...(bookSlug ? { 'book.slug': bookSlug } : {}),
          })
          .project({
            _id: 0,
            name: 1,
            slug: 1,
          })
          .build(),
      });

      return {
        success: true,
        message: 'Chapters fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
