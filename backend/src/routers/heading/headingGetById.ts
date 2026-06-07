import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { getHeadingByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const headingGetById = superAdminProcedure
    .input(getHeadingByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await headingRepository.aggregate({
                pipeline: headingRepository.pipeline()

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

                    // join chapter
                    .lookupOne({
                        from: 'chapters',
                        localField: 'chapterId',
                        foreignField: '_id',
                        as: 'chapter',
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
                        headingId: '$_id',
                        name: 1,
                        description: 1,
                        status: 1,
                        classId: 1,
                        bookId: 1,
                        chapterId: 1,
                        serviceId: 1,
                        services: 1,
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
                        chapter: {
                            $let: {
                                vars: { ch: { $first: '$chapter' } },
                                in: { chapterId: '$$ch._id', name: '$$ch.name' },
                            },
                        },
                    })
                    .build(),

                single: true, // 👈 important (returns one document)
            });

            if (!result) {
                throw AppError.notFound('Heading not found');
            }

            return {
                success: true,
                message: 'Heading fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });