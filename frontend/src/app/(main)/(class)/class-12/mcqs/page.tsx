import type { Metadata } from 'next';
import Class12McqsPage from '@/features/McqsPage/Class12';

const data = {
  title: 'Class 12 MCQs | Free Interactive Practice Questions | GrowLearnHub',
  description:
    'Browse Class 12 MCQs by subject and chapter. Practice objective questions with answers and keep your revision organized.',
  keywords: [
    'class 12 mcqs',
    '12th class mcqs',
    'class 12 subject wise mcqs',
    'class 12 chapter wise mcqs',
    'growlearnhub class 12 mcqs',
  ],
  image: '/12th/class_12_mcqs.webp',
  canonical: '/class-12/mcqs/',
  url: 'https://growlearnhub.com/class-12/mcqs/',
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
  return <Class12McqsPage />;
}
