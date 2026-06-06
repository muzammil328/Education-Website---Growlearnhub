import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import { getServiceBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const serviceGetBySlug = publicProcedure
  .input(getServiceBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();

      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await serviceRepository.aggregate({
        pipeline: serviceRepository
          .pipeline()
          .match(buildMatch({ status: 'active' })) // optional safety filter

          // match class by slug via lookup (classId is array)
          .lookup({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
          })

          // filter by class slug after join
          .match({
            'class.slug': classSlug,
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
        message: 'Services fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });