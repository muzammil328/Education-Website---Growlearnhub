import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import VU from '@/features/Classes/VU';

export const metadata: Metadata = generatePageMetadata({
  title: 'Virtual University Study Resources | Notes, MCQs, Past Papers & Exam Guides',
  description:
    'Free Virtual University (VU) study resources including lecture notes, chapter-wise MCQs, past papers, midterm & final term exam guides for all semesters.',
  image: '/vu.webp',
  keywords: [
    // Primary
    'Virtual University study resources',
    'VU notes',
    'VU MCQs',
    'VU past papers',
    'VU online test',

    // Resource-specific
    'VU handouts',
    'VU midterm MCQs',
    'VU final term MCQs',
    'VU midterm past papers',
    'VU final term past papers',
    'VU lecture notes',
    'VU study tips',

    // Course-specific
    'VU CS notes',
    'VU business courses',
    'VU assignment help',
    'VU quiz preparation',
    'VU exam guide',

    // Branded
    'GrowLearnHub VU',
  ],
  canonical: '/vu/',
  index: true,
  follow: true,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Virtual University Study Resources',
  url: 'https://growlearnhub.com/vu/',
  description:
    'Free Virtual University (VU) study resources including lecture notes, chapter-wise MCQs, past papers, and exam guides for Pakistani students.',
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
      <VU />
    </>
  );
}