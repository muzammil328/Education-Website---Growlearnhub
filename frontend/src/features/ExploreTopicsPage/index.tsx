'use client';
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
      <section className="">
        <h2>
          Explore Topics
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover comprehensive learning resources for each subject. Click on a topic to explore
          detailed chapters, study materials, and practice resources.
        </p>
      </section>
      <CallToAction />
    </UserLayout>
  );
}
