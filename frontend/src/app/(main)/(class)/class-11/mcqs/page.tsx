import type { Metadata } from 'next';
import Class11McqsPage from '@/features/McqsPage/Class11';

const data = {
  title: 'Class 11 MCQs | Free Interactive Practice Questions | GrowLearnHub',
  description:
    'Browse Class 11 MCQs by subject and chapter. Practice objective questions with answers and keep your revision organized.',
  keywords: [
    'class 11 mcqs',
    '11th class mcqs',
    'class 11 subject wise mcqs',
    'class 11 chapter wise mcqs',
    'growlearnhub class 11 mcqs',
  ],
  image: '/11th/class_11_mcqs.webp',
  canonical: '/class-11/mcqs/',
  url: 'https://growlearnhub.com/class-11/mcqs/',
  index: true,
  follow: true,
};

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

export default function Page() {
  return <Class11McqsPage />;
}
