import React from 'react';
import type { Metadata } from 'next';
import OnlineTestPage from '@/features/OnlineTest';

const data = {
  title: 'Online Tests – All Classes | GrowLearnHub',
  description:
    'Take interactive online tests for multiple classes and subjects. Practice with chapter-wise quizzes, instant feedback, and exam-focused learning on GrowLearnHub.',
  keywords: [
    'online tests all classes',
    'class 9 online test',
    'class 10 online test',
    'class 11 online test',
    'class 12 online test',
    'free online quizzes',
    'practice exams',
    'timed tests',
    'instant feedback',
    'online test preparation',
    'growlearnhub tests',
  ],
  image: '/online_test.webp',
  canonical: '/online-test/',
  url: 'https://growlearnhub.com/online-test/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <OnlineTestPage
      title={data.title}
      image={data.image}
      canonical={data.canonical}
      url={data.url}
    />
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    type: 'website',
    images: [
      {
        url: data.image,
        alt: data.title,
      },
    ],
  },
  alternates: {
    canonical: data.canonical,
  },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: {
      index: data.index,
      follow: data.follow,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.image],
  },
};
