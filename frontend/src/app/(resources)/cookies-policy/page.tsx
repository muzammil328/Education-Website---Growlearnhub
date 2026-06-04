import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import CookiesPolicyContent from '@/features/ResourcesPage/CookiesPolicyContent';

const data = {
  title: 'Cookies Policy | GrowLearnHub',
  description:
    'Review the GrowLearnHub cookies policy to understand how cookies are used to improve performance, analytics, and user experience.',
  image: '/single/cookies_policy.webp',
  keywords: ['growlearnhub', 'growlearnhub cookies policy', 'cookies policy'],
  canonical: '/cookies-policy/',
  url: 'https://growlearnhub.com/cookies-policy/',
  index: false,
  follow: false,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <CookiesPolicyContent />
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
