import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { z } from 'zod';
import { publicProcedure } from '@/trpc/trpc';
import { bookRepository } from '@/repository/book.repository';
import { chapterRepository } from '@/repository/chapter.repository';
import { bookPdfRepository } from '@/repository/bookPdf.repository';
import { chapterPdfRepository } from '@/repository/chapterPdf.repository';
import { buildMatch } from '@muzammil328/db';

const pdfProject = { _id: 0, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 } as const;

export const bookDetailByClassAndBookSlug = publicProcedure
  .input(
    z.object({
      classSlug: z.string().min(1),
      bookSlug:  z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    try {
      const classSlug = input.classSlug.trim().toLowerCase();
      const bookSlug  = input.bookSlug.trim().toLowerCase();

      // 1. Resolve book + verify class ownership
      const [bookDoc] = await bookRepository.aggregate({
        pipeline: bookRepository
          .pipeline()
          .match(buildMatch({ slug: bookSlug, status: 'active' }))
          .lookupOne({
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
            pick: ['slug', 'status'],
            unwind: false,
          })
          .match({ 'class.slug': classSlug, 'class.status': 'active' })
          .project({ bookId: '$_id', name: 1, slug: 1, description: 1, image: 1, pages: 1 })
          .build(),
      });

      if (!bookDoc) throw AppError.notFound('Book not found');

      const bookId = (bookDoc as { bookId: unknown }).bookId;

      // 2. Fetch full-book PDFs, chapters, and all chapter PDFs in parallel
      const [fullBookPdfs, chapters, allChapterPdfs] = await Promise.all([
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
            .match(buildMatch({ bookId, status: 'active' }))
            .project({ _id: 1, name: 1, slug: 1, order: 1 })
            .build(),
        }),
        chapterPdfRepository.aggregate({
          pipeline: chapterPdfRepository
            .pipeline()
            .match(buildMatch({ bookId, status: 'active' }))
            .project({ _id: 0, chapterId: 1, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 })
            .build(),
        }),
      ]);

      // Group chapter PDFs by chapterId
      type ChapterPdfRow = { chapterId: { toString(): string }; medium: string; fileUrl: string; fileId: string; pages?: number; fileSize?: number };
      const pdfMap = new Map<string, Omit<ChapterPdfRow, 'chapterId'>[]>();
      for (const pdf of (allChapterPdfs ?? []) as ChapterPdfRow[]) {
        const key = pdf.chapterId.toString();
        if (!pdfMap.has(key)) pdfMap.set(key, []);
        const { chapterId: _c, ...rest } = pdf;
        pdfMap.get(key)!.push(rest);
      }

      type ChapterRow = { _id: { toString(): string }; name: string; slug: string; order?: number };
      const chaptersWithPdfs = ((chapters ?? []) as ChapterRow[]).map(ch => ({
        name:  ch.name,
        slug:  ch.slug,
        order: ch.order,
        pdfs:  pdfMap.get(ch._id.toString()) ?? [],
      }));

      const b = bookDoc as { name: string; slug: string; description?: string; image?: string; pages?: number };

      return {
        success: true,
        message: 'Book detail fetched successfully',
        data: {
          book:         { name: b.name, slug: b.slug, description: b.description, image: b.image, pages: b.pages },
          fullBookPdfs: fullBookPdfs ?? [],
          chapters:     chaptersWithPdfs,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  });
