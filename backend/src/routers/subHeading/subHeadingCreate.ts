import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { subHeadingCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';

export const subHeadingCreate = superAdminProcedure
    .input(subHeadingCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await subHeadingRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('SubHeading already exists');
            }

            const created = await subHeadingRepository.create({
                name: input.name,
                code: input.code,
                status: input.status,
                classId: new Types.ObjectId(input.classId),
                serviceId: input.serviceId?.map((id: string) => new Types.ObjectId(id)),
                description: input.description,
                creditHours: input.creditHours,
                fileId: input.fileId,
                pages: input.pages,
                image: input.image,
                order: input.order,
                totalWeight: input.totalWeight,
                components: input.components,
            })

            return {
                success: true,
                message: 'SubHeading created successfully',
                data: {
                    subHeadingId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });