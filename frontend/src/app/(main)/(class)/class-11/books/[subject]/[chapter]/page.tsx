import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import ChapterClass11Book from '@/features/Books/Class11/Subject/Chapter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const bookName    = removeDashAndUppercase(subject);
  const chapterName = removeDashAndUppercase(chapter);
  return generatePageMetadata({
    title: `${chapterName} — ${bookName} Class 11 PDF`,
    description: `Download ${chapterName} from ${bookName} Class 11 in English and Urdu medium PDF. HSC-I inter-part 1 board exam preparation.`,
    canonical: `/class-11/books/${subject}/${chapter}/`,
    keywords: [
      `${chapterName.toLowerCase()} ${bookName.toLowerCase()} class 11`,
      `class 11 ${bookName.toLowerCase()} ${chapterName.toLowerCase()} pdf`,
      'class 11 chapter pdf download',
      'growlearnhub class 11 books',
    ],
    image: '/11th/class_11_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <ChapterClass11Book bookSlug={subject} chapterSlug={chapter} />;
}
