'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function NotesPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('notes');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <Para>
        Browse class-wise notes for Matric, Intermediate, and other academic levels. Find
        subject-wise study material, chapter summaries, and concept-focused notes to support
        better exam preparation.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/notes`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>Notes — All Classes</Heading2>
        <Para>
          GrowLearnHub provides <strong className="text-foreground">free class-wise notes</strong>{' '}
          written in simple, easy-to-understand language following the latest PCTB and Federal
          Board syllabi. Each subject is broken down chapter by chapter with key definitions,
          formulas, and diagrams highlighted for faster revision.
        </Para>

        <Heading2>Why Use Notes for Exam Preparation</Heading2>
        <Para>
          Notes condense large textbook chapters into focused, revision-ready material. Instead
          of re-reading full textbooks before an exam, well-structured notes let you review an
          entire chapter in minutes. Combined with MCQs and past papers, notes form the backbone
          of an effective board exam study plan.
        </Para>

        <Heading2>Chapter-wise Subject Notes</Heading2>
        <Para>
          Every set of notes on GrowLearnHub is organised chapter by chapter. Pick the subject
          you need, go to the chapter you are studying, and read through concise explanations
          of all key concepts — no fluff, just the content that matters for your exams.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Para>
          <strong className="text-foreground">Are the notes on GrowLearnHub free?</strong>
          <br />
          Yes, all notes are completely free with no account or payment required.
        </Para>
        <Para>
          <strong className="text-foreground">Can I read notes on mobile?</strong>
          <br />
          Yes. All notes pages are fully responsive and readable on any smartphone or tablet.
        </Para>
      </div>
    </UserLayout>
  );
}
