import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import { deleteServiceInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@muzammil328/db';

export const serviceDelete = superAdminProcedure
    .input(deleteServiceInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await serviceRepository.findByIdAndDelete(toObjectId(input.id));

        if (!deleted) {
          throw AppError.notFound('Service not found');
        }

        return {
          success: true,
          message: 'Service deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });