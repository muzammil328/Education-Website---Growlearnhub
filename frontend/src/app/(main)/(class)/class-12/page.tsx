import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class12 from '@/features/Classes/Class12';

export const revalidate = 604800;

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 12 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Free Class 12 notes, chapter-wise MCQs, online tests, past papers and date sheets for Punjab, Federal & BISE boards. Smart exam prep starts here.',
  image: '/class_12_growlearnhub.png',
  keywords: [
    // Primary
    '12th class notes',
    'Class 12 MCQs',
    'Class 12 past papers',
    'Class 12 online test',
    'Class 12 study material',

    // Subject-specific
    'Class 12 Biology notes',
    'Class 12 Physics notes',
    'Class 12 Chemistry notes',
    'Class 12 Math notes',
    'Class 12 English notes',
    'Class 12 Urdu notes',
    'Class 12 Islamiyat notes',
    'Class 12 Pak Studies notes',
    'Class 12 Computer Science notes',

    // Board-specific
    'Punjab board 12th class notes',
    'Federal board Class 12 notes',
    'BISE Class 12 past papers',
    '12th class date sheet Punjab',

    // Resource-specific
    '12th class MCQs chapter wise',
    'Class 12 guess papers',
    'Class 12 short questions',
    'Class 12 long questions',

    // Branded
    'GrowLearnHub Class 12',
  ],
  canonical: '/class-12/',
  index: true,
  follow: true,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Class 12 Study Resources',
  url: 'https://growlearnhub.com/class-12/',
  description:
    'Free Class 12 notes, MCQs, online tests, past papers, date sheets and results for Pakistani students.',
  educationalLevel: 'Grade 12',
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
      <Class12 />
    </>
  );
}