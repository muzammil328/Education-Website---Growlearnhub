import React from 'react';
import type { Metadata } from 'next';
import DateSheetPage from '@/features/DateSheet';

const data = {
  title: 'Date Sheets – All Classes | GrowLearnHub',
  description:
    'Browse class-wise date sheets for Matric, Intermediate, and other academic levels. Find organized exam schedule information to plan your preparation on GrowLearnHub.',
  keywords: [
    'date sheet all classes',
    'class 9 date sheet',
    'class 10 date sheet',
    'class 11 date sheet',
    'class 12 date sheet',
    'board date sheet',
    'exam schedule',
    'class wise date sheets',
    'growlearnhub date sheet',
  ],
  image: '/date-sheet-all-classes-growlearnhub.webp',
  canonical: '/date-sheet/',
  url: 'https://growlearnhub.com/date-sheet/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <DateSheetPage
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
