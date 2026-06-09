'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function McqsPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('mcqs');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <Para>
        Browse class-wise MCQs for Matric, Intermediate, and other academic levels. Practice
        chapter-wise multiple choice questions sourced from past papers and model papers to
        strengthen your board exam preparation.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/mcqs`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>MCQs — All Classes</Heading2>
        <Para>
          Multiple choice questions are a core part of Pakistani board exams. GrowLearnHub offers
          <strong className="text-foreground"> free chapter-wise MCQs</strong> for all major
          subjects across Matric and Intermediate classes. Each question is sourced from past
          papers, model papers, and textbook exercises so you practice exactly what appears in
          real exams.
        </Para>

        <Heading2>Why Practice MCQs</Heading2>
        <Para>
          MCQs test both knowledge and speed. Regular practice helps you identify weak areas,
          build answer instinct, and improve your score on the objective portion of board papers.
          With instant answers and explanations, you learn from every mistake without needing a
          tutor.
        </Para>

        <Heading2>Chapter-wise MCQ Practice</Heading2>
        <Para>
          Our MCQs are organised chapter by chapter so you can focus on one topic at a time.
          Start from the chapters you find hardest, work through them systematically, and then
          do full-subject practice rounds as your exam approaches.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Para>
          <strong className="text-foreground">Are the MCQs on GrowLearnHub free?</strong>
          <br />
          Yes, all MCQs are completely free with no account or payment required.
        </Para>
        <Para>
          <strong className="text-foreground">Can I practice MCQs on mobile?</strong>
          <br />
          Yes. The MCQ interface is fully responsive and works on any smartphone or tablet.
        </Para>
      </div>
    </UserLayout>
  );
}
