import { Types } from 'mongoose';
import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { bookCreateSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import type { IVUAssessmentComponent } from '@/models/book.model';

export const bookCreate = superAdminProcedure
    .input(bookCreateSchema)
    .mutation(async ({ input }) => {
        try {
            const existing = await bookRepository.findOne({
                name: input.name,
            });

            if (existing) {
                const updated = await bookRepository.findByIdAndUpdate(
                    existing._id,
                    {
                        name: input.name,
                        code: input.code,
                        status: input.status,
                        classId: input.classId ? new Types.ObjectId(input.classId) : undefined,
                        serviceId: input.serviceId,
                        description: input.description,
                        creditHours: input.creditHours,
                        fileId: input.fileId,
                        pages: input.pages,
                        image: input.image,
                        order: input.order,
                        totalWeight: input.totalWeight,
                        components: input.components as IVUAssessmentComponent[],
                    },
                    { new: true }
                );

                return {
                    success: true,
                    message: 'Book updated successfully',
                    data: {
                        bookId: updated!._id,
                        name: updated!.name,
                        description: updated!.description,
                        status: updated!.status,
                    },
                };
            }

            const created = await bookRepository.create({
                name: input.name,
                code: input.code,
                status: input.status,
                classId: input.classId ? new Types.ObjectId(input.classId) : undefined,
                serviceId: input.serviceId,
                description: input.description,
                creditHours: input.creditHours,
                fileId: input.fileId,
                pages: input.pages,
                image: input.image,
                order: input.order,
                totalWeight: input.totalWeight,
                components: input.components as IVUAssessmentComponent[],
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