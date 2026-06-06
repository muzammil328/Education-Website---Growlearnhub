import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { getHeadingsInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const headingGetAll = superAdminProcedure
  .input(getHeadingsInputSchema)
  .query(async ({ input }) => {
    try {
      const result = await headingRepository.aggregate({
        pipeline: (headingRepository).pipeline()
          .match(buildMatch(
            { status: input.status },
          ))
          .lookup({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'services',
          })
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['name'],
            unwind: false,
          })
          .project({
            _id: 0,
            classId: '$_id',
            name: 1,
            status: 1,
            className: '$class.name',
            serviceId: 1,
            services: 1,
          }),

        search: input.search,
        searchFields: ['name'],
        sort: input.sort,
        page: input.page,
        limit: input.limit,
      });

      const { data, pagination } = result;

      return {
        success: true,
        message: 'Headings fetched successfully',
        data,
        pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });