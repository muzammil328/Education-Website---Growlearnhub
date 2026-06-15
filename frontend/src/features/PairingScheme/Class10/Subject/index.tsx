'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { usePairingSchemeByClassAndBoard } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASS_SLUG = 'class-10';

export default function PairingSchemeClass10Board({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = usePairingSchemeByClassAndBoard(CLASS_SLUG, boardSlug);
  const scheme = data?.data;
  const boardName = scheme?.boardName ?? boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`Class 10 Pairing Scheme 2025 – ${boardName} | GrowLearnHub`}
      image="/10th/class_10_pairing_scheme_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/pairing-scheme/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/pairing-scheme/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <Para className="text-sm text-muted-foreground mb-2">
            <Link href="/pairing-scheme" className="hover:underline text-primary">Pairing Scheme</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="hover:underline text-primary">Class 10</Link>
            {' / '}
            <span>{boardName}</span>
          </Para>
          <Heading2 className="text-2xl font-semibold text-primary">
            Class 10 Pairing Scheme 2025 – {boardName}
          </Heading2>
          <Para className="text-muted-foreground mt-1">
            View the official paper pattern and chapter pairing for Class 10 (SSC-II / Matric) {scheme?.year ?? 2025}.
          </Para>
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading pairing scheme...
            </div>
          ) : error ? (
            <Para className="text-red-500">Failed to load. Please try again later.</Para>
          ) : scheme?.image ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href={scheme.image}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Download Pairing Scheme ({scheme.year})
                </a>
              </div>
              <div className="w-full overflow-hidden rounded-lg border border-border bg-muted/30 p-2">
                <div className="relative w-full" style={{ minHeight: 500 }}>
                  <Image
                    src={scheme.image}
                    alt={`Class 10 ${boardName} Pairing Scheme ${scheme.year}`}
                    width={800}
                    height={1100}
                    className="w-full h-auto rounded"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ) : (
            <Para className="text-muted-foreground">No pairing scheme available for this board yet.</Para>
          )}
        </section>

        <section className="mt-8">
          <Heading3 className="text-xl font-semibold text-foreground">How to Read the Pairing Scheme</Heading3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Each row shows which chapters are paired in a single question.</li>
            <li>Use this to decide which chapters to revise together for matric exams.</li>
            <li>Focus on chapters paired with high-mark long questions first.</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
