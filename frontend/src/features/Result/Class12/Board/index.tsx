'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useResultByClassAndBoard } from '@/hooks/use-public';

const CLASS_SLUG = 'class-12';

export default function ResultBoardClass12({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = useResultByClassAndBoard(CLASS_SLUG, boardSlug);
  const result = data?.data;
  const boardName = result?.boardName ?? boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`Class 12 Result 2025 – ${boardName} | GrowLearnHub`}
      canonical={`/${CLASS_SLUG}/result/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/result/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <p className="text-sm text-foreground/60 mb-2">
            <Link href="/result" className="hover:underline text-primary">Result</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/result`} className="hover:underline text-primary">Class 12</Link>
            {' / '}
            <span>{boardName}</span>
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Class 12 Result 2025 – {boardName}
          </h2>
          <p className="text-foreground/80 mt-1">
            View and download the official Class 12 (HSC-II / Inter Part 2) annual result for 2025.
          </p>
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading result...
            </div>
          ) : error ? (
            <p className="text-red-500">Failed to load result. Please try again later.</p>
          ) : result ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href={result.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Download Result PDF ({result.year})
                </a>
              </div>
              <div className="w-full overflow-hidden rounded-lg border border-border">
                <iframe
                  src={result.fileUrl}
                  className="w-full"
                  style={{ height: '70vh', minHeight: 400 }}
                  title={`Class 12 Result ${result.year}`}
                />
              </div>
            </div>
          ) : (
            <p className="text-foreground/60">No result available for this board yet.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">How to Use This Result</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Open the PDF and search for your roll number.</li>
            <li>Download and save the result for your university admission records.</li>
            <li>Contact your board office for any discrepancy in marks.</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
