import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class9BookPage from '@/features/Books/Class9';

const CLASS_DISPLAY = '9';

const data = {
  title: `Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 9th Class Textbooks`,
  description: `Download free Class ${CLASS_DISPLAY} books in PDF format with subject-wise coverage. Access Biology, Chemistry, Physics, Math, English, Urdu, Computer Science, and more for exam preparation.`,
  keywords: [
    'Class 9 books',
    '9th class textbooks',
    'Class 9 free PDF books',
    '9th class study guides',
    'GrowLearnHub Class 9 books',
    'Class 9 subject-wise books',
    'Download Class 9 textbooks',
    'Class 9 Biology book pdf',
    'Class 9 Physics book pdf',
    'Class 9 Chemistry book pdf',
    'Class 9 Math book pdf',
    'Punjab board class 9 books',
  ],
  image: '/9th/class_9_book.webp',
  canonical: '/class-9/books/',
  url: 'https://growlearnhub.com/class-9/books/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default function Page() {
  return <Class9BookPage />;
}
