import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { getHeadingBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const headingGetBySlug = publicProcedure
  .input(getHeadingBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();
      const bookSlug = input.bookSlug?.trim();
      const chapterSlug = input.chapterSlug?.trim();

      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await headingRepository.aggregate({
        pipeline: headingRepository
          .pipeline()
          .match(buildMatch({ status: 'active' })) // optional safety filter

          // match class by slug via lookup
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['name', 'slug'],
            unwind: false,
          })

          .lookupOne({
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
            pick: ['name', 'slug'],
            unwind: false,
          })

          .lookupOne({
            from: 'chapters',
            localField: 'chapterId',
            foreignField: '_id',
            as: 'chapter',
            pick: ['name', 'slug'],
            unwind: false,
          })

          // filter by class slug after join
          .match({
            ...(bookSlug ? { 'book.slug': bookSlug } : {}),
            ...(chapterSlug ? { 'chapter.slug': chapterSlug } : {}),
            ...(classSlug ? { 'class.slug': classSlug } : {}),
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
        message: 'Headings fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });