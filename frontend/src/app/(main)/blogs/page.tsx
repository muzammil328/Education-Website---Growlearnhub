import React from 'react';
import type { Metadata } from 'next';
import BlogPage from '@/features/BlogPage';

const data = {
  title: 'Blog - GrowLearnHub | Study Tips & Educational Articles',
  description:
    'Read the latest study tips, exam preparation strategies, and educational insights on the GrowLearnHub blog. Improve your learning with expert advice.',
  keywords: [
    'study tips',
    'exam preparation',
    'student blog',
    'education articles',
    'study strategies',
    'growlearnhub blog',
  ],
  image: '/blog-cover.webp',
  canonical: '/blogs/',
  url: 'https://growlearnhub.com/blogs/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <BlogPage title={data.title} image={data.image} canonical={data.canonical} url={data.url} />
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
    type: 'website',
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
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.image],
  },
};
