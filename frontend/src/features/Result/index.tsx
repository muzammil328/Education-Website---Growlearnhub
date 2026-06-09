'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function ResultPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('result');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <Para>
        Browse class-wise exam results for Matric, Intermediate, and other academic levels.
        Select your class to view the latest result updates, board links, and result-related
        information in one place.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/result`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>Results — All Classes</Heading2>
        <Para>
          GrowLearnHub provides a centralized hub for
          <strong className="text-foreground"> Pakistani board exam results</strong> across Matric
          and Intermediate classes. Browse your class to find the latest result announcements,
          board links, and result checking methods — all organized in one easy-to-navigate page.
        </Para>

        <Heading2>How to Check Your Result</Heading2>
        <Para>
          Select your class from the list above to go to the relevant result page. From there,
          follow the provided board link or result-checking method. Have your roll number and
          exam session details ready before you begin.
        </Para>

        <Heading2>Stay Updated on Result Announcements</Heading2>
        <Para>
          Board exam results in Pakistan are announced at different times depending on the board
          and exam session. Bookmark this page and check back regularly so you do not miss your
          result announcement date.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Para>
          <strong className="text-foreground">Which boards are covered for results?</strong>
          <br />
          We cover Punjab Board, Federal Board (FBISE), and most regional BISE boards for Matric
          and Intermediate results.
        </Para>
        <Para>
          <strong className="text-foreground">Is this service free?</strong>
          <br />
          Yes, all result pages and information on GrowLearnHub are completely free.
        </Para>
      </div>
    </UserLayout>
  );
}
