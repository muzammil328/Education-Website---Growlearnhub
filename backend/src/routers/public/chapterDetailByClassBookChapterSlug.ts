import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { z } from 'zod';
import { publicProcedure } from '@/trpc/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import { bookPdfRepository } from '@/repository/bookPdf.repository';
import { chapterPdfRepository } from '@/repository/chapterPdf.repository';
import { buildMatch } from '@muzammil328/db';

const pdfProject = { _id: 0, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 } as const;

export const chapterDetailByClassBookChapterSlug = publicProcedure
  .input(
    z.object({
      classSlug:   z.string().min(1),
      bookSlug:    z.string().min(1),
      chapterSlug: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    try {
      const classSlug   = input.classSlug.trim().toLowerCase();
      const bookSlug    = input.bookSlug.trim().toLowerCase();
      const chapterSlug = input.chapterSlug.trim().toLowerCase();

      // 1. Resolve chapter → verify book slug + class slug
      const [chapterDoc] = await chapterRepository.aggregate({
        pipeline: chapterRepository
          .pipeline()
          .match(buildMatch({ slug: chapterSlug, status: 'active' }))
          .lookupOne({
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
            pick: ['slug', 'status'],
            unwind: false,
          })
          .match({ 'book.slug': bookSlug, 'book.status': 'active' })
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['slug', 'status'],
            unwind: false,
          })
          .match({ 'class.slug': classSlug, 'class.status': 'active' })
          .project({ chapterId: '$_id', bookId: 1, name: 1, slug: 1, description: 1, order: 1 })
          .build(),
      });

      if (!chapterDoc) throw AppError.notFound('Chapter not found');

      const { chapterId, bookId } = chapterDoc as { chapterId: unknown; bookId: unknown };

      // 2. Fetch chapter PDFs, full-book PDFs, and sibling chapters in parallel
      const [chapterPdfs, fullBookPdfs, otherChapters] = await Promise.all([
        chapterPdfRepository.aggregate({
          pipeline: chapterPdfRepository
            .pipeline()
            .match(buildMatch({ chapterId, status: 'active' }))
            .project(pdfProject)
            .build(),
        }),
        bookPdfRepository.aggregate({
          pipeline: bookPdfRepository
            .pipeline()
            .match(buildMatch({ bookId, status: 'active' }))
            .project(pdfProject)
            .build(),
        }),
        chapterRepository.aggregate({
          pipeline: chapterRepository
            .pipeline()
            .match({ ...buildMatch({ bookId, status: 'active' }), _id: { $ne: chapterId } })
            .project({ _id: 0, name: 1, slug: 1, order: 1 })
            .build(),
        }),
      ]);

      const c = chapterDoc as { name: string; slug: string; description?: string; order?: number };

      return {
        success: true,
        message: 'Chapter detail fetched successfully',
        data: {
          chapter:       { name: c.name, slug: c.slug, description: c.description, order: c.order },
          pdfs:          chapterPdfs ?? [],
          fullBookPdfs:  fullBookPdfs ?? [],
          otherChapters: otherChapters ?? [],
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
