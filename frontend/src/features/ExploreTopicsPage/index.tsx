'use client';
import UserLayout from '@/components/elements/wrapper/SimpleWrapper';
import CallToAction from '@/components/CallToAction';
import { Heading2, Para } from '@muzammil328/ui';

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
      <section className="">
        <Heading2>
          Explore Topics
        </Heading2>
        <Para className="text-lg text-muted-foreground">
          Discover comprehensive learning resources for each subject. Click on a topic to explore
          detailed chapters, study materials, and practice resources.
        </Para>
      </section>
      <CallToAction />
    </UserLayout>
  );
}
