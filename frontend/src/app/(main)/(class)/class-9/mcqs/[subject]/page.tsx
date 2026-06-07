import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import Class9McqsBookPage from '@/features/McqsPage/Class9/Book';
import { config } from '@/config';

interface PageProps {
  params: Promise<{ subject: string }>;
}

const CLASS_SLUG = 'class-9';
const image = '/9th/class_9_mcqs.webp';

function buildData(subject: string) {
  const label = removeDashAndUppercase(subject);
  return {
    title: `Class 9 ${label} Chapters`,
    description: `Browse Class 9 ${label} chapters and move deeper into topic-wise MCQs.`,
    keywords: [`Class 9 ${label} chapters`, `${label} MCQs for Class 9`],
    image,
    canonical: `/${CLASS_SLUG}/mcqs/${subject}/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/${subject}/`,
    index: true,
    follow: true,
  };
}

export const revalidate = 432000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const data = buildData(subject);

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
  const { subject } = await params;
  const data = buildData(subject);
  const bookLabel = removeDashAndUppercase(subject);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <h2 className="text-xl font-bold">{`Class 9 ${bookLabel} Chapters`}</h2>
          <p>{`Browse chapters for ${bookLabel} and continue into the nested MCQ hierarchy.`}</p>
        </header>
        <Class9McqsBookPage bookSlug={subject} />
      </article>
    </UserLayout>
  );
}
