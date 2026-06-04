import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { vuData } from '@/utils/helpers/VU';

const data = {
  title: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub',
  description:
    'Boost your Virtual University (VU) success with GrowLearnHub: concise lecture notes, targeted exam guides, practice quizzes, and expert study strategies tailored for VU students.',
  image: '/vu.webp',
  keywords: [
    'Virtual University study resources',
    'VU study tips',
    'Virtual University exam guide',
    'VU practice quizzes',
    'VU lecture notes',
    'GrowLearnHub VU',
  ],
  canonical: '/vu/',
  url: 'https://growlearnhub.com/vu/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {vuData.map(data => {
          return <CardSmall key={data.name} title={data.name} link={`vu/${data.slug}`} />;
        })}
      </div>
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
