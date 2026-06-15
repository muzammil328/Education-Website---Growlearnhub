'use client';
import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import { Heading2, Para } from '@muzammil328/ui';
import { useChapterByClassAndBookSlug } from '@/hooks/use-public';
import SetsInlineSection from '@/components/mcqs/SetsInlineSection';
import { toDisplayName } from '@/lib/class-filter';

export default function OnlineTestClass11BookPage({
  className,
  bookSlug,
}: {
  className: string;
  bookSlug: string;
}) {
  const { data, isLoading, error } = useChapterByClassAndBookSlug(className, bookSlug);
  const chapters = data?.data ?? [];

  if (isLoading) {
    return (
      <div>
        <Heading2>Chapter Wise Online Test</Heading2>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <Para className="font-medium text-red-700">Failed to load chapters</Para>
        <Para className="mt-1 text-sm text-red-600">Please try again in a moment.</Para>
      </div>
    );
  }

  if (!chapters.length) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <Para className="font-medium text-amber-700">No chapters found</Para>
        <Para className="mt-1 text-sm text-amber-600">
          There are no chapters available for this class and book.
        </Para>
      </div>
    );
  }

  return (
    <div>
      <Heading2>{toDisplayName(bookSlug)} — Chapter Wise Online Test</Heading2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {chapters.map(chapter => (
          <CardSmall
            key={chapter.slug}
            title={chapter.name}
            link={`${className}/online-test/${bookSlug}/${chapter.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
