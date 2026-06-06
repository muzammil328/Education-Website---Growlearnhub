import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class12BookPage from '@/features/Books/Class12';

const CLASS_DISPLAY = '12';

const data = {
  title: `Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 12th Class Textbooks`,
  description: `Download free Class ${CLASS_DISPLAY} books in PDF format with subject-wise coverage. Access Biology, Chemistry, Physics, Math, English, Urdu, Computer Science, and more for exam preparation.`,
  keywords: [
    'Class 12 books',
    '12th class textbooks',
    'Class 12 free PDF books',
    '12th class study guides',
    'GrowLearnHub Class 12 books',
    'Class 12 subject-wise books',
    'Download Class 12 textbooks',
    'Class 12 Biology book pdf',
    'Class 12 Physics book pdf',
    'Class 12 Chemistry book pdf',
    'Class 12 Math book pdf',
    'Punjab board class 12 books',
  ],
  image: '/12th/class_12_book.webp',
  canonical: '/class-12/books/',
  url: 'https://growlearnhub.com/class-12/books/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default function Page() {
  return <Class12BookPage />;
}
