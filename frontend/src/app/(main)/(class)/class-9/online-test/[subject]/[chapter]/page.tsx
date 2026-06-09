import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import OnlineTestClass9ChapterPage from '@/features/OnlineTest/Class9/Chapter';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ subject: string; chapter: string }>;
}

const image = '/9th/class_9_online_test.webp';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, chapter } = await params;
  const subjectLabel = removeDashAndUppercase(subject);
  const chapterLabel = removeDashAndUppercase(chapter);
  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${subject}/${chapter}/`;
  const canonical = `/class-9/online-test/${subject}/${chapter}/`;
  const title = `Class 9 ${subjectLabel} ${chapterLabel} Online Test`;
  const description = `Class 9 ${subjectLabel} ${chapterLabel} online test with instant scoring and feedback.`;

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
  const { subject, chapter } = await params;
  const subjectLabel = removeDashAndUppercase(subject);
  const chapterLabel = removeDashAndUppercase(chapter);

  return (
    <UserLayout
      title={`Class 9 ${subjectLabel} ${chapterLabel} Online Test`}
      canonical={`/class-9/online-test/${subject}/${chapter}/`}
      image={image}
      url={`https://growlearnhub.com/class-9/online-test/${subject}/${chapter}/`}
    >
      <OnlineTestClass9ChapterPage className="class-9" bookSlug={subject} chapterSlug={chapter} />
    </UserLayout>
  );
}
