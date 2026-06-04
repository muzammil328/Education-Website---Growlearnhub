import React from 'react';
import type { Metadata } from 'next';
import PairingSchemePage from '@/features/PairingSchemePage';

const data = {
  title: 'Pairing Schemes – All Classes | GrowLearnHub',
  description:
    'Browse class-wise pairing schemes for Matric, Intermediate, and other academic levels. Find subject-wise pairing scheme sections to support smarter exam preparation on GrowLearnHub.',
  image: '/pairing-scheme-all-classes-growlearnhub.webp',
  keywords: [
    'pairing scheme all classes',
    'class 9 pairing scheme',
    'class 10 pairing scheme',
    '11th class pairing scheme',
    '12th class pairing scheme',
    'intermediate pairing scheme',
    'board pairing schemes',
    'class wise pairing schemes',
    'growlearnhub pairing scheme',
    'exam paper pattern',
  ],
  canonical: '/pairing-scheme/',
  url: 'https://growlearnhub.com/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <PairingSchemePage
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
