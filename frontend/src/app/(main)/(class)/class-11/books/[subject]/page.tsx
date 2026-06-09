import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import SubjectClass11Book from '@/features/Books/Class11/Subject';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const bookName = removeDashAndUppercase(subject);
  return generatePageMetadata({
    title: `${bookName} Class 11 Book PDF | Punjab Board`,
    description: `${bookName} Class 11 textbook with English and Urdu medium PDF download. Browse chapter-wise PDFs for HSC-I inter-part 1 board exam preparation.`,
    canonical: `/class-11/books/${subject}/`,
    keywords: [
      `${bookName.toLowerCase()} class 11 book pdf`,
      `class 11 ${bookName.toLowerCase()} textbook`,
      'class 11 books pdf download',
      'growlearnhub class 11 books',
    ],
    image: '/11th/class_11_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SubjectClass11Book bookSlug={subject} />;
}
