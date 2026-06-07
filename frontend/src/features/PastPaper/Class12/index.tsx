'use client';

import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const CLASS_SLUG = 'class-12';
const SERVICE_SLUG = 'past-paper';

export default function Class12PastPaperPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, SERVICE_SLUG);

  return (
    <UserLayout
      title="Class 12 Past Papers 2025 – All Boards | GrowLearnHub"
      image="/12th/class_12_past_paper_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/past-paper/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/past-paper/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 12 Past Papers – 2025
          </Heading2>
          <p className="text-base">
            Download solved and unsolved Class 12 past papers for all boards. Choose your board
            below to get past papers instantly at GrowLearnHub.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Subjects</h3>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-4">Failed to load. Please try again later.</p>
          ) : books && books.length > 0 ? (
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map(book => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/${SERVICE_SLUG}/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No past papers available at the moment.</p>
          )}
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">How to Use Past Papers</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Understand patterns:</strong> Review past papers to learn recurring question
              types and exam structure
            </li>
            <li>
              <strong>Practice timing:</strong> Solve papers under timed conditions to improve speed
              and accuracy
            </li>
            <li>
              <strong>Identify weak areas:</strong> Use results to focus study efforts on
              challenging topics
            </li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">Related Resources</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${CLASS_SLUG}/date-sheet`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Date Sheet
            </a>
            <a
              href={`/${CLASS_SLUG}/pairing-scheme`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Pairing Scheme
            </a>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
