import type { Metadata } from 'next';
import ClassMcqsPage from '@/features/McqsPage/Class';
import { config } from '@/config';

const data = {
  title: 'Class 9 MCQs | Free Interactive Practice Questions | GrowLearnHub',
  description:
    'Browse Class 9 MCQs by subject and chapter. Practice objective questions with answers and keep your revision organized.',
  keywords: [
    'class 9 mcqs',
    '9th class mcqs',
    'class 9 subject wise mcqs',
    'class 9 chapter wise mcqs',
    'growlearnhub class 9 mcqs',
  ],
  image: '/9th/class_9_mcqs.webp',
  canonical: '/class-9/mcqs/',
  url: 'https://growlearnhub.com/class-9/mcqs/',
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

export const revalidate = 432000;

export default async function Page() {
  return (
    <ClassMcqsPage
      title={data.title}
      image={data.image}
      canonical={data.canonical}
      url={data.url}
      classSlug="class-9"
      className="class-9"
      heading="Class 9 MCQs - Subject-wise Practice"
      intro="Practice Class 9 MCQs by subject, then move into chapter and topic-level practice with the dedicated server-rendered routes."
      emptyMessage="No subjects found for Class 9."
    />
  );
}
