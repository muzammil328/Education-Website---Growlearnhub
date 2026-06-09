'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useBooksByClass } from '@/hooks/use-public';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

const CLASS_SLUG = 'class-9';
const CLASS_DISPLAY = '9';

export default function Class9BookPage() {
  const { data, isLoading, error } = useBooksByClass(CLASS_SLUG);
  const books = data?.data ?? [];

  return (
    <UserLayout
      title={`Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 9th Class Textbooks`}
      image="/9th/class_9_book_growlearnhub.png"
      canonical="/class-9/books/"
      url="https://growlearnhub.com/class-9/books/"
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p>
            Get complete <strong>Class {CLASS_DISPLAY} books in PDF</strong> for all major subjects
            in one place. This page helps students quickly access textbook resources for daily
            study, assignments, and annual exam preparation.
          </p>
          <p className="text-muted-foreground mt-4">
            Looking for other grades too? Visit{' '}
            <Link href="/class-10/books" className="font-medium text-primary hover:underline">
              Class 10 books
            </Link>{' '}
            and{' '}
            <Link href="/class-11/books" className="font-medium text-primary hover:underline">
              Class 11 books
            </Link>{' '}
            for more subject-wise textbook collections.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Available Subjects for Class {CLASS_DISPLAY} Books
          </h2>
          <p className="text-muted-foreground mt-4">
            Browse the subjects below and open the book page you need. Each subject offers English
            and Urdu medium options with chapter-wise navigation.
          </p>

          {isLoading ? (
            <div className="mt-6"><SmallCardSkeletonGrid /></div>
          ) : error ? (
            <p className="text-red-500 mt-6">Failed to load books. Please try again later.</p>
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
            <p className="text-muted-foreground mt-4">No books available at the moment.</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            How to Download Class {CLASS_DISPLAY} Books
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>Click any subject card above to open its book page.</li>
            <li>Download the full book in English or Urdu medium.</li>
            <li>Or browse chapter-wise and click a chapter to download that chapter PDF.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Class 9 Subjects — Textbooks Available
          </h2>
          <p className="text-muted-foreground">
            GrowLearnHub provides free PDF downloads for all major Class 9 subjects including{' '}
            <strong>Biology</strong>, <strong>Chemistry</strong>, <strong>Physics</strong>,{' '}
            <strong>Mathematics</strong>, <strong>English</strong>, <strong>Urdu</strong>,{' '}
            <strong>Islamiat</strong>, and <strong>Pakistan Studies</strong>. These are the same
            textbooks prescribed by Punjab Board (PCTB) and Federal Board (FBISE) for 9th class
            students. Each book is available in both English medium and Urdu medium.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Why Use These Class 9 Textbooks?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>100% free — no account or payment required</li>
            <li>Covers the full PCTB and FBISE syllabus for 9th class</li>
            <li>Chapter-wise PDFs for focused revision before exams</li>
            <li>English and Urdu medium available for every subject</li>
            <li>Works on mobile, tablet, and desktop</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Tips for Exam Preparation Using Class 9 Textbooks
          </h2>
          <p className="text-muted-foreground">
            Board examiners set questions directly from the official PCTB and FBISE textbooks.
            Reading each chapter carefully, solving the end-of-chapter exercises, and practising
            past paper questions chapter by chapter is the most reliable exam strategy. Use the
            chapter-wise PDFs on GrowLearnHub to study one chapter at a time rather than trying
            to revise the entire book all at once.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
