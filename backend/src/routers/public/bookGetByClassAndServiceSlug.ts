import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { getBookBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const bookGetByClassAndServiceSlug = publicProcedure
  .input(getBookBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();
      const serviceSlug = input.serviceSlug?.trim();

      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await bookRepository.aggregate({
        pipeline: bookRepository
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
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
            pick: ['name', 'slug'],
            unwind: false,
          })

          // filter by class slug after join
          .match({
            'class.slug': classSlug,
            ...(serviceSlug ? { 'service.slug': serviceSlug } : {}),
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
        message: 'Books fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });