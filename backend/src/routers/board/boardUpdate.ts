import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { boardRepository } from '@/repository/board.repository';
import { updateBoardInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { resolveObjectId, toObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';

export const boardUpdate = superAdminProcedure
  .input(updateBoardInputSchema)
  .mutation(async ({ input }) => {
    try {
      const duplicate = await boardRepository.findOne({
        name: input.updates.name,
        _id: {
          $ne: resolveObjectId(input.id),
        },
      });

      if (duplicate) {
        throw AppError.badRequest('Board already exists');
      }

      const updated = await boardRepository.findByIdAndUpdate(
        toObjectId(input.id),
        {
          name: input.updates.name,
          status: input.updates.status,
          classId: input.updates.classId,
          description: input.updates.description,
        },
        {
          new: true,
        }
      );

      if (!updated) {
        throw AppError.notFound('Board not found');
      }

      return {
        success: true,
        message: 'Board updated successfully',
        data: {
          boardId: String(updated._id),
          name: updated.name,
          description: updated.description,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });