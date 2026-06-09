'use client';
import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useClassesBySlug } from '@/hooks/use-public';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function OnlineTestPage({ title, image, canonical, url }: UserLayoutProps) {
  const { classes, isLoading, error } = useClassesBySlug('online-test');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <Para>
        Practice with interactive online tests for Matric, Intermediate, and other academic
        levels. Improve your preparation through chapter-wise quizzes, instant feedback, and
        performance-based learning.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {classes.map((item: { name: string; slug: string }) => (
            <CardSmall key={item.slug} title={item.name} link={`${item.slug}/online-test`} />
          ))}
        </div>
      )}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>Online Tests — All Classes</Heading2>
        <Para>
          Sitting a timed online test is the closest thing to sitting a real board exam from
          home. GrowLearnHub offers <strong className="text-foreground">free chapter-wise online
          tests</strong> for all major subjects across Matric and Intermediate classes. You get
          instant results, a breakdown of correct and incorrect answers, and a score you can
          track over time.
        </Para>

        <Heading2>Benefits of Online Testing</Heading2>
        <Para>
          Regular practice tests help you manage exam anxiety and build speed. Instant feedback
          after every test shows exactly which concepts need more work, so you study smarter
          rather than harder. Unlike passive revision, testing yourself actively strengthens
          long-term retention.
        </Para>

        <Heading2>Chapter-wise and Subject-wise Tests</Heading2>
        <Para>
          Our tests are organised by class, subject, and chapter so you can target any specific
          area of your syllabus. Start with chapters you find difficult, build confidence, and
          then take full-subject tests as your board exam approaches.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Para>
          <strong className="text-foreground">Are the online tests on GrowLearnHub free?</strong>
          <br />
          Yes, all online tests are completely free with no account or payment required.
        </Para>
        <Para>
          <strong className="text-foreground">Can I take tests on mobile?</strong>
          <br />
          Yes. The test interface is fully responsive and works on any smartphone or tablet.
        </Para>
      </div>
    </UserLayout>
  );
}
