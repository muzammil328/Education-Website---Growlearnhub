import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import Class12McqsBookPage from '@/features/McqsPage/Class12/Book';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ book: string }>;
}

const CLASS_SLUG = 'class-12';
const image = '/12th/class_12_mcqs.webp';

function buildData(slug: string) {
  const label = removeDashAndUppercase(slug);
  return {
    title: `Class 12 ${label} Chapters`,
    description: `Browse Class 12 ${label} chapters and continue into topic-wise MCQs.`,
    keywords: [`Class 12 ${label} chapters`, `${label} MCQs for Class 12`],
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
          <h2 className="text-xl font-bold">{`Class 12 ${bookLabel} Chapters`}</h2>
          <p>Choose a chapter to continue into topic-wise MCQs.</p>
        </header>
        <Class12McqsBookPage bookSlug={book} />
      </article>
    </UserLayout>
  );
}
