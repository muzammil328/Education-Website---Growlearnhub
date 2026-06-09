import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import ChapterClass9Book from '@/features/Books/Class9/Subject/Chapter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const bookName    = removeDashAndUppercase(subject);
  const chapterName = removeDashAndUppercase(chapter);
  return generatePageMetadata({
    title: `${chapterName} — ${bookName} Class 9 PDF`,
    description: `Download ${chapterName} from ${bookName} Class 9 in English and Urdu medium PDF. Board exam preparation made easy.`,
    canonical: `/class-9/books/${subject}/${chapter}/`,
    keywords: [
      `${chapterName.toLowerCase()} ${bookName.toLowerCase()} class 9`,
      `class 9 ${bookName.toLowerCase()} ${chapterName.toLowerCase()} pdf`,
      'class 9 chapter pdf download',
      'growlearnhub class 9 books',
    ],
    image: '/9th/class_9_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <ChapterClass9Book bookSlug={subject} chapterSlug={chapter} />;
}
