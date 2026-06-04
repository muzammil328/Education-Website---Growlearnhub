import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { notFound } from 'next/navigation';
import OnlineTestClass9ChapterPage from '@/features/OnlineTestPage/Class9/Chapter';
import { config } from '@/config';

interface McqsBookChapter {
  chapter: string;
  book: string;
}

interface PageProps {
  params: Promise<McqsBookChapter>;
}

const image = '/9th/class_9_online_test.webp';

const data = {
  title: 'Online Tests – All Classes | Free Interactive Quizzes & Practice Exams | GrowLearnHub',
  description:
    'Take interactive online tests for classes 9-12. Practice with timed quizzes, get instant feedback, and track your performance with detailed analytics.',
  keywords: [
    'online test all classes',
    'class 9 online test',
    'class 10 online test',
    'class 11 online test',
    'class 12 online test',
    'free online quizzes',
    'practice exams',
    'timed tests',
    'instant feedback',
    'performance tracking',
    'growlearnhub tests',
    'general knowledge tests',
  ],
  image: '/online_test.webp',
  canonical: '/online-test/',
  url: 'https://growlearnhub.com/online-test/',
  index: true,
  follow: true,
};

export default async function page({ params }: PageProps) {
  const { book, chapter } = await params;
  const slug1 = book;
  const slug2 = chapter;

  if (!book || !chapter) {
    notFound();
  }

  return (
    <UserLayout title={data.title} canonical={data.canonical} image={data.image} url={data.url}>
      <OnlineTestClass9ChapterPage className="class-9" bookName={slug1} chapterName={slug2} />
    </UserLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { book, chapter } = await params;
  const slug1 = book;
  const slug2 = chapter;
  const SlugRemoveDashAndUppercase1 = removeDashAndUppercase(slug1);
  const SlugRemoveDashAndUppercase2 = removeDashAndUppercase(slug2);

  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${slug1}/${slug2}/`;
  const canonical = `/class-9/online-test/${slug1}/${slug2}/`;

  try {
    const title = `Class 9 ${SlugRemoveDashAndUppercase1} ${SlugRemoveDashAndUppercase2} Online Test`;
    const description = `Class 9 ${SlugRemoveDashAndUppercase1} ${SlugRemoveDashAndUppercase2} Online Test page offering a wide range of practice questions, online tests, and detailed answers for thorough exam preparation.`;
    const keywords = [
      'class 9 biology online test',
      'class 9 chemistry online test',
      'class 9 maths online test',
      'class 9 physics online test',
      'class 9 history online test',
      'class 9 geography online test',
    ];

    return {
      title,
      description,
      keywords,
      alternates: { canonical },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      openGraph: { title, description, url, images: [{ url: image, alt: title }] },
      twitter: { title, description, images: { url: image, alt: title } },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'Unable to generate metadata',
      alternates: { canonical },
      robots: { index: false, follow: false },
      openGraph: {
        title: 'Error',
        description: 'Unable to generate metadata',
        url,
        images: [{ url: '/default-error-image.jpg', alt: 'Error' }],
      },
      twitter: {
        title: 'Error',
        description: 'Unable to generate metadata',
        images: { url: '/default-error-image.jpg', alt: 'Error' },
      },
    };
  }
}
