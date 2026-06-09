'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBoardsByClassAndService } from '@/hooks/use-public';

const CLASS_SLUG = 'class-11';
const SERVICE_SLUG = 'pairing-scheme';

export default function Class11PairingSchemePage() {
  const { data, isLoading, error } = useBoardsByClassAndService(CLASS_SLUG, SERVICE_SLUG);
  const boards = data?.data ?? [];

  return (
    <UserLayout
      title="11th Class Pairing Scheme 2025 – All Boards | GrowLearnHub"
      canonical={`/${CLASS_SLUG}/pairing-scheme/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/pairing-scheme/`}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">11th Class Pairing Scheme 2025</h2>
          <p className="text-foreground/80">
            Select your board to view the official pairing scheme for Class 11 (HSC-I / Inter Part 1) 2025.
            Understand subject-wise chapter groupings and marks distribution for your inter board exam.
          </p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Select Your Board</h3>
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading boards...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-4">Failed to load. Please try again later.</p>
          ) : boards.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {boards.map((board: { name: string; slug: string }) => (
                <CardSmall
                  key={board.slug}
                  title={board.name}
                  link={`/${CLASS_SLUG}/${SERVICE_SLUG}/${board.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No boards available at the moment.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Why Use a Pairing Scheme?</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Know exactly which Inter Part 1 chapters appear in each question.</li>
            <li>Prioritize high-weightage chapters in your last-week revision.</li>
            <li>Maximize marks by aligning your preparation with the board's paper pattern.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Pages</h3>
          <p className="text-foreground/80">
            Also explore{' '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="text-primary hover:underline">date sheet</Link>
            {' '}and{' '}
            <Link href={`/${CLASS_SLUG}/result`} className="text-primary hover:underline">result</Link>
            {' '}pages for complete exam preparation.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
