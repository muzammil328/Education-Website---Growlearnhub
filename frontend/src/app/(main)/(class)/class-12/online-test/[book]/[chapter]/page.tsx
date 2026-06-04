import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import React from 'react';
import { config } from '@/config';

interface McqsBookChapter {
  chapter: string;
  book: string;
}

interface PageProps {
  params: Promise<McqsBookChapter>;
}

const image = '/12th/class_12_online_test.webp';

export default async function page({ params }: PageProps) {
  const { book, chapter } = await params;
  const slug1 = book;
  const slug2 = chapter;
  const SlugRemoveDashAndUppercase1 = removeDashAndUppercase(slug1);
  const SlugRemoveDashAndUppercase2 = removeDashAndUppercase(slug2);

  return (
    <UserLayout
      data={{
        title: `Class 12 ${SlugRemoveDashAndUppercase1} ${SlugRemoveDashAndUppercase2} Online Test`,
        canonical: `/class-12/online-test/${slug1}/${slug2}`,
        image: image,
        url: `https://growlearnhub.com/class-12/online-test/${slug1}/${slug2}`,
      }}
    >
      {/* <OnlineTestChapterView className="class-12" bookName={slug1} chapterName={slug2} /> */}
    </UserLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { book, chapter } = await params;
  const slug1 = book;
  const slug2 = chapter;
  const SlugRemoveDashAndUppercase1 = removeDashAndUppercase(slug1);
  const SlugRemoveDashAndUppercase2 = removeDashAndUppercase(slug2);

  const url = `${config.SITE_URL ?? ''}/class-12/online-test/${slug1}/${slug2}/`;
  const canonical = `/class-12/online-test/${slug1}/${slug2}/`;

  try {
    const title = `Class 12 ${SlugRemoveDashAndUppercase1} ${SlugRemoveDashAndUppercase2} Online Test`;
    const description = `Class 12 ${SlugRemoveDashAndUppercase1} ${SlugRemoveDashAndUppercase2} Online Test page offering a wide range of practice questions, online tests, and detailed answers for thorough exam preparation.`;
    const keywords = [
      'class 12 biology online test',
      'class 12 chemistry online test',
      'class 12 maths online test',
      'class 12 physics online test',
      'class 12 history online test',
      'class 12 geography online test',
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
