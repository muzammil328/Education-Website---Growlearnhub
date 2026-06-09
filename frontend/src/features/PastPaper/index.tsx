'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function PastPaperPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('past-paper');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <p>
        Prepare more effectively with class-wise past papers for Matric, Intermediate, and other
        academic levels. Browse your class to find subject-wise past papers and practice with
        real exam-style questions.
      </p>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/past-paper`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <h2>Past Papers — All Classes</h2>
        <p>
          Past papers are the single most effective revision tool for Pakistani board exams.
          GrowLearnHub hosts <strong className="text-foreground">free subject-wise past papers</strong>{' '}
          for Punjab Board, FBISE, and major BISE boards going back several years — all free to
          read and download without any account.
        </p>

        <h2>Why Past Papers Are Essential</h2>
        <p>
          Examiners often repeat question patterns across years. Working through past papers gives
          you a clear picture of what to expect in the real exam, helps you manage time under
          pressure, and highlights the topics that carry the most marks in each subject.
        </p>

        <h2>How to Use Past Papers Effectively</h2>
        <p>
          Attempt each paper under timed conditions, then review your answers carefully. Focus on
          the question types you get wrong and revise those topics before attempting the next paper.
          Pair past papers with chapter-wise MCQs and notes for the most complete exam preparation.
        </p>

        <h3>Frequently Asked Questions</h3>
        <p>
          <strong className="text-foreground">Are the past papers on GrowLearnHub free?</strong>
          <br />
          Yes, all past papers are completely free with no account or payment required.
        </p>
        <p>
          <strong className="text-foreground">How many years of past papers are available?</strong>
          <br />
          We aim to provide at least five years of past papers per subject. Some subjects have
          more going back to 2015.
        </p>
      </div>
    </UserLayout>
  );
}
