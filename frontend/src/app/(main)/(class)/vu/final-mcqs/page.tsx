'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

export default function Page() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug('vu', 'final-exam');

  return (
    <UserLayout
      title="VU Final Exam Handouts 2025 | GrowLearnHub"
      canonical="/vu/final-mcqs/"
      url="https://growlearnhub.com/vu/final-mcqs/"
    >
      <article className="max-w-none">
        <header>
          <Heading2 className="text-2xl font-semibold text-primary">VU Final Exam Handouts</Heading2>
          <Para className="text-muted-foreground mt-1">
            Browse Virtual University final exam handouts. Click a handout to view details and download the PDF.
          </Para>
        </header>

        <section className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <Para className="text-red-500">Failed to load handouts. Please try again later.</Para>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map((book: { name: string; slug: string }) => (
                <CardSmall key={book.slug} title={book.name} link={`/vu/final-mcqs/${book.slug}`} />
              ))}
            </div>
          ) : (
            <Para className="text-muted-foreground">No handouts available at the moment.</Para>
          )}
        </section>

        <section className="mt-10">
          <Heading3 className="text-lg font-semibold text-foreground">Related</Heading3>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/vu/mid-mcqs" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Mid Exam Handouts</Link>
            <Link href="/vu/handouts" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">All VU Handouts</Link>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
