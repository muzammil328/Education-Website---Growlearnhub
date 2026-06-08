'use client';
import { Heading2 } from '@muzammil328/ui';
import SubjectWiseMcqs from './SubjectWiseMcqs';
import UserLayout from '@/components/elements/wrapper/SimpleWrapper';
import CallToAction from '@/components/CallToAction';

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
          <p className="text-lg text-muted-foreground">
            Discover comprehensive learning resources for each subject. Click on a topic to explore
            detailed chapters, study materials, and practice resources.
          </p>
        </div>
        <SubjectWiseMcqs />
        <CallToAction />
      </section>
    </UserLayout>
  );
}
