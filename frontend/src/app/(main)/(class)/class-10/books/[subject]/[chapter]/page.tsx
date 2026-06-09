import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import ChapterClass10Book from '@/features/Books/Class10/Subject/Chapter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const bookName    = removeDashAndUppercase(subject);
  const chapterName = removeDashAndUppercase(chapter);
  return generatePageMetadata({
    title: `${chapterName} — ${bookName} Class 10 PDF`,
    description: `Download ${chapterName} from ${bookName} Class 10 in English and Urdu medium PDF. SSC-II board exam preparation.`,
    canonical: `/class-10/books/${subject}/${chapter}/`,
    keywords: [
      `${chapterName.toLowerCase()} ${bookName.toLowerCase()} class 10`,
      `class 10 ${bookName.toLowerCase()} ${chapterName.toLowerCase()} pdf`,
      'class 10 chapter pdf download',
      'growlearnhub class 10 books',
    ],
    image: '/10th/class_10_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <ChapterClass10Book bookSlug={subject} chapterSlug={chapter} />;
}
