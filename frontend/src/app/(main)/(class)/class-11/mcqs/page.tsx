import type { Metadata } from 'next';
import {} from '@/features/McqsPage/server/mcq-data';
import ClassMcqsPage from '@/features/McqsPage/Class';
import { config } from '@/config';

const CLASS_SLUG = 'class-11';
const image = '/11th/class_11_mcqs.webp';

function buildData() {
  return {
    title: 'Class 11 MCQs',
    description: 'Browse Class 11 subjects and continue through the MCQ hierarchy.',
    canonical: `/${CLASS_SLUG}/mcqs/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/`,
    image,
  };
}

export const revalidate = 432000;

export async function generateMetadata(): Promise<Metadata> {
  const data = buildData();

  return {
    title: data.title,
    description: data.description,
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

export default async function Page() {
  const data = buildData();

  return (
    <ClassMcqsPage
      title={data.title}
      image={data.image}
      canonical={data.canonical}
      url={data.url}
      classSlug={CLASS_SLUG}
      className={CLASS_SLUG}
      heading="Class 11 MCQs"
      intro="Pick a subject to continue through the MCQ hierarchy."
      emptyMessage="No subjects found for Class 11."
    />
  );
}
