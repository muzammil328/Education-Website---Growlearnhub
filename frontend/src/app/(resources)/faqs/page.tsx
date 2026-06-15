import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import FAQ from './_components/FAQ';
import { Heading2, Para } from '@muzammil328/ui';

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

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <div className="mx-auto max-w-2xl text-center">
        <Heading2>
          Frequently Asked Questions
        </Heading2>
        <Para>
          Find answers to common questions about Growlearnhub.
        </Para>
      </div>
      <FAQ />
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
