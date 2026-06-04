import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import DisclaimerContent from '@/features/ResourcesPage/DisclaimerContent';

const data = {
  title: 'Disclaimer | GrowLearnHub',
  description:
    'Read the GrowLearnHub disclaimer to understand content limitations, informational use, and responsibilities when using our education resources.',
  image: '/single/disclaimer.webp',
  keywords: ['growlearnhub', 'growlearnhub disclaimer', 'disclaimer'],
  canonical: '/disclaimer/',
  url: 'https://growlearnhub.com/disclaimer/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <DisclaimerContent />
    </UserLayout>
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
