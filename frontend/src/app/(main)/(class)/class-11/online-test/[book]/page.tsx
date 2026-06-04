import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import ClassBookOnlineTest from '@/features/OnlineTestPage/Class9/Book';
import { config } from '@/config';

interface McqsBook {
  book: string;
}

interface PageProps {
  params: Promise<McqsBook>;
}

const image = '/11th/class_11_online_test.webp';

export default async function page({ params }: PageProps) {
  const { book } = await params;
  const slug = book;
  const SlugRemoveDashAndUppercase = removeDashAndUppercase(slug);

  return (
    <UserLayout
      data={{
        title: `Class 11 ${SlugRemoveDashAndUppercase} Online Test`,
        canonical: `/class-11/online-test/${slug}`,
        image: image,
        url: `https://growlearnhub.com/class-11/online-test/${slug}`,
      }}
    >
      <ClassBookOnlineTest className="class-11" bookName={slug} />
    </UserLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { book } = await params;
  const slug = book;
  const url = `${config.SITE_URL}/class-11/online-test/${slug}/`;
  const canonical = `/class-11/online-test/${slug}/`;

  const SlugRemoveDashAndUppercase = removeDashAndUppercase(slug);

  try {
    const title = `Class 11 ${SlugRemoveDashAndUppercase} Online Test`;
    const description = `Class 11 ${SlugRemoveDashAndUppercase} Online Test page offering a wide range of practice questions, online tests, and detailed answers for thorough exam preparation.`;
    const keywords = [
      'class 11 biology online test',
      'class 11 chemistry online test',
      'class 11 maths online test',
      'class 11 physics online test',
      'class 11 history online test',
      'class 11 geography online test',
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
