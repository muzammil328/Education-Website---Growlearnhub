import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Para } from '@muzammil328/ui';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { config } from '@/config';
import Class11McqsBookChapterPage from '@/features/McqsPage/Class11/Chapter';

interface PageProps {
  params: Promise<{ book: string; chapter: string }>;
}

const CLASS_SLUG = 'class-11';
const image = '/11th/class_11_mcqs.webp';

function buildData(book: string, chapter: string) {
  const bookLabel = removeDashAndUppercase(book);
  const chapterLabel = removeDashAndUppercase(chapter);

  return {
    title: `Class 11 ${bookLabel} ${chapterLabel} Topics`,
    description: `Explore topics in Class 11 ${bookLabel} ${chapterLabel}.`,
    keywords: [`Class 11 ${bookLabel} ${chapterLabel} topics`, `${chapterLabel} MCQs for Class 11`],
    canonical: `/${CLASS_SLUG}/mcqs/${book}/${chapter}/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/${book}/${chapter}/`,
    image,
  };
}

export const revalidate = 432000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const data = buildData(book, chapter);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: data.canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url,
      images: [{ url: data.image, alt: data.title }],
    },
    twitter: {
      title: data.title,
      description: data.description,
      images: { url: data.image, alt: data.title },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { book, chapter } = await params;
  const data = buildData(book, chapter);
  const bookLabel = removeDashAndUppercase(book);
  const chapterLabel = removeDashAndUppercase(chapter);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 11 {bookLabel} {chapterLabel} Topics
          </Heading2>
          <Para className="text-base">
            Move from chapters into the topic hierarchy for {chapterLabel}.
          </Para>
        </header>
        <Class11McqsBookChapterPage bookSlug={book} chapterSlug={chapter} />
      </article>
    </UserLayout>
  );
}
