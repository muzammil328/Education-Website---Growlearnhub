'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

const CLASS_SLUG = 'class-10';

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

export default function SubjectClass10Book({ bookSlug }: { bookSlug: string }) {
  const { data, isLoading, error } = useBookDetail(CLASS_SLUG, bookSlug);
  const bookName = removeDashAndUppercase(bookSlug);

  const canonical = `/class-10/books/${bookSlug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  if (isLoading) {
    return (
      <UserLayout title={`${bookName} Class 10 Book PDF`} image="/10th/class_10_book_growlearnhub.png" canonical={canonical} url={url}>
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
      <UserLayout title="Book Not Found" image="/10th/class_10_book_growlearnhub.png" canonical={canonical} url={url}>
        <p className="text-red-500">Book not found or failed to load. Please try again later.</p>
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
      title={`${displayName} Class 10 Book PDF | English & Urdu Medium`}
      image="/10th/class_10_book_growlearnhub.png"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none space-y-10">

        {/* Intro */}
        <section>
          <p className="text-muted-foreground">
            Download the complete <strong>{displayName} Class 10 textbook</strong> in English or Urdu
            medium, or browse individual chapters below. All PDFs are free and cover the Punjab Board
            (PCTB) and Federal Board syllabus for 10th class students.
          </p>
        </section>

        {/* Full Book Downloads */}
        {fullBookPdfs.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-2 text-2xl font-semibold text-primary mb-4">
              Download Full {displayName} Book
            </h2>
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

        {/* Chapters table */}
        {chapters.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-2 text-2xl font-semibold text-primary mb-4">
              Chapter-wise {displayName} PDFs
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Click a chapter to open its PDF download page with English and Urdu medium options.
            </p>
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
                          href={`/class-10/books/${bookSlug}/${ch.slug}`}
                          className="hover:text-primary hover:underline"
                        >
                          {ch.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/class-10/books/${bookSlug}/${ch.slug}`}
                          className="inline-flex items-center rounded-md border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {ch.name} — English
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/class-10/books/${bookSlug}/${ch.slug}`}
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
            <h2 className="text-xl font-semibold text-foreground mb-2">
              About the Class 10 {displayName} Textbook
            </h2>
            <p>
              The <strong>Class 10 {displayName}</strong> textbook follows the latest Punjab Curriculum
              and Textbook Board (PCTB) and Federal Board (FBISE) syllabus for 10th class students.
              It is the primary reference for students appearing in annual SSC-II board examinations
              across Punjab, Federal, and BISE regions. GrowLearnHub provides both the complete book
              and individual chapter PDFs for convenient offline study.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              English Medium vs Urdu Medium — Which Should You Download?
            </h3>
            <p>
              Both mediums cover the same syllabus content. Choose <strong>English medium</strong> if
              your school teaches in English or if you are preparing for FBISE. Choose{' '}
              <strong>Urdu medium</strong> if your school uses Urdu as the language of instruction.
              Chapter-wise PDFs are available in both mediums on each chapter page.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How to Prepare {displayName} for Class 10 Board Exams
            </h3>
            <p>
              Start each chapter by reading the summary and key definitions. Then attempt the exercise
              questions at the end of the chapter. Once you are comfortable with the theory, practise
              MCQs and past paper questions for that chapter. Consistent chapter-wise preparation is
              the most effective strategy for scoring well in 10th class {displayName.toLowerCase()} board exams.
            </p>
          </div>
        </section>

      </article>
    </UserLayout>
  );
}

