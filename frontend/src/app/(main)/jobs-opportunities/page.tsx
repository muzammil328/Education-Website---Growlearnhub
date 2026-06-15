import React from 'react';
import type { Metadata } from 'next';
import UserLayout from '@/components/elements/wrapper/SimpleWrapper';
import { Heading2, Para } from '@muzammil328/ui';

const data = {
  title: 'Jobs & Opportunities | GrowLearnHub',
  description:
    'Explore job listings and career opportunities for Pakistani students and graduates on GrowLearnHub.',
  image: '/jobs_opportunities.webp',
  keywords: ['growlearnhub jobs', 'jobs opportunities pakistan', 'student jobs'],
  canonical: '/jobs-opportunities/',
  url: 'https://growlearnhub.com/jobs-opportunities/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <span className="mb-4 text-6xl">🚧</span>
        <Heading2 className="mb-3 text-3xl font-extrabold text-foreground">Coming Soon</Heading2>
        <Para className="max-w-md text-base text-muted-foreground">
          We&apos;re working on bringing you the best job listings and career opportunities for
          Pakistani students. Check back soon!
        </Para>
      </section>
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
    images: [{ url: data.image, alt: data.title }],
  },
  alternates: { canonical: data.canonical },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: { index: data.index, follow: data.follow },
  },
  twitter: {
    title: data.title,
    description: data.description,
    images: { url: data.image, alt: data.title },
  },
};
