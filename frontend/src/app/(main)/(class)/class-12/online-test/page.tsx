import type { Metadata } from 'next';
import Class12OnlineTestPage from '@/features/OnlineTest/Class12';

const data = {
  title: 'Class 12 Online Tests \u2013 Free Chapter-wise Practice | GrowLearnHub',
  description:
    'Take free Class 12 online tests chapter-wise. Practice Biology, Chemistry and Physics with instant scoring, detailed feedback, and performance tracking.',
  keywords: [
    'class 12 online test',
    'class 12 chapter wise test',
    'class 12 biology online test',
    'class 12 chemistry online test',
    'class 12 physics online test',
    'free class 12 quiz',
    'class 12 practice exam',
    'class 12 timed test',
    'growlearnhub class 12',
  ],
  image: '/online_test.webp',
  canonical: '/class-12/online-test/',
  url: 'https://growlearnhub.com/class-12/online-test/',
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
  return <Class12OnlineTestPage />;
}
