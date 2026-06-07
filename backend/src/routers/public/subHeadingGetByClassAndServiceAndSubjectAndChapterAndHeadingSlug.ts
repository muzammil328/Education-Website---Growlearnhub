import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { getSubHeadingBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug = publicProcedure
  .input(getSubHeadingBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();
      const bookSlug = input.bookSlug?.trim();
      const chapterSlug = input.chapterSlug?.trim();
      const headingSlug = input.headingSlug?.trim();


      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await subHeadingRepository.aggregate({
        pipeline: subHeadingRepository
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

          .lookupOne({
            from: 'headings',
            localField: 'headingId',
            foreignField: '_id',
            as: 'heading',
            pick: ['name', 'slug'],
            unwind: false,
          })

          // filter by class slug after join
          .match({
            ...(classSlug ? { 'class.slug': classSlug } : {}),
            ...(bookSlug ? { 'book.slug': bookSlug } : {}),
            ...(chapterSlug ? { 'chapter.slug': chapterSlug } : {}),
            ...(headingSlug ? { 'heading.slug': headingSlug } : {}),
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
        message: 'SubHeadings fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });