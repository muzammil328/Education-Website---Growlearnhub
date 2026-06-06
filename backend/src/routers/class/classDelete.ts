import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { deleteClassInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';

export const classDelete = superAdminProcedure
    .input(deleteClassInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await classRepository.findByIdAndDelete(input.id);

        if (!deleted) {
          throw AppError.notFound('Class not found');
        }

        return {
          success: true,
          message: 'Class deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });