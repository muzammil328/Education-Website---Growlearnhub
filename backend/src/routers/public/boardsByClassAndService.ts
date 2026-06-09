import { z } from 'zod';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';
import { boardRepository } from '@/repository/board.repository';

export const boardsByClassAndService = publicProcedure
  .input(z.object({ classSlug: z.string().min(1), serviceSlug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const { classSlug, serviceSlug } = input;

      const result = await boardRepository.aggregate({
        pipeline: boardRepository
          .pipeline()
          .match(buildMatch({ status: 'active' }))
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['slug', 'status'],
            unwind: false,
          })
          .match({ 'class.slug': classSlug, 'class.status': 'active' })
          .lookupOne({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
            pick: ['slug', 'status'],
            unwind: false,
          })
          .match({ 'service.slug': serviceSlug, 'service.status': 'active' })
          .project({ _id: 0, name: 1, slug: 1, description: 1 })
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
