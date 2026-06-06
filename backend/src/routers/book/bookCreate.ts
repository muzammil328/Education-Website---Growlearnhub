import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { bookCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';

export const bookCreate = superAdminProcedure
    .input(bookCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await bookRepository.findOne({
                name: input.name,
            });

            if (existing) {
                throw AppError.badRequest('Book already exists');
            }

            const created = await bookRepository.create({
                name: input.name,
                code: input.code,
                status: input.status,
                classId: input.classId,
                serviceId: input.serviceId,
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
                message: 'Book created successfully',
                data: {
                    bookId: created._id,
                    name: created.name,
                    description: created.description,
                    status: created.status,
                },
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });