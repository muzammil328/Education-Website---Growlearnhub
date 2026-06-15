import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { getSubHeadingsInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';
import { getSearchWords } from '@/utils';

export const subHeadingGetAll = superAdminProcedure
  .input(getSubHeadingsInputSchema)
  .query(async ({ input }) => {
    try {
      const result = await subHeadingRepository.aggregate({
        pipeline: (subHeadingRepository).pipeline()
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
          .lookupOne({
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
            pick: ['name'],
            unwind: false,
          })
          .lookupOne({
            from: 'chapters',
            localField: 'chapterId',
            foreignField: '_id',
            as: 'chapter',
            pick: ['name', 'order'],
            unwind: false,
          })
          .lookupOne({
            from: 'headings',
            localField: 'headingId',
            foreignField: '_id',
            as: 'heading',
            pick: ['name', 'order'],
            unwind: false,
          })
          .project({
            _id: 0,
            subHeadingId: '$_id',
            name: 1,
            status: 1,
            classId: 1,
            bookId: 1,
            chapterId: 1,
            headingId: 1,
            className: '$class.name',
            bookName: '$book.name',
            chapterName: '$chapter.name',
            chapterOrder: { $arrayElemAt: ['$chapter.order', 0] },
            headingName: '$heading.name',
            headingOrder: { $arrayElemAt: ['$heading.order', 0] },
            order: 1,
            createdAt: 1,
            updatedAt: 1,
            serviceId: 1,
            services: 1,
          })
          .match(input.search ? {
            $and: getSearchWords(input.search).map(word => ({
              $or: [
                { name: { $regex: word, $options: 'i' } },
                { className: { $regex: word, $options: 'i' } },
                { bookName: { $regex: word, $options: 'i' } },
                { chapterName: { $regex: word, $options: 'i' } },
                { headingName: { $regex: word, $options: 'i' } },
                { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$order', ''] } }, regex: word, options: 'i' } } },
                { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$chapterOrder', ''] } }, regex: word, options: 'i' } } },
                { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$headingOrder', ''] } }, regex: word, options: 'i' } } },
              ],
            })),
          } : {}),

        sort: `${input.sort}:${input.sortDirection}`,
        page: input.page,
        limit: input.limit,
      });

      const { data, pagination } = result;

      return {
        success: true,
        message: 'SubHeadings fetched successfully',
        data,
        pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });