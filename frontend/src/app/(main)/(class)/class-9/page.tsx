import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class9 from '@/features/Classes/Class9';

export const revalidate = 604800;

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 9 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Access Class 9 notes, chapter-wise MCQs, online tests, past papers, date sheets, and result updates for smart exam preparation.',
  image: '/class_9_growlearnhub.png',
  keywords: [
    'Class 9 study material',
    '9th class notes',
    'Class 9 MCQs',
    'Class 9 online test',
    '9th class past papers',
    'Class 9 books',
    'GrowLearnHub Class 9',
  ],
  canonical: '/class-9/',
  url: 'https://growlearnhub.com/class-9/',
  index: true,
  follow: true,
});

export default function Page() {
  return <Class9 />;
}