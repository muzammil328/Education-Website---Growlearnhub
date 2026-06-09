'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

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
          <h2 className="text-2xl font-semibold text-primary">VU Final Exam Handouts</h2>
          <p className="text-muted-foreground mt-1">
            Browse Virtual University final exam handouts. Click a handout to view details and download the PDF.
          </p>
        </header>

        <section className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">Failed to load handouts. Please try again later.</p>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map((book: { name: string; slug: string }) => (
                <CardSmall key={book.slug} title={book.name} link={`/vu/final-mcqs/${book.slug}`} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No handouts available at the moment.</p>
          )}
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-foreground">Related</h3>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/vu/mid-mcqs" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Mid Exam Handouts</Link>
            <Link href="/vu/handouts" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">All VU Handouts</Link>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
