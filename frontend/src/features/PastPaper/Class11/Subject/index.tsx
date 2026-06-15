'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassWithChapters } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-11';

export default function PastPaperClass11Board({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = useBooksByClassWithChapters(CLASS_SLUG);
  const books = data?.data ?? [];
  const boardName = boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`Class 11 Past Paper MCQs – ${boardName} | GrowLearnHub`}
      canonical={`/${CLASS_SLUG}/past-paper/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/past-paper/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <Para className="text-sm text-muted-foreground mb-2">
            <Link href="/past-paper" className="hover:underline text-primary">Past Paper</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/past-paper`} className="hover:underline text-primary">Class 11</Link>
            {' / '}
            <span>{boardName}</span>
          </Para>
          <Heading2 className="text-2xl font-semibold text-primary">
            Class 11 Past Paper MCQs – {boardName}
          </Heading2>
          <Para className="text-muted-foreground mt-1">Browse subjects and select a chapter to practice past paper MCQs.</Para>
        </header>

        <section className="mt-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading subjects...
            </div>
          ) : error ? (
            <Para className="text-red-500">Failed to load. Please try again later.</Para>
          ) : books.length > 0 ? (
            books.map((book: { name: string; slug: string; chapters: { name: string; slug: string }[] }) => (
              <div key={book.slug} className="rounded-lg border border-border overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <Heading3 className="font-semibold text-foreground">{book.name}</Heading3>
                </div>
                {book.chapters.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {book.chapters.map(ch => (
                      <li key={ch.slug}>
                        <Link href={`/${CLASS_SLUG}/past-paper/${boardSlug}/${ch.slug}`} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/40 transition-colors group">
                          <span className="text-foreground group-hover:text-primary">{ch.name}</span>
                          <span className="text-muted-foreground text-xs group-hover:text-primary">MCQs →</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Para className="px-4 py-3 text-sm text-muted-foreground">No chapters available.</Para>
                )}
              </div>
            ))
          ) : (
            <Para className="text-muted-foreground">No subjects available at the moment.</Para>
          )}
        </section>
      </article>
    </UserLayout>
  );
}
