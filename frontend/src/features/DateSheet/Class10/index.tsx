'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBoardsByClassAndService } from '@/hooks/use-public';

const CLASS_SLUG = 'class-10';
const SERVICE_SLUG = 'date-sheet';

export default function Class10DateSheetPage() {
  const { data, isLoading, error } = useBoardsByClassAndService(CLASS_SLUG, SERVICE_SLUG);
  const boards = data?.data ?? [];

  return (
    <UserLayout
      title="Class 10 Date Sheet 2025 – All Boards | GrowLearnHub"
      image="/10th/class_10_date_sheet_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/date-sheet/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/date-sheet/`}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 10 Date Sheet 2025</h2>
          <p className="text-foreground/80">
            Select your board to view the official Class 10 (SSC-II / Matric) date sheet for 2025.
            Organise your revision plan around the confirmed exam schedule.
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
          <h3 className="text-xl font-semibold text-foreground">How to Use the Date Sheet</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Prioritize difficult matric subjects scheduled earlier in the exam window.</li>
            <li>Build daily revision slots around the official exam sequence.</li>
            <li>Keep buffer days for past paper practice and quick revision.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Pages</h3>
          <p className="text-foreground/80">
            Also explore{' '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="text-primary hover:underline">pairing scheme</Link>
            {' '}and{' '}
            <Link href={`/${CLASS_SLUG}/result`} className="text-primary hover:underline">result</Link>
            {' '}pages for complete exam preparation.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
