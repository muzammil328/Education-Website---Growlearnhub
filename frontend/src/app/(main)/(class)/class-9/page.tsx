import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class9 from '@/features/Classes/Class9';

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 9 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Free Class 9 notes, chapter-wise MCQs, online tests, past papers and date sheets for Punjab, Federal & BISE boards. Smart exam prep starts here.',
  image: '/class_9_growlearnhub.png',
  keywords: [
    // Primary
    '9th class notes',
    'Class 9 MCQs',
    'Class 9 past papers',
    'Class 9 online test',
    'Class 9 study material',

    // Subject-specific
    'Class 9 Biology notes',
    'Class 9 Physics notes',
    'Class 9 Chemistry notes',
    'Class 9 Math notes',
    'Class 9 English notes',
    'Class 9 Urdu notes',
    'Class 9 Islamiyat notes',
    'Class 9 Pak Studies notes',
    'Class 9 Computer Science notes',

    // Board-specific
    'Punjab board 9th class notes',
    'Federal board Class 9 notes',
    'BISE Class 9 past papers',
    '9th class date sheet Punjab',

    // Resource-specific
    '9th class MCQs chapter wise',
    'Class 9 guess papers',
    'Class 9 short questions',
    'Class 9 long questions',

    // Branded
    'GrowLearnHub Class 9',
  ],
  canonical: '/class-9/',
  index: true,
  follow: true,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Class 9 Study Resources',
  url: 'https://growlearnhub.com/class-9/',
  description:
    'Free Class 9 notes, MCQs, online tests, past papers, date sheets and results for Pakistani students.',
  educationalLevel: 'Grade 9',
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
      <Class9 />
    </>
  );
}
