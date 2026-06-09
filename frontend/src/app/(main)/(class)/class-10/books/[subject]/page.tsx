import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import SubjectClass10Book from '@/features/Books/Class10/Subject';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const bookName = removeDashAndUppercase(subject);
  return generatePageMetadata({
    title: `${bookName} Class 10 Book PDF | Punjab Board`,
    description: `${bookName} Class 10 textbook with English and Urdu medium PDF download. Browse chapter-wise PDFs for SSC-II board exam preparation.`,
    canonical: `/class-10/books/${subject}/`,
    keywords: [
      `${bookName.toLowerCase()} class 10 book pdf`,
      `class 10 ${bookName.toLowerCase()} textbook`,
      'class 10 books pdf download',
      'growlearnhub class 10 books',
    ],
    image: '/10th/class_10_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SubjectClass10Book bookSlug={subject} />;
}
