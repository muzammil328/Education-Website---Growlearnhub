import { z } from 'zod';
import { toTrpcError } from '@muzammil328/trpc';
import { publicProcedure } from '@/trpc/trpc';
import { bookRepository } from '@/repository/book.repository';
import { chapterRepository } from '@/repository/chapter.repository';
import { buildMatch } from '@muzammil328/db';

export const booksByClassWithChapters = publicProcedure
  .input(z.object({ classSlug: z.string().min(1) }))
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim().toLowerCase();

      const books = await bookRepository.aggregate({
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
          .project({ bookId: '$_id', name: 1, slug: 1, description: 1, image: 1 })
          .build(),
      }) as { bookId: string; name: string; slug: string; description?: string; image?: string }[];

      if (!books?.length) {
        return { success: true, message: 'No books found', data: [] };
      }

      const bookIds = books.map(b => b.bookId);

      const chapters = await chapterRepository.aggregate({
        pipeline: chapterRepository
          .pipeline()
          .match(buildMatch({ bookId: { $in: bookIds }, status: 'active' }))
          .project({ _id: 0, chapterId: '$_id', bookId: 1, name: 1, slug: 1, order: 1 })
          .build(),
      }) as { chapterId: string; bookId: string; name: string; slug: string; order?: number }[];

      const chaptersByBook = new Map<string, typeof chapters>();
      for (const ch of chapters ?? []) {
        const key = ch.bookId.toString();
        if (!chaptersByBook.has(key)) chaptersByBook.set(key, []);
        chaptersByBook.get(key)!.push(ch);
      }

      const data = books.map(book => ({
        name: book.name,
        slug: book.slug,
        description: book.description,
        image: book.image,
        chapters: (chaptersByBook.get(book.bookId.toString()) ?? [])
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map(ch => ({ name: ch.name, slug: ch.slug })),
      }));

      return { success: true, message: 'Books with chapters fetched', data };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
