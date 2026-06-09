'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function DateSheetPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('date-sheet');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <p>
        Browse class-wise date sheets for Matric, Intermediate, and other academic levels. Find
        exam schedules, subject dates, and organized date sheet sections to plan your preparation
        more effectively.
      </p>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/date-sheet`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <h2>Date Sheets — All Classes</h2>
        <p>
          Planning your exam preparation starts with knowing your exam schedule. GrowLearnHub
          provides <strong className="text-foreground">free class-wise date sheets</strong> for
          Matric, Intermediate, and other academic levels. Browse your class to find the latest
          exam dates, subject schedules, and board-wise date sheet information — all in one place.
        </p>

        <h2>Why Date Sheets Matter</h2>
        <p>
          A date sheet gives you a clear picture of what exams are coming and when. With the right
          schedule in hand, you can prioritize revision, avoid last-minute cramming, and manage the
          days between papers more effectively. Board exams can feel chaotic without a plan —
          a date sheet turns that chaos into a structured study timeline.
        </p>

        <h2>How to Use Date Sheets for Exam Preparation</h2>
        <p>
          Once you have your date sheet, map out each subject against the days remaining. Give
          more time to subjects with earlier exam dates and use the gaps between papers for quick
          revision of upcoming topics. Cross-reference the date sheet with your notes and past
          papers to build a realistic, subject-wise study plan.
        </p>

        <h3>Frequently Asked Questions</h3>
        <p>
          <strong className="text-foreground">Are the date sheets on GrowLearnHub free?</strong>
          <br />
          Yes, all date sheet information on GrowLearnHub is completely free with no account or
          payment required.
        </p>
        <p>
          <strong className="text-foreground">Which boards are covered?</strong>
          <br />
          We cover Punjab Board, Federal Board (FBISE), and major regional BISE boards for Matric
          and Intermediate classes.
        </p>
      </div>
    </UserLayout>
  );
}
