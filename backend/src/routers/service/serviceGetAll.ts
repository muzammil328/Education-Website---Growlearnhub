import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import { getServicesInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const serviceGetAll = superAdminProcedure
  .input(getServicesInputSchema)
  .query(async ({ input }) => {
    try {
      const result = await serviceRepository.aggregate({
        pipeline: (serviceRepository).pipeline()
          .match(buildMatch(
            { status: input.status },
          ))
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
            serviceId: '$_id',
            name: 1,
            status: 1,
            className: '$class.name',
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
        message: 'Services fetched successfully',
        data,
        pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });