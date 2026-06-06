import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { deleteSubHeadingInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@/config/db.config';

export const subHeadingDelete = superAdminProcedure
    .input(deleteSubHeadingInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await subHeadingRepository.findByIdAndDelete(toObjectId(input.id));

        if (!deleted) {
          throw AppError.notFound('SubHeading not found');
        }

        return {
          success: true,
          message: 'SubHeading deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });