'use client';
import React from 'react';
import { OnlineTestPageSkeleton } from '@/components/QuizSkeleton';
import { useHeadingByClassAndSubjectAndChapterSlug } from '@/hooks/use-public';
import SetsInlineSection from '@/components/mcqs/SetsInlineSection';
import { toDisplayName } from '@/lib/class-filter';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

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
        <Para className="font-medium text-red-700">Failed to load headings</Para>
        <Para className="mt-1 text-sm text-red-600">Please try again in a moment.</Para>
      </div>
    );
  }

  if (!headings.length) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <Para className="font-medium text-amber-700">No headings found</Para>
        <Para className="mt-1 text-sm text-amber-600">
          There are no headings available for this chapter.
        </Para>
      </div>
    );
  }

  return (
    <div>
      <Heading1 className="text-2xl font-bold mb-2">
        {toDisplayName(bookSlug)} — {toDisplayName(chapterSlug)}
      </Heading1>
      <Para className="text-muted-foreground mb-6">Select a topic to start your online test.</Para>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {headings.map(heading => (
          <a
            key={heading.slug}
            href={`/${className}/online-test/${bookSlug}/${chapterSlug}/${heading.slug}`}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
          >
            <Heading2 className="text-lg font-semibold mb-1">{heading.name}</Heading2>
            <Para className="text-sm text-muted-foreground">
              Start online test for {heading.name}
            </Para>
          </a>
        ))}
      </div>
      <SetsInlineSection classSlug={className} bookSlug={bookSlug} chapterSlug={chapterSlug} />
    </div>
  );
}
