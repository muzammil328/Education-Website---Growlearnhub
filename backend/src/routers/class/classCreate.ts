import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { classCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { parseObjectIdList } from '@muzammil328/db';

export const classCreate = superAdminProcedure
    .input(classCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await classRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Class already exists');
            }

            const created = await classRepository.create({
                name: input.name.trim(),
                description: input.description?.trim(),
                serviceId: parseObjectIdList(input.serviceIds),
                status: input.status,
                image: input.image?.trim(),
                keywords: input.keywords?.map(k => k.trim()) ?? [],
            })

            return {
                success: true,
                message: 'Class created successfully',
                data: {
                    classId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });