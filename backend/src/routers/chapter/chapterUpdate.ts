import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { updateChapterInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { resolveObjectId, toObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';

export const chapterUpdate = superAdminProcedure
  .input(updateChapterInputSchema)
  .mutation(async ({ input }) => {
    try {
      const duplicate = await chapterRepository.findOne({
        name: input.updates.name,
        _id: {
          $ne: resolveObjectId(input.id),
        },
      });

      if (duplicate) {
        throw AppError.badRequest('Chapter already exists');
      }

      const updated = await chapterRepository.findByIdAndUpdate(
        toObjectId(input.id),
        {
          name: input.updates.name,
          status: input.updates.status,
          bookId: toObjectId(input.updates.bookId),
          classId: toObjectId(input.updates.classId),
          description: input.updates.description,
          content: input.updates.content,
          order: input.updates.order,
        },
        {
          new: true,
        }
      );

      if (!updated) {
        throw AppError.notFound('Chapter not found');
      }

      return {
        success: true,
        message: 'Chapter updated successfully',
        data: {
          chapterId: String(updated._id),
          name: updated.name,
          description: updated.description,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });