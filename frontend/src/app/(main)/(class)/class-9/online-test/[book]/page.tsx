import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { notFound } from 'next/navigation';
import OnlineTestClass9BookPage from '@/features/OnlineTestPage/Class9/Book';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ book: string }>;
}

const image = '/9th/class_9_online_test.webp';

export default async function page({ params }: PageProps) {
  const { book } = await params;
  const slug = book;
  const SlugRemoveDashAndUppercase = removeDashAndUppercase(slug);

  if (!book) {
    notFound();
  }

  return (
    <UserLayout
      title={`Class 9 ${SlugRemoveDashAndUppercase} Online Test`}
      canonical={`/class-9/online-test/${slug}`}
      image={image}
      url={`https://growlearnhub.com/class-9/online-test/${slug}`}
    >
      <OnlineTestClass9BookPage className="class-9" bookName={slug} />
    </UserLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { book } = await params;
  const slug = book;
  const url = `${config.SITE_URL ?? ''}/class-9/online-test/${slug}/`;
  const canonical = `/class-9/online-test/${slug}/`;

  const SlugRemoveDashAndUppercase = removeDashAndUppercase(slug);

  try {
    const title = `Class 9 ${SlugRemoveDashAndUppercase} Online Test`;
    const description = `Class 9 ${SlugRemoveDashAndUppercase} Online Test page offering a wide range of practice questions, online tests, and detailed answers for thorough exam preparation.`;
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
