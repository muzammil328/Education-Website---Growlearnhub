'use client';
import React from 'react';
import { useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug } from '@/hooks/use-public';
import { toDisplayName } from '@/lib/class-filter';
import SetsInlineSection from '@/components/mcqs/SetsInlineSection';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

export default function OnlineTestClass9HeadingPage({
  className,
  bookSlug,
  chapterSlug,
  headingSlug,
}: {
  className: string;
  bookSlug: string;
  chapterSlug: string;
  headingSlug: string;
}) {
  const { data, isLoading, error } = useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug(
    className, bookSlug, chapterSlug, headingSlug
  );
  const subHeadings = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-8 w-64 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <Para className="font-medium text-red-700">Failed to load topics</Para>
        <Para className="mt-1 text-sm text-red-600">Please try again in a moment.</Para>
      </div>
    );
  }

  const testLink = (subHeading?: string) => {
    const params = new URLSearchParams();
    params.set('class', className);
    params.set('book', bookSlug);
    params.set('chapter', chapterSlug);
    params.set('heading', headingSlug);
    if (subHeading) params.set('subHeading', subHeading);
    return `/live/online-test?${params.toString()}`;
  };

  return (
    <div>
      <Heading1 className="text-2xl font-bold mb-2">
        {toDisplayName(bookSlug)} — {toDisplayName(chapterSlug)} — {toDisplayName(headingSlug)}
      </Heading1>
      <Para className="text-muted-foreground mb-6">
        {subHeadings.length > 0
          ? 'Select a topic or start the full test.'
          : 'Start your online test for this topic.'}
      </Para>

      <div className="mb-4">
        <a
          href={testLink()}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Start Full Test
        </a>
      </div>

      {subHeadings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {subHeadings.map(sh => (
            <a
              key={sh.slug || sh.name}
              href={testLink(sh.slug)}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
            >
              <Heading2 className="text-lg font-semibold mb-1">{sh.name}</Heading2>
              <Para className="text-sm text-muted-foreground">
                Practice test for {sh.name}
              </Para>
            </a>
          ))}
        </div>
      )}
      <SetsInlineSection classSlug={className} bookSlug={bookSlug} chapterSlug={chapterSlug} headingSlug={headingSlug} />
    </div>
  );
}
