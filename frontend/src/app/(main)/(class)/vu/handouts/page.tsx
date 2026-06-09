'use client';

import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';

const DEPT_LABELS: Record<string, string> = {
  cs: 'Computer Science (CS)',
  edu: 'Education (EDU)',
  eng: 'English (ENG)',
  isl: 'Islamic Studies (ISL)',
  mgt: 'Management (MGT)',
  mth: 'Mathematics (MTH)',
  pak: 'Pakistan Studies (PAK)',
  phy: 'Physics (PHY)',
};

function getDept(code: string): string {
  const prefix = code.replace(/[^a-zA-Z]/g, '').toLowerCase();
  for (const key of Object.keys(DEPT_LABELS)) {
    if (prefix.startsWith(key)) return key;
  }
  return 'other';
}

export default function Page() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug('vu', 'books');

  const grouped = books.reduce<Record<string, { name: string; slug: string }[]>>((acc, book) => {
    const dept = getDept(book.name);
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(book);
    return acc;
  }, {});

  const deptOrder = ['cs', 'edu', 'eng', 'isl', 'mgt', 'mth', 'pak', 'phy', 'other'];

  return (
    <UserLayout
      title="VU Handouts PDF Download | All Virtual University Courses – GrowLearnHub"
      canonical="/vu/handouts/"
      url="https://growlearnhub.com/vu/handouts/"
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="text-muted-foreground">
            Browse and download <strong>Virtual University handouts</strong> by course code. All
            courses are grouped by department so you can find study material quickly.
          </p>
        </section>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i}>
                <div className="h-8 w-48 rounded bg-muted animate-pulse mb-4" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4].map(j => <div key={j} className="h-14 rounded-lg bg-muted animate-pulse" />)}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load handouts. Please try again later.</p>
        ) : books.length === 0 ? (
          <p className="text-muted-foreground">No handouts available at the moment.</p>
        ) : (
          deptOrder
            .filter(dept => grouped[dept]?.length)
            .map(dept => (
              <section key={dept} className="mb-12">
                <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
                  {DEPT_LABELS[dept] ?? dept.toUpperCase()} Handouts
                </h2>
                <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {grouped[dept].map(book => (
                    <CardSmall
                      key={book.slug}
                      title={book.name}
                      link={`/vu/handouts/${book.slug}`}
                    />
                  ))}
                </div>
              </section>
            ))
        )}
      </article>
    </UserLayout>
  );
}
