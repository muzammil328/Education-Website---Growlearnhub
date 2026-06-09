'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { usePairingSchemeByClassAndBoard } from '@/hooks/use-public';

const CLASS_SLUG = 'class-12';

export default function PairingSchemeClass12Board({ boardSlug }: { boardSlug: string }) {
  const { data, isLoading, error } = usePairingSchemeByClassAndBoard(CLASS_SLUG, boardSlug);
  const scheme = data?.data;
  const boardName = scheme?.boardName ?? boardSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`Class 12 Pairing Scheme 2025 – ${boardName} | GrowLearnHub`}
      canonical={`/${CLASS_SLUG}/pairing-scheme/${boardSlug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/pairing-scheme/${boardSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <p className="text-sm text-foreground/60 mb-2">
            <Link href="/pairing-scheme" className="hover:underline text-primary">Pairing Scheme</Link>
            {' / '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="hover:underline text-primary">Class 12</Link>
            {' / '}
            <span>{boardName}</span>
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Class 12 Pairing Scheme 2025 – {boardName}
          </h2>
          <p className="text-foreground/80 mt-1">
            View the official paper pattern and chapter pairing for Class 12 (HSC-II / Inter Part 2) {scheme?.year ?? 2025}.
          </p>
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading pairing scheme...
            </div>
          ) : error ? (
            <p className="text-red-500">Failed to load. Please try again later.</p>
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
                    alt={`Class 12 ${boardName} Pairing Scheme ${scheme.year}`}
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
            <p className="text-foreground/60">No pairing scheme available for this board yet.</p>
          )}
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">How to Read the Pairing Scheme</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Each row shows which chapters are paired in a single question.</li>
            <li>Use this to plan your Inter Part 2 revision efficiently.</li>
            <li>Focus on chapters paired with high-mark long questions first.</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
