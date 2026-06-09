import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import SubjectClass9Book from '@/features/Books/Class9/Subject';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const bookName = removeDashAndUppercase(subject);
  return generatePageMetadata({
    title: `${bookName} Class 9 Book PDF | Punjab Board`,
    description: `${bookName} Class 9 textbook with English and Urdu medium PDF download. Browse chapter-wise PDFs for board exam preparation.`,
    canonical: `/class-9/books/${subject}/`,
    keywords: [
      `${bookName.toLowerCase()} class 9 book pdf`,
      `class 9 ${bookName.toLowerCase()} textbook`,
      'class 9 books pdf download',
      'growlearnhub class 9 books',
    ],
    image: '/9th/class_9_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SubjectClass9Book bookSlug={subject} />;
}
