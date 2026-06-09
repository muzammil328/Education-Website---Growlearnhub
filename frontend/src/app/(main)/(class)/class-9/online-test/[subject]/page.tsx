import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import OnlineTestClass9BookPage from '@/features/OnlineTest/Class9/Book';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ subject: string }>;
}

const image = '/9th/class_9_online_test.webp';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const label = removeDashAndUppercase(subject);
  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${subject}/`;
  const canonical = `/class-9/online-test/${subject}/`;
  const title = `Class 9 ${label} Online Test`;
  const description = `Class 9 ${label} online test with chapter-wise quizzes, instant scoring, and detailed feedback.`;
  const keywords = ['class 9 online test', `class 9 ${label.toLowerCase()} online test`, 'free class 9 quiz'];

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: { title, description, url, images: [{ url: image, alt: title }] },
    twitter: { title, description, images: { url: image, alt: title } },
  };
}

export default async function Page({ params }: PageProps) {
  const { subject } = await params;
  const label = removeDashAndUppercase(subject);

  return (
    <UserLayout
      title={`Class 9 ${label} Online Test`}
      canonical={`/class-9/online-test/${subject}/`}
      image={image}
      url={`https://growlearnhub.com/class-9/online-test/${subject}/`}
    >
      <OnlineTestClass9BookPage className="class-9" bookSlug={subject} />
    </UserLayout>
  );
}
