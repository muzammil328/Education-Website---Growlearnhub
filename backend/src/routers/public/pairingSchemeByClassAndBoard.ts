import { z } from 'zod';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import PairingSchemeModel from '@/models/pairingScheme.model';
import ClassModel from '@/models/class.model';
import BoardModel from '@/models/board.model';
import { AppError } from '@muzammil328/server';

export const pairingSchemeByClassAndBoard = publicProcedure
  .input(z.object({ classSlug: z.string().min(1), boardSlug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const { classSlug, boardSlug } = input;

      const classDoc = await ClassModel.findOne({ slug: classSlug, status: 'active' });
      if (!classDoc) throw AppError.notFound('Class not found');

      const boardDoc = await BoardModel.findOne({ slug: boardSlug, classId: classDoc._id, status: 'active' });
      if (!boardDoc) throw AppError.notFound('Board not found');

      const scheme = await PairingSchemeModel.findOne({
        classId: classDoc._id,
        boardId: boardDoc._id,
        status: 'active',
      }).sort({ year: -1 });

      return {
        success: true,
        message: scheme ? 'Pairing scheme fetched successfully' : 'No pairing scheme found',
        data: scheme
          ? {
              year: scheme.year,
              image: scheme.image,
              boardName: boardDoc.name,
            }
          : null,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
