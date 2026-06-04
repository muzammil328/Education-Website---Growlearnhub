import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import StudyGroupContent from '@/features/ResourcesPage/StudyGroupContent';

const data = {
  title: 'Study Group | GrowLearnHub',
  description:
    'Join the GrowLearnHub study group to learn with peers, discuss concepts, and stay consistent with class-wise exam preparation.',
  image: '/single/study_group.webp',
  keywords: ['growlearnhub', 'growlearnhub study group', 'study group'],
  canonical: '/study-group/',
  url: 'https://growlearnhub.com/study-group/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <StudyGroupContent />
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
