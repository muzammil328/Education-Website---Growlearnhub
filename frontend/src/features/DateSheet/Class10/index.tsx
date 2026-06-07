'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const CLASS_SLUG = 'class-10';
const SERVICE_SLUG = 'date-sheet';

export default function Class10DateSheetPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, SERVICE_SLUG);

  return (
    <UserLayout
      title="Class 10 Date Sheet 2025"
      image="/10th/class_10_date_sheet_growlearnhub.png"
      canonical="/class-10/date-sheet/"
      url="https://growlearnhub.com/class-10/date-sheet/"
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">
            Class 10 Date Sheet 2025
          </h2>
          <p className="text-foreground/80">
            View the official date sheet for Class 10 — organised board‑wise,
            with key dates for every subject.
          </p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Subjects</h3>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-4">Failed to load. Please try again later.</p>
          ) : books && books.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map(book => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/${SERVICE_SLUG}/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No date sheets available at the moment.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">
            How to Use Date Sheet Effectively
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Prioritize difficult subjects scheduled earlier in the exam window.</li>
            <li>Build daily revision slots around the official exam sequence.</li>
            <li>Keep buffer days for past paper practice and quick revision.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Resources</h3>
          <p className="text-foreground/80">
            Continue with{' '}
            <Link href={`/${CLASS_SLUG}/result`} className="text-primary hover:underline">
              result updates
            </Link>{' '}
            and{' '}
            <Link href={`/${CLASS_SLUG}/online-test`} className="text-primary hover:underline">
              online tests
            </Link>{' '}
            to strengthen exam readiness.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
