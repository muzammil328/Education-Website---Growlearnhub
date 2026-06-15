'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useBooksByClass } from '@/hooks/use-public';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';
import { Heading2, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-12';
const CLASS_DISPLAY = '12';

export default function Class12BookPage() {
  const { data, isLoading, error } = useBooksByClass(CLASS_SLUG);
  const books = data?.data ?? [];

  return (
    <UserLayout
      title={`Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 12th Class Textbooks`}
      image="/12th/class_12_book_growlearnhub.png"
      canonical="/class-12/books/"
      url="https://growlearnhub.com/class-12/books/"
    >
      <article className="max-w-none">
        <section className="mb-8">
          <Para>
            Get complete <strong>Class {CLASS_DISPLAY} books in PDF</strong> for all major subjects
            in one place. These 12th class textbooks cover the full PCTB and FBISE syllabus for
            inter-part 2 annual board exam preparation.
          </Para>
          <Para className="text-muted-foreground mt-4">
            Looking for other grades too? Visit{' '}
            <Link href="/class-9/books" className="font-medium text-primary hover:underline">
              Class 9 books
            </Link>{' '}
            and{' '}
            <Link href="/class-10/books" className="font-medium text-primary hover:underline">
              Class 10 books
            </Link>{' '}
            and{' '}
            <Link href="/class-11/books" className="font-medium text-primary hover:underline">
              Class 11 books
            </Link>{' '}
            for more subject-wise textbook collections.
          </Para>
        </section>

        <section className="mb-12">
          <Heading2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Available Subjects for Class {CLASS_DISPLAY} Books
          </Heading2>
          <Para className="text-muted-foreground mt-4">
            Browse the subjects below and open the book page you need. Each subject offers English
            and Urdu medium options with chapter-wise navigation.
          </Para>

          {isLoading ? (
            <div className="mt-6"><SmallCardSkeletonGrid /></div>
          ) : error ? (
            <Para className="text-red-500 mt-6">Failed to load books. Please try again later.</Para>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
              {books.map((book: { name: string; slug: string }) => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/books/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <Para className="text-muted-foreground mt-4">No books available at the moment.</Para>
          )}
        </section>

        <section className="mb-12">
          <Heading2 className="text-2xl font-semibold text-primary mb-4">
            How to Download Class {CLASS_DISPLAY} Books
          </Heading2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>Click any subject card above to open its book page.</li>
            <li>Download the full book in English or Urdu medium.</li>
            <li>Or browse chapter-wise and click a chapter to download that chapter PDF.</li>
          </ol>
        </section>

        <section className="mb-12">
          <Heading2 className="text-2xl font-semibold text-primary mb-4">
            Class 12 Subjects — Textbooks Available
          </Heading2>
          <Para className="text-muted-foreground">
            GrowLearnHub provides free PDF downloads for all major Class 12 subjects including{' '}
            <strong>Biology</strong>, <strong>Chemistry</strong>, <strong>Physics</strong>,{' '}
            <strong>Mathematics</strong>, <strong>English</strong>, <strong>Urdu</strong>,{' '}
            <strong>Islamiat</strong>, and <strong>Pakistan Studies</strong>. These are the official
            inter-part 2 textbooks prescribed by Punjab Board (PCTB) and Federal Board (FBISE).
            Each book is available in both English medium and Urdu medium.
          </Para>
        </section>

        <section className="mb-12">
          <Heading2 className="text-2xl font-semibold text-primary mb-4">
            Why Use These Class 12 Textbooks?
          </Heading2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>100% free — no account or payment required</li>
            <li>Covers the full PCTB and FBISE syllabus for 12th class (inter-part 2)</li>
            <li>Chapter-wise PDFs for focused revision before exams</li>
            <li>English and Urdu medium available for every subject</li>
            <li>Works on mobile, tablet, and desktop</li>
          </ul>
        </section>

        <section className="mb-6">
          <Heading2 className="text-2xl font-semibold text-primary mb-4">
            Tips for Exam Preparation Using Class 12 Textbooks
          </Heading2>
          <Para className="text-muted-foreground">
            Inter-part 2 board examiners set questions directly from the official PCTB and FBISE
            textbooks. Reading each chapter carefully, solving the end-of-chapter exercises, and
            practising past paper questions chapter by chapter is the most reliable exam strategy.
            Use the chapter-wise PDFs on GrowLearnHub to study one chapter at a time.
          </Para>
        </section>
      </article>
    </UserLayout>
  );
}
