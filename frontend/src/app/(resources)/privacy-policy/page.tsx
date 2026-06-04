import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import PrivacyPolicyContent from '@/features/ResourcesPage/PrivacyPolicyContent';

const data = {
  title: 'Privacy Policy | GrowLearnHub',
  description:
    'Read the GrowLearnHub privacy policy to learn how we collect, use, and protect your personal information on our platform.',
  image: '/single/privacy_policy.webp',
  keywords: ['growlearnhub', 'growlearnhub privacy policy', 'privacy policy'],
  canonical: '/privacy-policy/',
  url: 'https://growlearnhub.com/privacy-policy/',
  index: false,
  follow: false,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <PrivacyPolicyContent />
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
