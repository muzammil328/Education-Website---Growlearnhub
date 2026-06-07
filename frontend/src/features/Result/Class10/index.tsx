'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const CLASS_SLUG = 'class-10';
const SERVICE_SLUG = 'result';

export default function Class10ResultPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, SERVICE_SLUG);

  return (
    <UserLayout
      title="Class 10 Result 2025 - Check by Roll Number and Name | GrowLearnHub"
      image="/10th/class_10_result_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/result/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/result/`}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 10 Result 2025</h2>
          <p className="text-foreground/80">
            Check your Class 10 result for all Punjab boards. Select your board below
            and access official result guidance by roll number and name.
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
            <p className="text-foreground/60 mt-4">No results available at the moment.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Result Checking Methods</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Check by roll number for fastest lookup on result day.</li>
            <li>Check by name when roll number is unavailable.</li>
            <li>Save and print your provisional marksheet for admissions.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Pages</h3>
          <p className="text-foreground/80">
            Explore{' '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="text-primary hover:underline">
              date sheet
            </Link>{' '}
            and{' '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="text-primary hover:underline">
              pairing scheme
            </Link>{' '}
            pages for complete exam preparation.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
