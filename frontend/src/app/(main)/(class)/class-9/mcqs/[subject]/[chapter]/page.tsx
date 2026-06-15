import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { config } from '@/config';
import Class9McqsBookChapterPage from '@/features/McqsPage/Class9/Chapter';

interface PageProps {
  params: Promise<{ subject: string; chapter: string }>;
}

const CLASS_SLUG = 'class-9';
const image = '/9th/class_9_mcqs.webp';
const REVALIDATE = 432000;

interface PageData {
  subjectLabel: string;
  chapterLabel: string;
  canonical: string;
  url: string;
}

function buildBase(subject: string, chapter: string): PageData {
  const subjectLabel = removeDashAndUppercase(subject);
  const chapterLabel = removeDashAndUppercase(chapter);

  return {
    subjectLabel,
    chapterLabel,
    canonical: `/${CLASS_SLUG}/mcqs/${subject}/${chapter}/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/${subject}/${chapter}/`,
  };
}

async function fetchChapterOrder(classSlug: string, bookSlug: string, chapterSlug: string): Promise<number | null> {
  if (!config.API_URL) return null;
  try {
    const input = JSON.stringify({ 0: { classSlug, bookSlug, chapterSlug } });
    const url = `${config.API_URL}/trpc/public.getChapterDetail?batch=1&input=${encodeURIComponent(input)}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.[0]?.result?.data?.data?.chapter?.order ?? null;
  } catch {
    return null;
  }
}

function buildTitle(subjectLabel: string, chapterLabel: string, order: number | null): string {
  const prefix = order ? `chapter ${order} ` : '';
  return `${subjectLabel} ${prefix}${chapterLabel} MCQs - Class 9 Practice Questions`;
}

function buildDescription(subjectLabel: string, chapterLabel: string): string {
  return `Practice Class 9 ${subjectLabel} ${chapterLabel} with chapter-wise MCQs. Test your knowledge with multiple choice questions, get instant answers, and improve your exam preparation.`;
}

function buildKeywords(subjectLabel: string, chapterLabel: string): string[] {
  return [
    `Class 9 ${subjectLabel} ${chapterLabel} MCQs`,
    `${chapterLabel} MCQs for Class 9`,
    `${subjectLabel} ${chapterLabel} practice questions`,
    `Class 9 ${subjectLabel} chapter wise MCQs`,
  ];
}

export const revalidate = REVALIDATE;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, chapter } = await params;
  const base = buildBase(subject, chapter);
  const order = await fetchChapterOrder(CLASS_SLUG, subject, chapter);
  const title = buildTitle(base.subjectLabel, base.chapterLabel, order);

  return {
    title,
    description: buildDescription(base.subjectLabel, base.chapterLabel),
    keywords: buildKeywords(base.subjectLabel, base.chapterLabel),
    alternates: { canonical: base.canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description: buildDescription(base.subjectLabel, base.chapterLabel),
      url: base.url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      title,
      description: buildDescription(base.subjectLabel, base.chapterLabel),
      images: { url: image, alt: title },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { subject, chapter } = await params;
  const base = buildBase(subject, chapter);
  const order = await fetchChapterOrder(CLASS_SLUG, subject, chapter);
  const title = buildTitle(base.subjectLabel, base.chapterLabel, order);

  return (
    <UserLayout title={title} image={image} canonical={base.canonical} url={base.url}>
      <article className="space-y-8">
        <Class9McqsBookChapterPage bookSlug={subject} chapterSlug={chapter} />
      </article>
    </UserLayout>
  );
}
