import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { z } from 'zod';
import { publicProcedure } from '@/trpc/trpc';
import { bookRepository } from '@/repository/book.repository';
import { buildMatch } from '@muzammil328/db';

export const booksByClassSlug = publicProcedure
  .input(z.object({ classSlug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim().toLowerCase();

      if (!classSlug) throw AppError.badRequest('Class slug is required');

      const data = await bookRepository.aggregate({
        pipeline: bookRepository
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
          .project({ _id: 0, name: 1, slug: 1, image: 1, description: 1 })
          .build(),
      });

      return {
        success: true,
        message: 'Books fetched successfully',
        data: data ?? [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
