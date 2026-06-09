import React from 'react';
import type { Metadata } from 'next';
import McqsPage from '@/features/McqsPage';

const data = {
  title: 'MCQs – All Classes | GrowLearnHub',
  description:
    'Browse class-wise MCQs for multiple subjects and chapters. Practice objective questions for better concept clarity and exam preparation on GrowLearnHub.',
  keywords: [
    'mcqs all classes',
    'class 9 mcqs',
    'class 10 mcqs',
    'class 11 mcqs',
    'class 12 mcqs',
    'chapter-wise mcqs',
    'free mcq practice',
    'objective questions',
    'exam preparation mcqs',
    'growlearnhub mcqs',
    'biology chemistry physics mcqs',
  ],
  image: '/mcqs.webp',
  canonical: '/mcqs/',
  url: 'https://growlearnhub.com/mcqs/',
  index: true,
  follow: true,
};

export default async function Page() {
  return (
    <McqsPage title={data.title} image={data.image} canonical={data.canonical} url={data.url} />
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
