import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import TermsContent from '@/features/ResourcesPage/TermsContent';

const data = {
  title: 'Terms and Conditions | GrowLearnHub',
  description:
    'Read GrowLearnHub terms and conditions for account usage, content policies, and platform rules before using our educational services.',
  image: '/single/term_and_condition.webp',
  keywords: ['growlearnhub', 'growlearnhub term and condition', 'term and condition'],
  canonical: '/terms-and-conditions/',
  url: 'https://growlearnhub.com/terms-and-conditions/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <TermsContent />
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
