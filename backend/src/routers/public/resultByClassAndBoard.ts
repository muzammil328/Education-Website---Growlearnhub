import { z } from 'zod';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import ResultModel from '@/models/result.model';
import ClassModel from '@/models/class.model';
import BoardModel from '@/models/board.model';
import { AppError } from '@muzammil328/server';

export const resultByClassAndBoard = publicProcedure
  .input(z.object({ classSlug: z.string().min(1), boardSlug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const { classSlug, boardSlug } = input;

      const classDoc = await ClassModel.findOne({ slug: classSlug, status: 'active' });
      if (!classDoc) throw AppError.notFound('Class not found');

      const boardDoc = await BoardModel.findOne({ slug: boardSlug, classId: classDoc._id, status: 'active' });
      if (!boardDoc) throw AppError.notFound('Board not found');

      const result = await ResultModel.findOne({
        classId: classDoc._id,
        boardId: boardDoc._id,
        status: 'active',
      }).sort({ year: -1 });

      return {
        success: true,
        message: result ? 'Result fetched successfully' : 'No result found',
        data: result
          ? {
              year: result.year,
              fileId: result.fileId,
              fileUrl: result.fileUrl,
              boardName: boardDoc.name,
            }
          : null,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
