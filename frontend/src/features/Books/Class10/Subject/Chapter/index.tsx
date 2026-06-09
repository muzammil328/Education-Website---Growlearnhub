'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useChapterDetail } from '@/hooks/use-public';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

const CLASS_SLUG = 'class-10';

interface PdfRow {
  medium: string;
  fileUrl: string;
  fileId: string;
  pages?: number;
  fileSize?: number;
}

interface SiblingChapter {
  name: string;
  slug: string;
  order?: number;
}

function formatBytes(bytes?: number) {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ChapterClass10Book({
  bookSlug,
  chapterSlug,
}: {
  bookSlug: string;
  chapterSlug: string;
}) {
  const { data, isLoading, error } = useChapterDetail(CLASS_SLUG, bookSlug, chapterSlug);
  const bookName    = removeDashAndUppercase(bookSlug);
  const chapterName = removeDashAndUppercase(chapterSlug);

  const canonical = `/class-10/books/${bookSlug}/${chapterSlug}/`;
  const url       = `https://growlearnhub.com${canonical}`;

  if (isLoading) {
    return (
      <UserLayout title={`${chapterName} — ${bookName} Class 10`} image="/10th/class_10_book_growlearnhub.png" canonical={canonical} url={url}>
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-6 w-1/2 rounded bg-muted" />
          <div className="h-32 rounded bg-muted" />
        </div>
      </UserLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <UserLayout title="Chapter Not Found" image="/10th/class_10_book_growlearnhub.png" canonical={canonical} url={url}>
        <p className="text-red-500">Chapter not found or failed to load.</p>
      </UserLayout>
    );
  }

  const { chapter, pdfs, fullBookPdfs, otherChapters } = data.data as {
    chapter: { name: string; slug: string; description?: string; order?: number };
    pdfs: PdfRow[];
    fullBookPdfs: PdfRow[];
    otherChapters: SiblingChapter[];
  };

  const displayChapter = chapter.name || chapterName;
  const chapterLabel   = chapter.order ? `Chapter ${chapter.order}` : displayChapter;

  return (
    <UserLayout
      title={`${chapterLabel}: ${displayChapter} — ${bookName} Class 10 PDF`}
      image="/10th/class_10_book_growlearnhub.png"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none space-y-10">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/class-10/books" className="hover:text-primary hover:underline">Class 10 Books</Link>
          <span>/</span>
          <Link href={`/class-10/books/${bookSlug}`} className="hover:text-primary hover:underline">{bookName}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{chapterLabel}: {displayChapter}</span>
        </nav>

        <section>
          <p className="text-muted-foreground">
            Download <strong>{chapterLabel}: {displayChapter}</strong> from the Class 10{' '}
            <strong>{bookName}</strong> textbook. Available free in both English and Urdu medium PDF
            for 10th class students.
          </p>
        </section>

        {pdfs.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-2 text-2xl font-semibold text-primary mb-4">
              Download {chapterLabel} PDF
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3">File</th>
                    <th className="px-4 py-3">Pages</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pdfs.map(pdf => (
                    <tr key={pdf.medium} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {chapterLabel}: {displayChapter} — {pdf.medium.charAt(0).toUpperCase() + pdf.medium.slice(1)} Medium
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{pdf.pages ?? '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatBytes(pdf.fileSize) ?? '—'}</td>
                      <td className="px-4 py-3">
                        <a
                          href={pdf.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {fullBookPdfs.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-2 text-xl font-semibold text-primary mb-4">
              Download Full {bookName} Book
            </h2>
            <div className="flex flex-wrap gap-3">
              {fullBookPdfs.map(pdf => (
                <a
                  key={pdf.medium}
                  href={pdf.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Full {bookName} Book — {pdf.medium.charAt(0).toUpperCase() + pdf.medium.slice(1)} Medium PDF
                </a>
              ))}
            </div>
          </section>
        )}

        {otherChapters.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-2 text-xl font-semibold text-primary mb-4">
              Other Chapters in {bookName}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {otherChapters.map((ch, idx) => (
                <Link
                  key={ch.slug}
                  href={`/class-10/books/${bookSlug}/${ch.slug}`}
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {ch.order ? `Chapter ${ch.order}: ` : `${idx + 2}. `}{ch.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-border pt-8 space-y-5 text-sm text-foreground/75 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              About {chapterLabel}: {displayChapter}
            </h2>
            <p>
              <strong>{chapterLabel}: {displayChapter}</strong> is part of the Class 10{' '}
              <strong>{bookName}</strong> curriculum prescribed by Punjab Board (PCTB) and Federal
              Board (FBISE). This chapter covers key concepts that appear regularly in SSC-II annual
              board exams. Studying it chapter by chapter — along with exercises and past paper
              questions — is the most effective strategy for scoring well in 10th class{' '}
              {bookName.toLowerCase()}.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How to Study This Chapter Effectively
            </h3>
            <p>
              Read the full chapter PDF once without stopping to get an overview. Then go back and
              highlight key definitions, formulas, and diagrams. Solve all in-text and
              end-of-chapter questions. Finally, practise past paper MCQs and short questions from
              this chapter to consolidate your understanding before the 10th class board exam.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              English Medium or Urdu Medium?
            </h3>
            <p>
              Both PDFs cover the same {bookName} content for this chapter. Choose English medium
              if your school teaches in English or if you are preparing for FBISE. Choose Urdu
              medium if your school uses Urdu as the language of instruction.
            </p>
          </div>
        </section>

      </article>
    </UserLayout>
  );
}
