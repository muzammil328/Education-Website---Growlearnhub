'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMcqsBySlug } from '@/hooks/use-public';

interface Props {
  classSlug: string;
  bookSlug?: string;
  chapterSlug?: string;
  headingSlug?: string;
  subHeadingSlug?: string;
}

export default function McqsInlineSection({
  classSlug,
  bookSlug,
  chapterSlug,
  headingSlug,
  subHeadingSlug,
}: Props) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useMcqsBySlug(
    classSlug,
    bookSlug,
    chapterSlug,
    headingSlug,
    subHeadingSlug,
    page,
    limit
  );

  const mcqs = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const totalRecords = pagination?.totalRecords ?? 0;

  const liveUrl = (() => {
    const params = new URLSearchParams({ class: classSlug });
    if (bookSlug) params.set('book', bookSlug);
    if (chapterSlug) params.set('chapter', chapterSlug);
    if (headingSlug) params.set('heading', headingSlug);
    if (subHeadingSlug) params.set('subHeading', subHeadingSlug);
    return `/live/mcqs?${params.toString()}`;
  })();

  return (
    <section className="border-t border-border pt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">
          MCQs {totalRecords > 0 ? `(${totalRecords})` : ''}
        </h2>
        {totalRecords > 0 && (
          <Link
            href={liveUrl}
            className="text-sm font-medium text-primary hover:underline"
          >
            Practice All →
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-red-500">Failed to load MCQs.</p>
      ) : mcqs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No MCQs available yet.</p>
      ) : (
        <>
          <ol className="space-y-3 list-none">
            {mcqs.map((mcq: any, idx: number) => (
              <li key={mcq.mcqId} className="rounded-lg border border-border bg-card p-4 text-sm">
                <p className="font-medium text-foreground mb-2">
                  {(page - 1) * limit + idx + 1}. {mcq.question}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {(mcq.options as string[]).map((opt: string, oi: number) => (
                    <li
                      key={oi}
                      className={`px-3 py-1.5 rounded text-xs ${
                        oi === mcq.correctOption
                          ? 'bg-green-100 text-green-800 font-medium dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </li>
                  ))}
                </ul>
                {mcq.explanation && (
                  <p className="mt-2 text-xs text-muted-foreground italic">{mcq.explanation}</p>
                )}
              </li>
            ))}
          </ol>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-muted transition-colors"
              >
                ← Previous
              </button>
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-muted transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
