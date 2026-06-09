import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import ChapterClass12Book from '@/features/Books/Class12/Subject/Chapter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const bookName    = removeDashAndUppercase(subject);
  const chapterName = removeDashAndUppercase(chapter);
  return generatePageMetadata({
    title: `${chapterName} — ${bookName} Class 12 PDF`,
    description: `Download ${chapterName} from ${bookName} Class 12 in English and Urdu medium PDF. HSC-II inter-part 2 board exam preparation.`,
    canonical: `/class-12/books/${subject}/${chapter}/`,
    keywords: [
      `${chapterName.toLowerCase()} ${bookName.toLowerCase()} class 12`,
      `class 12 ${bookName.toLowerCase()} ${chapterName.toLowerCase()} pdf`,
      'class 12 chapter pdf download',
      'growlearnhub class 12 books',
    ],
    image: '/12th/class_12_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <ChapterClass12Book bookSlug={subject} chapterSlug={chapter} />;
}
