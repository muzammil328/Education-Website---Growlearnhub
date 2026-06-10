import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class10 from '@/features/Classes/Class10';

export const revalidate = 259200; // 3 days

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 10 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Free Class 10 notes, chapter-wise MCQs, online tests, past papers and date sheets for Punjab, Federal & BISE boards. Smart exam prep starts here.',
  image: '/class_10_growlearnhub.png',
  keywords: [
    // Primary
    '10th class notes',
    'Class 10 MCQs',
    'Class 10 past papers',
    'Class 10 online test',
    'Class 10 study material',

    // Subject-specific
    'Class 10 Biology notes',
    'Class 10 Physics notes',
    'Class 10 Chemistry notes',
    'Class 10 Math notes',
    'Class 10 English notes',
    'Class 10 Urdu notes',
    'Class 10 Islamiyat notes',
    'Class 10 Pak Studies notes',
    'Class 10 Computer Science notes',

    // Board-specific
    'Punjab board 10th class notes',
    'Federal board Class 10 notes',
    'BISE Class 10 past papers',
    '10th class date sheet Punjab',

    // Resource-specific
    '10th class MCQs chapter wise',
    'Class 10 guess papers',
    'Class 10 short questions',
    'Class 10 long questions',

    // Branded
    'GrowLearnHub Class 10',
  ],
  canonical: '/class-10/',
  index: true,
  follow: true,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Class 10 Study Resources',
  url: 'https://growlearnhub.com/class-10/',
  description:
    'Free Class 10 notes, MCQs, online tests, past papers, date sheets and results for Pakistani students.',
  educationalLevel: 'Grade 10',
  provider: {
    '@type': 'Organization',
    name: 'GrowLearnHub',
    url: 'https://growlearnhub.com',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Class10 />
    </>
  );
}