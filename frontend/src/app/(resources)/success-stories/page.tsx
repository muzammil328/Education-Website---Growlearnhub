import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import ShareStoryButton from './_components/ShareStoryButton';

const data = {
  title: 'Success Stories | GrowLearnHub',
  description:
    'Read real student success stories and exam improvement journeys from GrowLearnHub users across Matric and Intermediate classes.',
  image: '/single/success_stories.webp',
  keywords: ['growlearnhub', 'growlearnhub success stories', 'success stories'],
  canonical: '/success-stories/',
  url: 'https://growlearnhub.com/success-stories/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <div className="mt-16 text-center">
          <h3>
            Share Your Story
          </h3>
          <p>
            Have you achieved academic success using Growlearnhub? We&apos;d love to hear from you!
          </p>
          <div className="mt-6">
            <ShareStoryButton />
          </div>
        </div>
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
