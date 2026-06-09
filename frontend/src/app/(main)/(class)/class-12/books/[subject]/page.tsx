import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import SubjectClass12Book from '@/features/Books/Class12/Subject';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const bookName = removeDashAndUppercase(subject);
  return generatePageMetadata({
    title: `${bookName} Class 12 Book PDF | Punjab Board`,
    description: `${bookName} Class 12 textbook with English and Urdu medium PDF download. Browse chapter-wise PDFs for HSC-II inter-part 2 board exam preparation.`,
    canonical: `/class-12/books/${subject}/`,
    keywords: [
      `${bookName.toLowerCase()} class 12 book pdf`,
      `class 12 ${bookName.toLowerCase()} textbook`,
      'class 12 books pdf download',
      'growlearnhub class 12 books',
    ],
    image: '/12th/class_12_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SubjectClass12Book bookSlug={subject} />;
}
