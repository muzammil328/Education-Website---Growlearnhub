'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const CLASS_SLUG = 'class-10';
const CLASS_DISPLAY = '10';

export default function Class10BookPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, 'books');

  return (
    <UserLayout
      title={`Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 10th Class Textbooks`}
      image="/10th/class_10_book_growlearnhub.png"
      canonical="/class-10/books/"
      url="https://growlearnhub.com/class-10/books/"
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Get complete <strong>Class {CLASS_DISPLAY} books in PDF</strong> for all major subjects
            in one place. This page helps students quickly access textbook resources for daily
            study, assignments, and annual exam preparation.
          </p>
          <p className="text-foreground/80 mt-4">
            Looking for other grades too? Visit{' '}
            <Link href="/class-9/books" className="font-medium text-primary hover:underline">
              Class 9 books
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
          <p className="text-foreground/80 mt-4">
            Browse the subjects below and open the book page you need. Each subject offers English
            and Urdu medium options with chapter-wise navigation.
          </p>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-6">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading books...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-6">Failed to load books. Please try again later.</p>
          ) : books && books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
              {books.map((book) => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/books/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No books available at the moment.</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary">
            How to Use These Class {CLASS_DISPLAY} Books
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-foreground/80 mt-4">
            <li>Select your subject from the cards above.</li>
            <li>Choose your preferred medium (English or Urdu).</li>
            <li>Open the book page and choose the chapter you want to study.</li>
            <li>Read online or download the PDF for offline revision.</li>
            <li>Use these books regularly for tests, homework, and final exam practice.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary">Why Students Use GrowLearnHub</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-4">
            <li>Subject-wise organization for faster navigation</li>
            <li>Free access to Class {CLASS_DISPLAY} textbook resources</li>
            <li>Useful for school study and board exam preparation</li>
            <li>Simple structure for mobile and desktop users</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
