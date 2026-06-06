import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { updateHeadingInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { resolveObjectId, toObjectId } from '@muzammil328/db';

export const headingUpdate = superAdminProcedure
  .input(updateHeadingInputSchema)
  .mutation(async ({ input }) => {
    try {
      const duplicate = await headingRepository.findOne({
        name: input.updates.name,
        _id: {
          $ne: resolveObjectId(input.id),
        },
      });

      if (duplicate) {
        throw AppError.badRequest('Heading already exists');
      }

      const updated = await headingRepository.findByIdAndUpdate(
        toObjectId(input.id),
        {
          name: input.updates.name,
          status: input.updates.status,
          classId: toObjectId(input.updates.classId),
          bookId: toObjectId(input.updates.bookId),
          chapterId: toObjectId(input.updates.chapterId),
          order: input.updates.order,
        },
        {
          new: true,
        }
      );

      if (!updated) {
        throw AppError.notFound('Heading not found');
      }

      return {
        success: true,
        message: 'Heading updated successfully',
        data: {
          headingId: String(updated._id),
          name: updated.name,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });