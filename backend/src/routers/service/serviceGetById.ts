import { serviceRepository } from '@/repository/service.repository';
import { getServiceByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { buildMatch, toObjectId } from '@muzammil328/db';
import { toTrpcError } from '@muzammil328/trpc';

export const serviceGetById = superAdminProcedure
    .input(getServiceByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await serviceRepository.aggregate({
                pipeline: serviceRepository.pipeline()
                    .match(
                        buildMatch({
                            _id: toObjectId(input.id),
                        }),
                    )
                    .project({
                        _id: 0,
                        serviceId: '$_id',
                        name: 1,
                        slug: 1,
                    })
                    .build(),

                single: true,
            });

            if (!result) {
                throw AppError.notFound('Service not found');
            }

            return {
                success: true,
                message: 'Service fetched successfully',
                data: result,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });
