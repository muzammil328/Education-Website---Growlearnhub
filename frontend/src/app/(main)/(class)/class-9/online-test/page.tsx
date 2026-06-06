import type { Metadata } from 'next';
import Class9OnlineTestPage from '@/features/OnlineTest/Class9';

const data = {
  title: 'Class 9 Online Tests – Free Chapter-wise Practice | GrowLearnHub',
  description:
    'Take free Class 9 online tests chapter-wise. Practice Biology, Chemistry and Physics with instant scoring, detailed feedback, and performance tracking.',
  keywords: [
    'class 9 online test',
    'class 9 chapter wise test',
    'class 9 biology online test',
    'class 9 chemistry online test',
    'class 9 physics online test',
    'free class 9 quiz',
    'class 9 practice exam',
    'class 9 timed test',
    'growlearnhub class 9',
  ],
  image: '/online_test.webp',
  canonical: '/class-9/online-test/',
  url: 'https://growlearnhub.com/class-9/online-test/',
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
  return <Class9OnlineTestPage />;
}
