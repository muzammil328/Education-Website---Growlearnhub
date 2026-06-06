import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class10Page from '@/features/Classes/Class10';

export const revalidate = 604800;

const data = {
  title: 'Class 10 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Access Class 10 notes, chapter-wise MCQs, online tests, past papers, date sheets, and result updates for smart exam preparation.',
  image: '/class_10_growlearnhub.png',
  keywords: [
    'Class 10 study material',
    '10th class notes',
    'Class 10 MCQs',
    'Class 10 online test',
    '10th class past papers',
    'Class 10 books',
    'GrowLearnHub Class 10',
  ],
  canonical: '/class-10/',
  url: 'https://growlearnhub.com/class-10/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default async function Page() {
  return (
    <Class10Page
      title={data.title}
      image={data.image}
      canonical={data.canonical}
      url={data.url}
    />
  );
}
