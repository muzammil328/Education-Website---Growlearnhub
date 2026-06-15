import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { getBooksInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const bookGetAll = superAdminProcedure
  .input(getBooksInputSchema)
  .query(async ({ input }) => {
    try {
      const result = await bookRepository.aggregate({
        pipeline: (bookRepository).pipeline()
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
            bookId: '$_id',
            name: 1,
            code: 1,
            status: 1,
            classId: 1,
            className: '$class.name',
            serviceId: 1,
            services: 1,
          })
          .match(input.search ? {
            $or: [
              { className: { $regex: input.search, $options: 'i' } },
            ],
          } : {}),

        search: input.search,
        searchFields: ['name', 'code'],
        sort: input.sort,
        page: input.page,
        limit: input.limit,
      });

      const { data, pagination } = result;

      return {
        success: true,
        message: 'Books fetched successfully',
        data,
        pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });