import React from 'react';
import type { Metadata } from 'next';
import ResultPage from '@/features/Result';

const data = {
  title: 'Results – All Classes | GrowLearnHub',
  description:
    'Browse class-wise exam result pages for Matric, Intermediate, and other academic levels in Pakistan. Find organized result information and access the relevant result section quickly on GrowLearnHub.',
  image: '/result-all-classes-growlearnhub.png',
  keywords: [
    'growlearnhub result',
    'all classes result',
    'matric result',
    'intermediate result',
    'ssc result',
    'hssc result',
    'board result online',
    'pakistan exam results',
    'class wise results',
    'result updates',
  ],
  canonical: '/result/',
  url: 'https://growlearnhub.com/result/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <ResultPage title={data.title} image={data.image} canonical={data.canonical} url={data.url} />
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
