import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { boardRepository } from '@/repository/board.repository';
import { getBoardBySlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const boardGetBySlug = publicProcedure
  .input(getBoardBySlugInputSchema)
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim();
      const boardSlug = input.boardSlug?.trim();

      if (!classSlug) {
        throw AppError.badRequest('Class slug is required');
      }

      const result = await boardRepository.aggregate({
        pipeline: boardRepository
          .pipeline()
          .match(buildMatch({ status: 'active' })) // optional safety filter

          // match class by slug via lookup
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['name', 'slug'],
            unwind: false,
          })

          // filter by class slug after join
          .match({
            'class.slug': classSlug,
            ...(boardSlug ? { 'slug': boardSlug } : {}),
          })

          .project({
            _id: 0,
            name: 1,
            slug: 1,
          })
          .build(),
      });

      return {
        success: true,
        message: 'Boards fetched successfully',
        data: result ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });