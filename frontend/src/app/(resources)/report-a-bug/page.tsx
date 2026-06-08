import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import ReportBugForm from '@/components/forms/ReportBugForm';

const data = {
  title: 'Report a Bug | GrowLearnHub',
  description:
    'Report technical issues on GrowLearnHub and help us fix bugs in MCQs, notes, online tests, and class-wise learning pages.',
  image: '/single/report_bug.webp',
  keywords: ['growlearnhub', 'growlearnhub report bug', 'report bug'],
  canonical: '/report-a-bug/',
  url: 'https://growlearnhub.com/report-a-bug/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <ReportBugForm />
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
