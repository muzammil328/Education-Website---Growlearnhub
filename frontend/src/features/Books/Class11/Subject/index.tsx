'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

const CLASS_SLUG = 'class-11';

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

export default function SubjectClass11Book({ bookSlug }: { bookSlug: string }) {
  const { data, isLoading, error } = useBookDetail(CLASS_SLUG, bookSlug);
  const bookName = removeDashAndUppercase(bookSlug);

  const canonical = `/class-11/books/${bookSlug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  if (isLoading) {
    return (
      <UserLayout title={`${bookName} Class 11 Book PDF`} image="/11th/class_11_book_growlearnhub.png" canonical={canonical} url={url}>
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
      <UserLayout title="Book Not Found" image="/11th/class_11_book_growlearnhub.png" canonical={canonical} url={url}>
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
      title={`${displayName} Class 11 Book PDF | English & Urdu Medium`}
      image="/11th/class_11_book_growlearnhub.png"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none space-y-10">

        <section>
          <p className="text-foreground/80">
            Download the complete <strong>{displayName} Class 11 textbook</strong> in English or Urdu
            medium, or browse individual chapters below. All PDFs are free and cover the Punjab Board
            (PCTB) and Federal Board (FBISE) syllabus for inter-part 1 students.
          </p>
        </section>

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
                        <Link href={`/class-11/books/${bookSlug}/${ch.slug}`} className="hover:text-primary hover:underline">
                          {ch.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/class-11/books/${bookSlug}/${ch.slug}`} className="inline-flex items-center rounded-md border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                          {ch.name} — English
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/class-11/books/${bookSlug}/${ch.slug}`} className="inline-flex items-center rounded-md border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
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

        <section className="border-t border-border pt-8 space-y-6 text-sm text-foreground/75 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              About the Class 11 {displayName} Textbook
            </h2>
            <p>
              The <strong>Class 11 {displayName}</strong> textbook follows the PCTB and FBISE
              syllabus for inter-part 1 students. It is the primary reference for students appearing
              in annual HSC-I board examinations across Punjab, Federal, and BISE regions.
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
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How to Prepare {displayName} for Class 11 Board Exams
            </h3>
            <p>
              Study each chapter systematically — read summaries, attempt exercises, then practise
              MCQs and past paper questions. Consistent chapter-wise preparation is the most effective
              strategy for scoring well in 11th class {displayName.toLowerCase()} inter-part 1 board exams.
            </p>
          </div>
        </section>

      </article>
    </UserLayout>
  );
}

