import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class11 from '@/features/Classes/Class11';

export const revalidate = 604800;

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 11 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Access Class 11 notes, chapter-wise MCQs, online tests, past papers, date sheets, and result updates for smart exam preparation.',
  image: '/class_11_growlearnhub.png',
  keywords: [
    'Class 11 study material',
    '11th class notes',
    'Class 11 MCQs',
    'Class 11 online test',
    '11th class past papers',
    'Class 11 books',
    'GrowLearnHub Class 11',
  ],
  canonical: '/class-11/',
  url: 'https://growlearnhub.com/class-11/',
  index: true,
  follow: true,
});

export default function Page() {
  return <Class11 />;
}