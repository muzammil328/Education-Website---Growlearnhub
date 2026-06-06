import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { deleteHeadingInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@/config/db.config';

export const headingDelete = superAdminProcedure
    .input(deleteHeadingInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await headingRepository.findByIdAndDelete(toObjectId(input.id));

        if (!deleted) {
          throw AppError.notFound('Heading not found');
        }

        return {
          success: true,
          message: 'Heading deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });