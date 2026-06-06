import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { deleteChapterInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@/config/db.config';

export const chapterDelete = superAdminProcedure
    .input(deleteChapterInputSchema)
    .mutation(async ({ input }) => {
      try {
        const deleted = await chapterRepository.findByIdAndDelete(toObjectId(input.id));

        if (!deleted) {
          throw AppError.notFound('Chapter not found');
        }

        return {
          success: true,
          message: 'Chapter deleted successfully',
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });