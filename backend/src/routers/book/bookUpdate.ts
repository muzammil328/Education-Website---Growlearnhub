import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { updateBookInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { resolveObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';

export const bookUpdate = superAdminProcedure
  .input(updateBookInputSchema)
  .mutation(async ({ input }) => {
    try {
      const duplicate = await bookRepository.findOne({
        name: input.updates.name,
        _id: {
          $ne: resolveObjectId(input.id),
        },
      });

      if (duplicate) {
        throw AppError.badRequest('Book already exists');
      }

      const updated = await bookRepository.findByIdAndUpdate(
        input.id,
        {
          name: input.updates.name,
          code: input.updates.code,
          status: input.updates.status,
          classId: input.updates.classId,
          serviceId: input.updates.serviceId,
          description: input.updates.description,
          creditHours: input.updates.creditHours,
          fileId: input.updates.fileId,
          pages: input.updates.pages,
          image: input.updates.image,
          order: input.updates.order,
          totalWeight: input.updates.totalWeight,
          components: input.updates.components,
        },
        {
          new: true,
        }
      );

      if (!updated) {
        throw AppError.notFound('Book not found');
      }

      return {
        success: true,
        message: 'Book updated successfully',
        data: {
          bookId: String(updated._id),
          name: updated.name,
          description: updated.description,
          status: updated.status,
          serviceIds: (updated.serviceId ?? []).map(
            (id: Types.ObjectId | string) => String(id)
          ),
          image: updated.image,
          keywords: updated.keywords ?? [],
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });