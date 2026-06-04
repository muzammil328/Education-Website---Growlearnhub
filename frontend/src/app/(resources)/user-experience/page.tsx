import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import UserExperienceContent from '@/features/ResourcesPage/UserExperienceContent';

const data = {
  title: 'User Experience | GrowLearnHub',
  description:
    'Explore the GrowLearnHub user experience and see how our platform is designed for simple, fast, and effective learning workflows.',
  image: '/single/user_experience.webp',
  keywords: ['growlearnhub', 'growlearnhub user experience', 'user experience'],
  canonical: '/user-experience/',
  url: 'https://growlearnhub.com/user-experience/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <UserExperienceContent />
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
