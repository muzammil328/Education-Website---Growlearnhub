import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { boardRepository } from '@/repository/board.repository';
import { deleteBoardInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@/config/db.config';

export const boardDelete = superAdminProcedure
    .input(deleteBoardInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await boardRepository.findByIdAndDelete(toObjectId(input.id));

        if (!deleted) {
          throw AppError.notFound('Board not found');
        }

        return {
          success: true,
          message: 'Board deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });