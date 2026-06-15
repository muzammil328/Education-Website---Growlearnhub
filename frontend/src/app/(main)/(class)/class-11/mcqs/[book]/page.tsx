import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import Class11McqsBookPage from '@/features/McqsPage/Class11/Book';
import { config } from '@/config';
import { Heading2, Para } from '@muzammil328/ui';

interface PageProps {
  params: Promise<{ book: string }>;
}

const CLASS_SLUG = 'class-11';
const image = '/11th/class_11_mcqs.webp';

function buildData(slug: string) {
  const label = removeDashAndUppercase(slug);
  return {
    title: `Class 11 ${label} Chapters`,
    description: `Browse Class 11 ${label} chapters and continue into topic-wise MCQs.`,
    keywords: [`Class 11 ${label} chapters`, `${label} MCQs for Class 11`],
    image,
    canonical: `/${CLASS_SLUG}/mcqs/${slug}/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/${slug}/`,
    index: true,
    follow: true,
  };
}

export const revalidate = 432000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book } = await params;
  const data = buildData(book);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: data.canonical },
    robots: {
      index: data.index,
      follow: data.follow,
      googleBot: { index: data.index, follow: data.follow },
    },
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
  const { book } = await params;
  const data = buildData(book);
  const bookLabel = removeDashAndUppercase(book);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="text-xl font-bold">{`Class 11 ${bookLabel} Chapters`}</Heading2>
          <Para>Choose a chapter to continue into topic-wise MCQs.</Para>
        </header>
        <Class11McqsBookPage bookSlug={book} />
      </article>
    </UserLayout>
  );
}
