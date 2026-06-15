'use client';

import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBoardsByClassAndService } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-11';
const SERVICE_SLUG = 'result';

export default function Class11ResultPage() {
  const { data, isLoading, error } = useBoardsByClassAndService(CLASS_SLUG, SERVICE_SLUG);
  const boards = data?.data ?? [];

  return (
    <UserLayout
      title="Class 11 Result 2025 - Check by Board | GrowLearnHub"
      canonical={`/${CLASS_SLUG}/result/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/result/`}
    >
      <article className="max-w-none">
        <header>
          <Heading2 className="text-2xl font-semibold text-primary">Class 11 Result 2025</Heading2>
          <Para className="text-muted-foreground">
            Check your Class 11 (HSC-I / Inter Part 1) result for all Punjab boards. Select your
            board below and access the official result PDF for 2025.
          </Para>
        </header>

        <section className="mt-8">
          <Heading3 className="text-xl font-semibold text-foreground">Select Your Board</Heading3>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading boards...
            </div>
          ) : error ? (
            <Para className="text-red-500 mt-4">Failed to load. Please try again later.</Para>
          ) : boards.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {boards.map((board: { name: string; slug: string }) => (
                <CardSmall
                  key={board.slug}
                  title={board.name}
                  link={`/${CLASS_SLUG}/${SERVICE_SLUG}/${board.slug}`}
                />
              ))}
            </div>
          ) : (
            <Para className="text-muted-foreground mt-4">No boards available at the moment.</Para>
          )}
        </section>

        <section className="mt-8">
          <Heading3 className="text-xl font-semibold text-foreground">Result Checking Methods</Heading3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Download the official result PDF for your board.</li>
            <li>Check by roll number for fastest lookup on result day.</li>
            <li>Save and print your provisional marksheet for Part 2 admissions.</li>
          </ul>
        </section>

        <section className="mt-8">
          <Heading3 className="text-xl font-semibold text-foreground">Related Pages</Heading3>
          <Para className="text-muted-foreground">
            Explore{' '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="text-primary hover:underline">
              date sheet
            </Link>{' '}
            and{' '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="text-primary hover:underline">
              pairing scheme
            </Link>{' '}
            pages for complete exam preparation.
          </Para>
        </section>
      </article>
    </UserLayout>
  );
}
