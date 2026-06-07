'use client';
import React from 'react';
import { useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug } from '@/hooks/use-public';
import { toDisplayName } from '@/lib/class-filter';

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
        <p className="font-medium text-red-700">Failed to load topics</p>
        <p className="mt-1 text-sm text-red-600">Please try again in a moment.</p>
      </div>
    );
  }

  const mcqsLink = (subHeading?: string) => {
    const params = new URLSearchParams({ mode: 'mcqs' });
    params.set('class', className);
    params.set('book', bookSlug);
    params.set('chapter', chapterSlug);
    params.set('heading', headingSlug);
    if (subHeading) params.set('subHeading', subHeading);
    return `/live/mcqs?${params.toString()}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        {toDisplayName(bookSlug)} — {toDisplayName(chapterSlug)} — {toDisplayName(headingSlug)}
      </h1>
      <p className="text-muted-foreground mb-6">
        {subHeadings.length > 0
          ? 'Select a topic or start the full test.'
          : 'Start your online test for this topic.'}
      </p>

      <div className="mb-4">
        <a
          href={mcqsLink()}
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
              href={mcqsLink(sh.slug)}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
            >
              <h2 className="text-lg font-semibold mb-1">{sh.name}</h2>
              <p className="text-sm text-muted-foreground">
                Practice test for {sh.name}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
