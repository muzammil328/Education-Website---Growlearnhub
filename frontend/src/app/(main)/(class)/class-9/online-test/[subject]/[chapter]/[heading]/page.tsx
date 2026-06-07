import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { notFound } from 'next/navigation';
import OnlineTestClass9HeadingPage from '@/features/OnlineTest/Class9/Heading';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ book: string; chapter: string; heading: string }>;
}

const image = '/9th/class_9_online_test.webp';

export default async function page({ params }: PageProps) {
  const { book, chapter, heading } = await params;

  if (!book || !chapter || !heading) {
    notFound();
  }

  return (
    <UserLayout
      title={`Class 9 ${removeDashAndUppercase(book)} ${removeDashAndUppercase(chapter)} ${removeDashAndUppercase(heading)} Online Test`}
      canonical={`/class-9/online-test/${book}/${chapter}/${heading}`}
      image={image}
      url={`https://growlearnhub.com/class-9/online-test/${book}/${chapter}/${heading}`}
    >
      <OnlineTestClass9HeadingPage
        className="class-9"
        bookSlug={book}
        chapterSlug={chapter}
        headingSlug={heading}
      />
    </UserLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { book, chapter, heading } = await params;

  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${book}/${chapter}/${heading}/`;
  const canonical = `/class-9/online-test/${book}/${chapter}/${heading}/`;

  try {
    const title = `Class 9 ${removeDashAndUppercase(book)} ${removeDashAndUppercase(chapter)} ${removeDashAndUppercase(heading)} Online Test`;
    const description = `Class 9 ${removeDashAndUppercase(book)} ${removeDashAndUppercase(chapter)} ${removeDashAndUppercase(heading)} Online Test — practice with chapter-wise quizzes, instant scoring, and detailed feedback.`;
    const keywords = [
      'class 9 online test',
      'class 9 chapter wise test',
      'class 9 biology online test',
      'class 9 chemistry online test',
      'class 9 physics online test',
      'free class 9 quiz',
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
