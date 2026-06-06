import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { boardRepository } from '@/repository/board.repository';
import { boardCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { parseObjectIdList } from '@muzammil328/db';

export const boardCreate = superAdminProcedure
    .input(boardCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await boardRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Board already exists');
            }

            const parsedClassIds = parseObjectIdList(input.classId);
            const classId = Array.isArray(parsedClassIds) ? parsedClassIds[0] : parsedClassIds;

            const created = await boardRepository.create({
                name: input.name,
                classId,
                description: input.description,
                status: input.status,
            });

            return {
                success: true,
                message: 'Board created successfully',
                data: {
                    boardId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });