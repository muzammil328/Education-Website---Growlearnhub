'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useDateSheetByClassAndBoard } from '@/hooks/use-public';

const CLASS_SLUG = 'class-11';

export default function DateSheetClass11Board({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = useDateSheetByClassAndBoard(CLASS_SLUG, boardSlug);
  const sheet = data?.data;
  const boardName = sheet?.boardName ?? boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`Class 11 Date Sheet 2025 – ${boardName} | GrowLearnHub`}
      canonical={`/${CLASS_SLUG}/date-sheet/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/date-sheet/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/date-sheet" className="hover:underline text-primary">Date Sheet</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="hover:underline text-primary">Class 11</Link>
            {' / '}
            <span>{boardName}</span>
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Class 11 Date Sheet 2025 – {boardName}
          </h2>
          <p className="text-muted-foreground mt-1">
            Official exam schedule for Class 11 (HSC-I / Inter Part 1) annual exams {sheet?.year ?? 2025}.
          </p>
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading date sheet...
            </div>
          ) : error ? (
            <p className="text-red-500">Failed to load. Please try again later.</p>
          ) : sheet?.image ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href={sheet.image}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Download Date Sheet ({sheet.year})
                </a>
              </div>
              <div className="w-full overflow-hidden rounded-lg border border-border bg-muted/30 p-2">
                <Image
                  src={sheet.image}
                  alt={`Class 11 ${boardName} Date Sheet ${sheet.year}`}
                  width={800}
                  height={1100}
                  className="w-full h-auto rounded"
                  priority
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No date sheet available for this board yet.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">How to Use the Date Sheet</h3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Note the exam date and day for each Inter Part 1 subject.</li>
            <li>Plan revision sessions backwards from each exam date.</li>
            <li>Keep the date sheet saved on your phone for quick reference.</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
