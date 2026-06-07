import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { getChapterByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const chapterGetById = superAdminProcedure
    .input(getChapterByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await chapterRepository.aggregate({
                pipeline: chapterRepository.pipeline()

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

                    // join book
                    .lookupOne({
                        from: 'books',
                        localField: 'bookId',
                        foreignField: '_id',
                        as: 'book',
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
                        chapterId: '$_id',
                        name: 1,
                        description: 1,
                        status: 1,
                        classId: 1,
                        bookId: 1,
                        serviceId: 1,
                        services: 1,
                        content: 1,
                        order: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        class: {
                            $let: {
                                vars: { c: { $first: '$class' } },
                                in: { classId: '$$c._id', name: '$$c.name' },
                            },
                        },
                        book: {
                            $let: {
                                vars: { b: { $first: '$book' } },
                                in: { bookId: '$$b._id', name: '$$b.name' },
                            },
                        },
                    })
                    .build(),

                single: true, // 👈 important (returns one document)
            });

            if (!result) {
                throw AppError.notFound('Chapter not found');
            }

            return {
                success: true,
                message: 'Chapter fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });