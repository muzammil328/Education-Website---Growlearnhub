import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { getClassesInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const classGetAll = superAdminProcedure
  .input(getClassesInputSchema)
  .query(async ({ input }) => {
    try {
      const result = await classRepository.aggregate({
        pipeline: (classRepository).pipeline()
          .match(buildMatch(
            { status: input.status },
          ))
          .lookupOne({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
            pick: ['name'],
            unwind: false,
          })
          .project({
            _id: 0,
            classId: '$_id',
            name: 1,
            status: 1,
            serviceName: '$service.name',  // flat field, not array
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
        message: 'Classes fetched successfully',
        data,
        pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });