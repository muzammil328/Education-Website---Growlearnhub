'use client';
import React, { useState } from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useBooksByClass } from '@/hooks/use-public';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const CLASSES = [
  { slug: 'class-9', label: 'Class 9' },
  { slug: 'class-10', label: 'Class 10' },
  { slug: 'class-11', label: 'Class 11' },
  { slug: 'class-12', label: 'Class 12' },
];

function BooksList({ classSlug }: { classSlug: string }) {
  const { data, isLoading, error } = useBooksByClass(classSlug);
  const books = data?.data ?? [];

  if (isLoading) return <SmallCardSkeletonGrid />;
  if (error) return <Para className="text-red-500 mt-2">Failed to load books.</Para>;
  if (!books.length) return <Para className="text-muted-foreground mt-2">No books available.</Para>;

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book: { name: string; slug: string }) => (
        <CardSmall
          key={book.slug}
          title={book.name}
          link={`/${classSlug}/pairing-scheme`}
        />
      ))}
    </div>
  );
}

export default function PairingSchemePage({ title, image, canonical, url }: UserLayoutProps) {
  const [activeClass, setActiveClass] = useState('class-9');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="max-w-none space-y-8">
        <Para className="text-muted-foreground">
          Browse class-wise pairing schemes to understand paper patterns, important units, and
          question distribution for board exam preparation. Select your class to explore books
          with subject-wise pairing scheme sections.
        </Para>

        <section>
          <Heading2 className="text-xl font-semibold text-foreground mb-4">Select Class</Heading2>
          <div className="flex flex-wrap gap-2">
            {CLASSES.map(cls => (
              <button
                key={cls.slug}
                onClick={() => setActiveClass(cls.slug)}
                className={`rounded-md px-4 py-2 text-sm font-medium border transition-colors ${
                  activeClass === cls.slug
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                {cls.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Heading3 className="text-lg font-medium text-foreground mb-1">
              {CLASSES.find(c => c.slug === activeClass)?.label} Books
            </Heading3>
            <Para className="text-sm text-muted-foreground mb-3">
              Click a book to go to the board-wise pairing scheme for that class.
            </Para>
            <BooksList classSlug={activeClass} />
          </div>
        </section>

        <section className="border-t border-border pt-8 space-y-4">
          <Heading2 className="text-xl font-semibold text-foreground">What is a Pairing Scheme?</Heading2>
          <Para className="text-muted-foreground">
            A pairing scheme tells you exactly which chapters are paired together in the board exam
            paper and how marks are distributed across objective, short, and long questions.
            GrowLearnHub provides <strong className="text-foreground">free class-wise pairing
            schemes</strong> for all major subjects so you can focus your preparation on what
            actually appears in the paper.
          </Para>

          <Heading2 className="text-xl font-semibold text-foreground">Why Pairing Schemes Matter</Heading2>
          <Para className="text-muted-foreground">
            Without a pairing scheme, students waste time on chapters that carry minimal marks while
            underweighting the ones that appear every year. A pairing scheme lets you allocate your
            revision time intelligently — more effort on high-weightage chapters, quicker review of
            the rest.
          </Para>

          <Heading2 className="text-xl font-semibold text-foreground">How to Use a Pairing Scheme</Heading2>
          <Para className="text-muted-foreground">
            Select your board on the class page, then open the pairing scheme image. Note which
            chapters are grouped for each question type, pair it with your chapter notes and MCQs,
            and build a targeted study plan. In the final days before your exam, the pairing scheme
            is your fastest guide to what needs one last review.
          </Para>
        </section>
      </article>
    </UserLayout>
  );
}
