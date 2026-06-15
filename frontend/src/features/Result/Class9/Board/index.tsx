'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useResultByClassAndBoard } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-9';

export default function ResultBoardClass9({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = useResultByClassAndBoard(CLASS_SLUG, boardSlug);
  const result = data?.data;

  return (
    <UserLayout
      title={`Class 9 Result 2025 - ${boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | GrowLearnHub`}
      canonical={`/${CLASS_SLUG}/result/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/result/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <Para className="text-sm text-muted-foreground mb-2">
            <Link href="/result" className="hover:underline text-primary">Result</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/result`} className="hover:underline text-primary">Class 9</Link>
            {' / '}
            <span>{boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
          </Para>
          <Heading2 className="text-2xl font-semibold text-primary">
            Class 9 Result 2025 – {result?.boardName ?? boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </Heading2>
          <Para className="text-muted-foreground mt-1">
            View and download the official Class 9 annual result for 2025.
          </Para>
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading result...
            </div>
          ) : error ? (
            <Para className="text-red-500">Failed to load result. Please try again later.</Para>
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
                  title={`Class 9 Result ${result.year}`}
                />
              </div>
            </div>
          ) : (
            <Para className="text-muted-foreground">No result available for this board yet.</Para>
          )}
        </section>

        <section className="mt-8">
          <Heading3 className="text-xl font-semibold text-foreground">How to Use This Result</Heading3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Open the PDF and search for your roll number.</li>
            <li>Download and save the result for your admission records.</li>
            <li>Contact your board office for any discrepancy in marks.</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
