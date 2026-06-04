'use client';
import Link from 'next/link';
import { Heading2, Para } from '@muzammil328/ui';
import SubjectWiseMcqs from './SubjectWiseMcqs';
import UserLayout from '@/components/elements/wrapper/SimpleWrapper';

type ExploreTopicsPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default function ExploreTopicsPage({
  title,
  image,
  canonical,
  url,
}: ExploreTopicsPageProps) {
  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <section className="relative py-12">
        <div className="mb-12 text-center">
          <Heading2 size="lg" weight="bold" className="mb-4">
            Explore Topics
          </Heading2>
          <Para className="text-lg text-muted-foreground">
            Discover comprehensive learning resources for each subject. Click on a topic to explore
            detailed chapters, study materials, and practice resources.
          </Para>
        </div>
        <SubjectWiseMcqs />

        <div className="mt-16 rounded-xl bg-linear-to-r from-primary/10 to-primary/5 p-8 text-center">
          <Heading2 size="lg" weight="bold" className="mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </Heading2>
          <Para className="mx-auto mb-6 max-w-2xl text-lg">
            We&apos;re constantly adding new subjects and resources. Let us know what you need and
            we&apos;ll make it available.
          </Para>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/report-a-bug"
              className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
            >
              Report a Bug
            </Link>
            <Link
              href="/request-feature"
              className="rounded-lg border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Request a Feature
            </Link>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
