import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { getBookByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const bookGetById = superAdminProcedure
    .input(getBookByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await bookRepository.aggregate({
                pipeline: bookRepository.pipeline()

                    // match by id (instead of aggregateById)
                    .match(
                        buildMatch({
                            _id: toObjectId(input.id),
                        }),
                    )

                    // join class
                    .lookupOne({
                        from: 'classes',
                        localField: 'classId',
                        foreignField: '_id',
                        as: 'class',
                        pick: ['name', '_id'],
                        unwind: false,
                    })

                    // join service
                    .lookup({
                        from: 'services',
                        localField: 'serviceId',
                        foreignField: '_id',
                        as: 'services',
                    })

                    // shape response
                    .project({
                        _id: 0,
                        bookId: '$_id',
                        name: 1,
                        description: 1,
                        status: 1,
                        classId: 1,
                        serviceId: 1,
                        services: 1,
                        code: 1,
                        creditHours: 1,
                        fileId: 1,
                        pages: 1,
                        image: 1,
                        totalWeight: 1,
                        components: 1,
                        class: {
                            $let: {
                                vars: { c: { $first: '$class' } },
                                in: { classId: '$$c._id', name: '$$c.name' },
                            },
                        },
                    })
                    .build(),

                single: true, // 👈 important (returns one document)
            });

            if (!result) {
                throw AppError.notFound('Book not found');
            }

            return {
                success: true,
                message: 'Book fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });