import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import RequestFeatureForm from '@/components/forms/RequestFeatureForm';

const data = {
  title: 'Request a Feature | GrowLearnHub',
  description:
    'Share your feature request with GrowLearnHub and help us improve MCQs, notes, online tests, and learning tools for students.',
  image: '/single/request_failure.webp',
  keywords: ['growlearnhub', 'request feature', 'feature request', 'education platform feedback'],
  canonical: '/request-feature/',
  url: 'https://growlearnhub.com/request-feature/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <RequestFeatureForm />
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
