import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { headingCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@muzammil328/db';

export const headingCreate = superAdminProcedure
    .input(headingCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await headingRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Heading already exists');
            }

            const created = await headingRepository.create({
                name: input.name,
                status: input.status,
                classId: toObjectId(input.classId),
                bookId: toObjectId(input.bookId),
                chapterId: toObjectId(input.chapterId),
                order: input.order,
            })

            return {
                success: true,
                message: 'Heading created successfully',
                data: {
                    headingId: created._id,
                    name: created.name,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });