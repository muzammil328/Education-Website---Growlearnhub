'use client';

import React from 'react';
import Link from 'next/link';
import { useMcqsSetsBySlug } from '@/hooks/use-public';
import { Heading2, Para } from '@muzammil328/ui';

interface Props {
  classSlug: string;
  bookSlug?: string;
  chapterSlug?: string;
  headingSlug?: string;
  subHeadingSlug?: string;
}

export default function SetsInlineSection({
  classSlug,
  bookSlug,
  chapterSlug,
  headingSlug,
  subHeadingSlug,
}: Props) {
  const { data, isLoading, error } = useMcqsSetsBySlug(
    classSlug,
    bookSlug,
    chapterSlug,
    headingSlug,
    subHeadingSlug
  );

  const sets = data?.data?.sets ?? [];
  const totalMcqs = data?.data?.totalMcqs ?? 0;

  const buildSetUrl = (setNumber: number) => {
    const params = new URLSearchParams({ class: classSlug, set: String(setNumber) });
    if (bookSlug) params.set('book', bookSlug);
    if (chapterSlug) params.set('chapter', chapterSlug);
    if (headingSlug) params.set('heading', headingSlug);
    if (subHeadingSlug) params.set('subHeading', subHeadingSlug);
    return `/live/online-test?${params.toString()}`;
  };

  return (
    <section className="border-t border-border pt-8 space-y-4">
      <div className="flex items-center justify-between">
        <Heading2 className="text-xl font-semibold text-primary">
          Online Test Sets {totalMcqs > 0 ? `(${totalMcqs} MCQs)` : ''}
        </Heading2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <Para className="text-sm text-red-500">Failed to load sets.</Para>
      ) : sets.length === 0 ? (
        <Para className="text-sm text-muted-foreground">No test sets available yet.</Para>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {sets.map((set: { setNumber: number; count: number }) => (
            <Link
              key={set.setNumber}
              href={buildSetUrl(set.setNumber)}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-4 text-center hover:border-primary hover:text-primary transition-colors"
            >
              <span className="text-lg font-bold">Set {set.setNumber}</span>
              <span className="text-xs text-muted-foreground mt-1">{set.count} MCQs</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
