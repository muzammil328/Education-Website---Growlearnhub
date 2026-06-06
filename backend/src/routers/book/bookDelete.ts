import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import { deleteBookInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';

export const bookDelete = superAdminProcedure
    .input(deleteBookInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await bookRepository.findByIdAndDelete(input.id);

        if (!deleted) {
          throw AppError.notFound('Book not found');
        }

        return {
          success: true,
          message: 'Book deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });