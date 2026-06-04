import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { SectionGrid } from '@/features/McqsPage/server/McqSections';
import {
  buildListLink,
  getHeadingsByBook,
  slugifyPathSegment,
} from '@/features/McqsPage/server/mcq-data';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ book: string; chapter: string }>;
}

const CLASS_SLUG = 'class-10';
const image = '/10th/class_10_mcqs.webp';

function buildData(book: string, chapter: string) {
  const bookLabel = removeDashAndUppercase(book);
  const chapterLabel = removeDashAndUppercase(chapter);

  return {
    title: `Class 10 ${bookLabel} ${chapterLabel} Topics`,
    description: `Explore topics in Class 10 ${bookLabel} ${chapterLabel}.`,
    keywords: [`Class 10 ${bookLabel} ${chapterLabel} topics`, `${chapterLabel} MCQs for Class 10`],
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
  const headingsResponse = await getHeadingsByBook(CLASS_SLUG, book, chapter);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 10 {removeDashAndUppercase(book)} {removeDashAndUppercase(chapter)} Topics
          </Heading2>
          <p className="text-base">Continue into heading-level MCQs from here.</p>
        </header>

        <SectionGrid
          title="Topics"
          emptyMessage="No topics found for this chapter."
          items={headingsResponse.items.map(item => ({
            title: item.name,
            link: buildListLink(
              `${CLASS_SLUG}/mcqs/${book}/${chapter}`,
              slugifyPathSegment(item.name)
            ),
          }))}
        />
      </article>
    </UserLayout>
  );
}
