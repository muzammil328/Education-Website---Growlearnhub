import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { getSubHeadingByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch } from '@muzammil328/db';

export const subHeadingGetById = superAdminProcedure
    .input(getSubHeadingByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await subHeadingRepository.aggregate({
                pipeline: subHeadingRepository.pipeline()

                    // match by id (instead of aggregateById)
                    .match(
                        buildMatch({
                            _id: input.id,
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
                        classId: '$_id',
                        name: 1,
                        description: 1,
                        status: 1,
                        serviceId: 1,
                        services: 1,
                        class: {
                            $map: {
                                input: '$class',
                                as: 'cls',
                                in: { classId: '$$cls._id', name: '$$cls.name' },
                            },
                        },
                    })
                    .build(),

                single: true, // 👈 important (returns one document)
            });

            if (!result) {
                throw AppError.notFound('SubHeading not found');
            }

            return {
                success: true,
                message: 'SubHeading fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });