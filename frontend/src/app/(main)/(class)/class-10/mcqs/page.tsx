import type { Metadata } from 'next';
import Class10McqsPage from '@/features/Class10Page/Class10McqsPage';

const data = {
  title: 'Class 10 MCQs | Free Interactive Practice Questions | GrowLearnHub',
  description:
    'Browse Class 10 MCQs by subject and chapter. Practice objective questions with answers and keep your revision organized.',
  keywords: [
    'class 10 mcqs',
    '10th class mcqs',
    'class 10 subject wise mcqs',
    'class 10 chapter wise mcqs',
    'growlearnhub class 10 mcqs',
  ],
  image: '/10th/class_10_mcqs.webp',
  canonical: '/class-10/mcqs/',
  url: 'https://growlearnhub.com/class-10/mcqs/',
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
  return <Class10McqsPage />;
}
