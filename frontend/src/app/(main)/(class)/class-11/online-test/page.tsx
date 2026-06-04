import type { Metadata } from 'next';
import ClassOnlineTestPage from '@/features/OnlineTestPage/Class9';

const data = {
  title: 'Class 11 Online Tests – Free Chapter-wise Practice | GrowLearnHub',
  description:
    'Take free Class 11 online tests chapter-wise. Practice Biology, Chemistry and Physics with instant scoring, detailed feedback, and performance tracking.',
  keywords: [
    'class 11 online test',
    'class 11 chapter wise test',
    'class 11 biology online test',
    'class 11 chemistry online test',
    'class 11 physics online test',
    'free class 11 quiz',
    'class 11 practice exam',
    'class 11 timed test',
    'growlearnhub class 11',
  ],
  image: '/online_test.webp',
  canonical: '/class-11/online-test/',
  url: 'https://growlearnhub.com/class-11/online-test/',
  index: true,
  follow: true,
  className: 'class-11',
  classNumber: '11',
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
  return <ClassOnlineTestPage data={data} />;
}
