import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { chapterCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@/config/db.config';

export const chapterCreate = superAdminProcedure
    .input(chapterCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await chapterRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Chapter already exists');
            }

            const created = await chapterRepository.create({
                name: input.name,
                status: input.status,
                bookId: toObjectId(input.bookId),
                classId: toObjectId(input.classId),
                description: input.description,
                content: input.content,
                order: input.order,
            })

            return {
                success: true,
                message: 'Chapter created successfully',
                data: {
                    chapterId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });