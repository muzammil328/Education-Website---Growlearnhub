import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import SuccessStoriesContent from '@/features/ResourcesPage/SuccessStoriesContent';

const data = {
  title: 'Success Stories | GrowLearnHub',
  description:
    'Read real student success stories and exam improvement journeys from GrowLearnHub users across Matric and Intermediate classes.',
  image: '/single/success_stories.webp',
  keywords: ['growlearnhub', 'growlearnhub success stories', 'success stories'],
  canonical: '/success-stories/',
  url: 'https://growlearnhub.com/success-stories/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <SuccessStoriesContent />
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
