'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-9';

interface PdfRow {
  medium: string;
  fileUrl: string;
  fileId: string;
  pages?: number;
  fileSize?: number;
}

interface ChapterRow {
  name: string;
  slug: string;
  order?: number;
  pdfs: PdfRow[];
}

export default function SubjectClass9Book({ bookSlug }: { bookSlug: string }) {
  const { data, isLoading, error } = useBookDetail(CLASS_SLUG, bookSlug);
  const bookName = removeDashAndUppercase(bookSlug);

  const canonical = `/class-9/books/${bookSlug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  if (isLoading) {
    return (
      <UserLayout title={`${bookName} Class 9 Book PDF`} image="/9th/class_9_book_growlearnhub.png" canonical={canonical} url={url}>
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-40 rounded bg-muted" />
        </div>
      </UserLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <UserLayout title="Book Not Found" image="/9th/class_9_book_growlearnhub.png" canonical={canonical} url={url}>
        <Para className="text-red-500">Book not found or failed to load. Please try again later.</Para>
      </UserLayout>
    );
  }

  const { book, fullBookPdfs, chapters } = data.data as {
    book: { name: string; slug: string; description?: string; pages?: number };
    fullBookPdfs: PdfRow[];
    chapters: ChapterRow[];
  };

  const displayName = book.name || bookName;

  return (
    <UserLayout
      title={`${displayName} Class 9 Book PDF | English & Urdu Medium`}
      image="/9th/class_9_book_growlearnhub.png"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none space-y-10">

        {/* Intro */}
        <section>
          <Para className="text-muted-foreground">
            Download the complete <strong>{displayName} Class 9 textbook</strong> in English or Urdu
            medium, or browse individual chapters below. All PDFs are free and cover the Punjab Board
            (PCTB) and Federal Board syllabus.
          </Para>

        </section>

        {/* Full Book Downloads */}
        {fullBookPdfs.length > 0 && (
          <section>
            <Heading2 className="border-b border-border pb-2 text-2xl font-semibold text-primary mb-4">
              Download Full {displayName} Book
            </Heading2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3">Medium</th>
                    <th className="px-4 py-3">Pages</th>
                    <th className="px-4 py-3">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {fullBookPdfs.map(pdf => (
                    <tr key={pdf.medium} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground capitalize">{pdf.medium} Medium</td>
                      <td className="px-4 py-3 text-muted-foreground">{pdf.pages ?? '—'}</td>
                      <td className="px-4 py-3">
                        <a
                          href={pdf.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Download {displayName} — {pdf.medium.charAt(0).toUpperCase() + pdf.medium.slice(1)} PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Chapters table — links only, download on chapter page */}
        {chapters.length > 0 && (
          <section>
            <Heading2 className="border-b border-border pb-2 text-2xl font-semibold text-primary mb-4">
              Chapter-wise {displayName} PDFs
            </Heading2>
            <Para className="text-sm text-muted-foreground mb-4">
              Click a chapter to open its PDF download page with English and Urdu medium options.
            </Para>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Chapter Name</th>
                    <th className="px-4 py-3">English PDF</th>
                    <th className="px-4 py-3">Urdu PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {chapters.map((ch, idx) => (
                    <tr key={ch.slug} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground text-xs">{ch.order ?? idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        <Link
                          href={`/class-9/books/${bookSlug}/${ch.slug}`}
                          className="hover:text-primary hover:underline"
                        >
                          {ch.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/class-9/books/${bookSlug}/${ch.slug}`}
                          className="inline-flex items-center rounded-md border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {ch.name} — English
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/class-9/books/${bookSlug}/${ch.slug}`}
                          className="inline-flex items-center rounded-md border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {ch.name} — Urdu
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="border-t border-border pt-8 space-y-6 text-sm text-foreground/75 leading-relaxed">
          <div>
            <Heading2 className="text-xl font-semibold text-foreground mb-2">
              About the Class 9 {displayName} Textbook
            </Heading2>
            <Para>
              The <strong>Class 9 {displayName}</strong> textbook follows the latest Punjab Curriculum
              and Textbook Board (PCTB) and Federal Board (FBISE) syllabus. It is the primary reference
              for 9th class students appearing in annual board examinations across Punjab, Federal, and
              BISE regions. GrowLearnHub provides both the complete book and individual chapter PDFs so
              students can study at their own pace, whether on mobile or desktop.
            </Para>
          </div>
          <div>
            <Heading3 className="text-lg font-semibold text-foreground mb-2">
              English Medium vs Urdu Medium — Which Should You Download?
            </Heading3>
            <Para>
              Both mediums cover the same syllabus content. Choose <strong>English medium</strong> if
              your school teaches in English or if you are preparing for FBISE. Choose{' '}
              <strong>Urdu medium</strong> if your school uses Urdu as the language of instruction.
              Chapter-wise PDFs are available in both mediums on each chapter page.
            </Para>
          </div>
          <div>
            <Heading3 className="text-lg font-semibold text-foreground mb-2">
              How to Prepare {displayName} for Class 9 Board Exams
            </Heading3>
            <Para>
              Start each chapter by reading the summary and key definitions. Then attempt the exercise
              questions at the end of the chapter. Once you are comfortable with the theory, practise
              MCQs and past paper questions for that chapter. Consistent chapter-wise preparation is the
              most effective strategy for scoring well in 9th class {displayName.toLowerCase()} board exams.
            </Para>
          </div>
        </section>

      </article>
    </UserLayout>
  );
}
