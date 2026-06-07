import { Metadata } from 'next';
import VU from '@/features/Classes/VU';

export const metadata: Metadata = {
  title: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub',
  description:
    'Boost your Virtual University (VU) success with GrowLearnHub: concise lecture notes, targeted exam guides, practice quizzes, and expert study strategies tailored for VU students.',
  keywords: [
    'Virtual University study resources',
    'VU study tips',
    'Virtual University exam guide',
    'VU practice quizzes',
    'VU lecture notes',
    'GrowLearnHub VU',
  ],
  openGraph: {
    title: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub',
    description:
      'Boost your Virtual University (VU) success with GrowLearnHub: concise lecture notes, targeted exam guides, practice quizzes, and expert study strategies tailored for VU students.',
    url: 'https://growlearnhub.com/vu/',
    images: [{ url: '/vu.webp', alt: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub' }],
  },
  alternates: { canonical: '/vu/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  twitter: {
    title: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub',
    description:
      'Boost your Virtual University (VU) success with GrowLearnHub: concise lecture notes, targeted exam guides, practice quizzes, and expert study strategies tailored for VU students.',
    images: { url: '/vu.webp', alt: 'Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub' },
  },
};

export default function Page() {
  return <VU />;
}