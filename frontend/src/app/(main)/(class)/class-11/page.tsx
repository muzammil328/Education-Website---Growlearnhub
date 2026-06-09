import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class11 from '@/features/Classes/Class11';

export const revalidate = 604800;

export const metadata: Metadata = generatePageMetadata({
  title: 'Class 11 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Free Class 11 notes, chapter-wise MCQs, online tests, past papers and date sheets for Punjab, Federal & BISE boards. Smart exam prep starts here.',
  image: '/class_11_growlearnhub.png',
  keywords: [
    // Primary
    '11th class notes',
    'Class 11 MCQs',
    'Class 11 past papers',
    'Class 11 online test',
    'Class 11 study material',

    // Subject-specific
    'Class 11 Biology notes',
    'Class 11 Physics notes',
    'Class 11 Chemistry notes',
    'Class 11 Math notes',
    'Class 11 English notes',
    'Class 11 Urdu notes',
    'Class 11 Islamiyat notes',
    'Class 11 Pak Studies notes',
    'Class 11 Computer Science notes',

    // Board-specific
    'Punjab board 11th class notes',
    'Federal board Class 11 notes',
    'BISE Class 11 past papers',
    '11th class date sheet Punjab',

    // Resource-specific
    '11th class MCQs chapter wise',
    'Class 11 guess papers',
    'Class 11 short questions',
    'Class 11 long questions',

    // Branded
    'GrowLearnHub Class 11',
  ],
  canonical: '/class-11/',
  index: true,
  follow: true,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Class 11 Study Resources',
  url: 'https://growlearnhub.com/class-11/',
  description:
    'Free Class 11 notes, MCQs, online tests, past papers, date sheets and results for Pakistani students.',
  educationalLevel: 'Grade 11',
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
      <Class11 />
    </>
  );
}