import React from 'react';
import type { Metadata } from 'next';
import BookPage from '@/features/BookPage';

const data = {
  title: 'Books – All Classes | GrowLearnHub',
  description:
    'Browse class-wise books for Class 9, 10, 11, and 12. Find subject-wise textbooks and study materials for exam preparation on GrowLearnHub.',
  keywords: [
    'class 9 books',
    'class 10 books',
    'class 11 books',
    'class 12 books',
    'class wise books',
    'textbooks',
    'study materials',
    'subject wise books',
    'growlearnhub books',
  ],
  image: '/book_point.webp',
  canonical: '/book-point/',
  url: 'https://growlearnhub.com/book-point/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <BookPage title={data.title} image={data.image} canonical={data.canonical} url={data.url} />
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
