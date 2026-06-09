'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function PairingSchemePage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('pairing-scheme');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <Para>
        Browse class-wise pairing schemes to understand paper patterns, important units, and
        question distribution for board exam preparation. Select your class to explore the
        relevant subject-wise pairing scheme sections.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/pairing-scheme`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>Pairing Schemes — All Classes</Heading2>
        <Para>
          A pairing scheme tells you exactly which chapters are paired together in the board exam
          paper and how marks are distributed across objective, short, and long questions.
          GrowLearnHub provides <strong className="text-foreground">free class-wise pairing
          schemes</strong> for all major subjects so you can focus your preparation on what
          actually appears in the paper.
        </Para>

        <Heading2>Why Pairing Schemes Matter</Heading2>
        <Para>
          Without a pairing scheme, students waste time on chapters that carry minimal marks while
          underweighting the ones that appear every year. A pairing scheme lets you allocate your
          revision time intelligently — more effort on high-weightage chapters, quicker review of
          the rest.
        </Para>

        <Heading2>How to Use a Pairing Scheme</Heading2>
        <Para>
          Open the pairing scheme for your subject and note which chapters are grouped together
          for each question. Then pair it with your chapter-wise notes and MCQs to create a
          targeted study plan. In the final days before your exam, the pairing scheme is your
          fastest guide to what needs one last review.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Para>
          <strong className="text-foreground">Are the pairing schemes on GrowLearnHub free?</strong>
          <br />
          Yes, all pairing schemes are completely free with no account or payment required.
        </Para>
        <Para>
          <strong className="text-foreground">Which classes have pairing schemes available?</strong>
          <br />
          Pairing schemes are available for Class 9, 10, 11, and 12 across Punjab and Federal
          Board subjects.
        </Para>
      </div>
    </UserLayout>
  );
}
