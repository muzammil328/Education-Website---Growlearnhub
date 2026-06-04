import React from 'react';
import type { Metadata } from 'next';
import ExploreTopicsPage from '@/features/ExploreTopicsPage';

const data = {
  title: 'Explore Topics | GrowLearnHub',
  description:
    'Explore class-wise and subject-wise study topics on GrowLearnHub, including notes, MCQs, online tests, and exam preparation resources.',
  image: '/explore_topics.webp',
  keywords: ['growlearnhub', 'growlearnhub explore topics', 'explore topics'],
  canonical: '/explore-topics/',
  url: 'https://growlearnhub.com/explore-topics/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <ExploreTopicsPage
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
    title: data.title,
    description: data.description,
    images: {
      url: data.image,
      alt: data.title,
    },
  },
};
