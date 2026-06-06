import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class12Page from '@/features/Classes/Class12';

export const revalidate = 604800;

const data = {
  title: 'Class 12 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Access Class 12 notes, chapter-wise MCQs, online tests, past papers, date sheets, and result updates for smart exam preparation.',
  image: '/class_12_growlearnhub.png',
  keywords: [
    'Class 12 study material',
    '12th class notes',
    'Class 12 MCQs',
    'Class 12 online test',
    '12th class past papers',
    'Class 12 books',
    'GrowLearnHub Class 12',
  ],
  canonical: '/class-12/',
  url: 'https://growlearnhub.com/class-12/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default async function Page() {
  return (
    <Class12Page
      title={data.title}
      image={data.image}
      canonical={data.canonical}
      url={data.url}
    />
  );
}
