'use client';

import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const CLASS_SLUG = 'class-10';
const SERVICE_SLUG = 'notes';

export default function Class10NotesPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, SERVICE_SLUG);

  return (
    <UserLayout
      title="Class 10 Notes 2025 – All Subjects PDF | GrowLearnHub"
      image="/10th/class_10_notes_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/notes/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/notes/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 10 Notes – All Subjects
          </Heading2>
          <p className="text-base">
            Download comprehensive Class 10 notes for all subjects in PDF format.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Subjects Available</h3>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading subjects...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-4">Failed to load subjects. Please try again later.</p>
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
            <p className="text-foreground/60 mt-4">No subjects available at the moment.</p>
          )}
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">How to Use These Notes</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Read chapters in order:</strong> Follow the chapter-wise structure to build a
              solid foundation
            </li>
            <li>
              <strong>Review key concepts:</strong> Focus on highlighted important concepts and
              definitions
            </li>
            <li>
              <strong>Practice questions:</strong> Solve included practice questions to reinforce
              understanding
            </li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">Related Resources</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${CLASS_SLUG}/past-paper`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Past Papers
            </a>
            <a
              href={`/${CLASS_SLUG}/date-sheet`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Date Sheet
            </a>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
