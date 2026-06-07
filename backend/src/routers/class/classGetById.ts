import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { getClassByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const classGetById = superAdminProcedure
    .input(getClassByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await classRepository.aggregate({
                pipeline: classRepository.pipeline()

                    // match by id (instead of aggregateById)
                    .match(
                        buildMatch({
                            _id: toObjectId(input.id),
                        }),
                    )

                    // join service
                    .lookupOne({
                        from: 'services',
                        localField: 'serviceId',
                        foreignField: '_id',
                        as: 'service',
                        pick: ['name', '_id'],
                        unwind: false,
                    })

                    // shape response
                    .project({
                        _id: 0,
                        classId: '$_id',
                        name: 1,
                        description: 1,
                        status: 1,
                        image: 1,
                        keywords: 1,
                        service: {
                            $map: {
                                input: '$service',
                                as: 'svc',
                                in: { serviceId: '$$svc._id', name: '$$svc.name' },
                            },
                        },
                    })
                    .build(),

                single: true, // 👈 important (returns one document)
            });

            if (!result) {
                throw AppError.notFound('Class not found');
            }

            return {
                success: true,
                message: 'Class fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });