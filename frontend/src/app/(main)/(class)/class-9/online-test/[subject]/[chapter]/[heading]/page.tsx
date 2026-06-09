import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import OnlineTestClass9HeadingPage from '@/features/OnlineTest/Class9/Heading';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ subject: string; chapter: string; heading: string }>;
}

const image = '/9th/class_9_online_test.webp';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, chapter, heading } = await params;
  const s = removeDashAndUppercase(subject);
  const c = removeDashAndUppercase(chapter);
  const h = removeDashAndUppercase(heading);
  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${subject}/${chapter}/${heading}/`;
  const canonical = `/class-9/online-test/${subject}/${chapter}/${heading}/`;
  const title = `Class 9 ${s} ${c} ${h} Online Test`;
  const description = `Class 9 ${s} ${c} ${h} online test — practice with instant scoring and detailed feedback.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: { title, description, url, images: [{ url: image, alt: title }] },
    twitter: { title, description, images: { url: image, alt: title } },
  };
}

export default async function Page({ params }: PageProps) {
  const { subject, chapter, heading } = await params;
  const s = removeDashAndUppercase(subject);
  const c = removeDashAndUppercase(chapter);
  const h = removeDashAndUppercase(heading);

  return (
    <UserLayout
      title={`Class 9 ${s} ${c} ${h} Online Test`}
      canonical={`/class-9/online-test/${subject}/${chapter}/${heading}/`}
      image={image}
      url={`https://growlearnhub.com/class-9/online-test/${subject}/${chapter}/${heading}/`}
    >
      <OnlineTestClass9HeadingPage
        className="class-9"
        bookSlug={subject}
        chapterSlug={chapter}
        headingSlug={heading}
      />
    </UserLayout>
  );
}
