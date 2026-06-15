import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { headingCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch, toObjectId } from '@muzammil328/db';
import { slugify } from '@/utils';

export const headingCreate = superAdminProcedure
    .input(headingCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const classId = input.classId ? toObjectId(input.classId) : undefined;
            const chapterId = input.chapterId ? toObjectId(input.chapterId) : undefined;
            const bookId = toObjectId(input.bookId);

            const existing = await headingRepository.findOne(buildMatch({
                slug: slugify(input.name),
                bookId,
                classId,
                chapterId,
            }));

            if (existing) {
                throw AppError.badRequest('Heading already exists in this chapter');
            }

            const created = await headingRepository.create({
                name: input.name,
                status: input.status,
                classId,
                bookId,
                chapterId,
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