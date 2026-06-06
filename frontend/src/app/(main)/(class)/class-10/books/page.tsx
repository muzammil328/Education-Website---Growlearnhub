import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class10BookPage from '@/features/Class10Page/Class10BookPage';

const CLASS_DISPLAY = '10';

const data = {
  title: `Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 10th Class Textbooks`,
  description: `Download free Class ${CLASS_DISPLAY} books in PDF format with subject-wise coverage. Access Biology, Chemistry, Physics, Math, English, Urdu, Computer Science, and more for exam preparation.`,
  keywords: [
    'Class 10 books',
    '10th class textbooks',
    'Class 10 free PDF books',
    '10th class study guides',
    'GrowLearnHub Class 10 books',
    'Class 10 subject-wise books',
    'Download Class 10 textbooks',
    'Class 10 Biology book pdf',
    'Class 10 Physics book pdf',
    'Class 10 Chemistry book pdf',
    'Class 10 Math book pdf',
    'Punjab board class 10 books',
  ],
  image: '/10th/class_10_book.webp',
  canonical: '/class-10/books/',
  url: 'https://growlearnhub.com/class-10/books/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default function Page() {
  return <Class10BookPage />;
}
