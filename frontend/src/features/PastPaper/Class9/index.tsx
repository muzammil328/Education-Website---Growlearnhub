'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBoardsByClassAndService } from '@/hooks/use-public';

const CLASS_SLUG = 'class-9';
const SERVICE_SLUG = 'past-paper';

export default function Class9PastPaperPage() {
  const { data, isLoading, error } = useBoardsByClassAndService(CLASS_SLUG, SERVICE_SLUG);
  const boards = data?.data ?? [];

  return (
    <UserLayout
      title="Class 9 Past Papers 2025 – All Boards | GrowLearnHub"
      image="/9th/class_9_past_paper_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/past-paper/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/past-paper/`}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 9 Past Papers 2025</h2>
          <p className="text-muted-foreground">
            Select your board to browse subject-wise past paper MCQs for Class 9.
            Practice exam-repeated questions and boost your preparation.
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
            <p className="text-muted-foreground mt-4">No boards available at the moment.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">How to Use Past Papers</h3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Practice MCQs that repeatedly appear in board exams.</li>
            <li>Report questions you have seen in past papers to help others.</li>
            <li>Use with pairing scheme for targeted chapter revision.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Pages</h3>
          <p className="text-muted-foreground">
            Also explore{' '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="text-primary hover:underline">pairing scheme</Link>
            {' '}and{' '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="text-primary hover:underline">date sheet</Link>.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
