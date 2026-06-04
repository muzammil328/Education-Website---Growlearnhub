import React from 'react';
import type { Metadata } from 'next';
import PastPaperPage from '@/features/PastPaperPage';

const data = {
  title: 'Past Papers – All Classes | GrowLearnHub',
  description:
    'Browse class-wise past papers for Matric, Intermediate, and other academic levels. Find subject-wise past paper sections to support smarter exam preparation on GrowLearnHub.',
  keywords: [
    'past papers all classes',
    '9th class past papers',
    '10th class past papers',
    '11th class past papers',
    '12th class past papers',
    'intermediate past papers',
    'board past papers',
    'class wise past papers',
    'growlearnhub past papers',
    'past paper preparation',
  ],
  image: '/past_paper/class_9_past_paper.webp',
  canonical: '/past-paper/',
  url: 'https://growlearnhub.com/past-paper/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <PastPaperPage
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
