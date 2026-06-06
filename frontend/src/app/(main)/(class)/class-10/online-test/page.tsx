import type { Metadata } from 'next';
import Class10OnlineTestPage from '@/features/Class10Page/Class10OnlineTestPage';

const data = {
  title: 'Class 10 Online Tests \u2013 Free Chapter-wise Practice | GrowLearnHub',
  description:
    'Take free Class 10 online tests chapter-wise. Practice Biology, Chemistry and Physics with instant scoring, detailed feedback, and performance tracking.',
  keywords: [
    'class 10 online test',
    'class 10 chapter wise test',
    'class 10 biology online test',
    'class 10 chemistry online test',
    'class 10 physics online test',
    'free class 10 quiz',
    'class 10 practice exam',
    'class 10 timed test',
    'growlearnhub class 10',
  ],
  image: '/online_test.webp',
  canonical: '/class-10/online-test/',
  url: 'https://growlearnhub.com/class-10/online-test/',
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
  return <Class10OnlineTestPage />;
}
