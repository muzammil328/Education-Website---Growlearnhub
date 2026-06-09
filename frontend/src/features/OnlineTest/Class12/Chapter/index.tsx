'use client';
import React from 'react';
import { OnlineTestPageSkeleton } from '@/components/QuizSkeleton';
import { useHeadingByClassAndSubjectAndChapterSlug } from '@/hooks/use-public';
import SetsInlineSection from '@/components/mcqs/SetsInlineSection';
import { toDisplayName } from '@/lib/class-filter';

export default function OnlineTestClass12ChapterPage({
  className,
  bookSlug,
  chapterSlug,
}: {
  className: string;
  bookSlug: string;
  chapterSlug: string;
}) {
  const { data, isLoading, error } = useHeadingByClassAndSubjectAndChapterSlug(className, bookSlug, chapterSlug);
  const headings = data?.data ?? [];

  if (isLoading) return <OnlineTestPageSkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Failed to load headings</p>
        <p className="mt-1 text-sm text-red-600">Please try again in a moment.</p>
      </div>
    );
  }

  if (!headings.length) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="font-medium text-amber-700">No headings found</p>
        <p className="mt-1 text-sm text-amber-600">
          There are no headings available for this chapter.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        {toDisplayName(bookSlug)} — {toDisplayName(chapterSlug)}
      </h1>
      <p className="text-muted-foreground mb-6">Select a topic to start your online test.</p>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {headings.map(heading => (
          <a
            key={heading.slug}
            href={`/${className}/online-test/${bookSlug}/${chapterSlug}/${heading.slug}`}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
          >
            <h2 className="text-lg font-semibold mb-1">{heading.name}</h2>
            <p className="text-sm text-muted-foreground">
              Start online test for {heading.name}
            </p>
          </a>
        ))}
      </div>
      <SetsInlineSection classSlug={className} bookSlug={bookSlug} chapterSlug={chapterSlug} />
    </div>
  );
}
