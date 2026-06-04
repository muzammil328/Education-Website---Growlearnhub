import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import AboutContent from '@/features/ResourcesPage/AboutContent';

const data = {
  title: 'About Us | GrowLearnHub',
  description:
    'Learn about GrowLearnHub, our mission to support students, parents, and teachers with quality study resources, MCQs, notes, and online test preparation.',
  image: '/single/about_us.webp',
  keywords: ['growlearnhub', 'growlearnhub about us', 'about us'],
  canonical: '/about-us/',
  url: 'https://growlearnhub.com/about-us/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <AboutContent />
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
