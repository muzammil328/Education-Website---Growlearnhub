import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Class11BookPage from '@/features/Books/Class11';

const CLASS_DISPLAY = '11';

const data = {
  title: `Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 11th Class Textbooks`,
  description: `Download free Class ${CLASS_DISPLAY} books in PDF format with subject-wise coverage. Access Biology, Chemistry, Physics, Math, English, Urdu, Computer Science, and more for exam preparation.`,
  keywords: [
    'Class 11 books',
    '11th class textbooks',
    'Class 11 free PDF books',
    '11th class study guides',
    'GrowLearnHub Class 11 books',
    'Class 11 subject-wise books',
    'Download Class 11 textbooks',
    'Class 11 Biology book pdf',
    'Class 11 Physics book pdf',
    'Class 11 Chemistry book pdf',
    'Class 11 Math book pdf',
    'Punjab board class 11 books',
  ],
  image: '/11th/class_11_book.webp',
  canonical: '/class-11/books/',
  url: 'https://growlearnhub.com/class-11/books/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default function Page() {
  return <Class11BookPage />;
}
