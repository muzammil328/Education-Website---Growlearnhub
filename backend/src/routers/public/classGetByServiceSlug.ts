import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { getClassByServiceSlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const classGetByServiceSlug = publicProcedure
  .input(getClassByServiceSlugInputSchema)
  .query(async ({ input }) => {
    try {
      const serviceSlug = input.serviceSlug.trim();

      if (!serviceSlug) {
        throw AppError.badRequest('Service slug is required');
      }

      const result = await classRepository.aggregate({
        pipeline: classRepository
          .pipeline()
          .match(buildMatch({ status: 'active' })) // optional safety filter

          // match service by slug via lookup
          .lookupOne({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
            pick: ['name', 'slug'],
            unwind: false,
          })

          // filter by service slug after join
          .match({
            'service.slug': serviceSlug,
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
        message: 'Classes fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });