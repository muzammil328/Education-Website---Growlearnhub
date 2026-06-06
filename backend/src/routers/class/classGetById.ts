import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { getClassByIdInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';

export const classGetById = superAdminProcedure
    .input(getClassByIdInputSchema)
    .query(async ({ input }) => {
        try {
            const result = await classRepository.findById(input.id);

            if (!result) {
                throw AppError.notFound('Class not found');
            }

            return {
                classId: result._id,
                name: result.name,
                description: result.description,
                status: result.status,
                serviceIds: (result.serviceId ?? []).map(
                    (id: Types.ObjectId | string) => String(id)
                ),
                image: result.image,
                keywords: result.keywords ?? [],
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });