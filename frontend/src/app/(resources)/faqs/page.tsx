import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import FAQContent from '@/features/ResourcesPage/FAQContent';

const data = {
  title: 'FAQs | GrowLearnHub',
  description:
    'Find answers to common questions about GrowLearnHub, including classes, notes, MCQs, online tests, and account support.',
  keywords: ['growlearnhub', 'growlearnhub faqs', 'faqs'],
  image: '/single/faqs.webp',
  canonical: '/faqs/',
  url: 'https://growlearnhub.com/faqs/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <FAQContent />
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
