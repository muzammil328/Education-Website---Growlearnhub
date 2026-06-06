import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import { serviceCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { parseObjectIdList } from '@muzammil328/db';

export const serviceCreate = superAdminProcedure
    .input(serviceCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await serviceRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Service already exists');
            }

            const created = await serviceRepository.create({
                name: input.name,
                status: input.status,
                description: input.description,
                classId: parseObjectIdList(input.classId),
                image: input.image,
                keywords: input.keywords ?? [],
            })

            return {
                success: true,
                message: 'Service created successfully',
                data: {
                    serviceId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });