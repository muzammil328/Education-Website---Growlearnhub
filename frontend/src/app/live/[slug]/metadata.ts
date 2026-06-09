import type { Metadata } from 'next';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000').replace(/\/+$/, '');

export interface McqData {
  mcqId: string;
  slug: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty?: string;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

export async function fetchMcqBySlug(slug: string): Promise<McqData | null> {
  try {
    const url = `${API_URL}/trpc/public.getMcqBySlug?batch=1&input=${encodeURIComponent(JSON.stringify({ '0': { slug } }))}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    const result = Array.isArray(json) ? json[0] : json;
    return result?.result?.data?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mcq = await fetchMcqBySlug(slug);

  const question = mcq?.question ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const bookName = mcq?.bookName ?? '';
  const chapterName = mcq?.chapterName ?? '';

  const title = `${question} | GrowLearnHub MCQ`;
  const description = mcq
    ? `MCQ: ${question}${chapterName ? ` — ${chapterName}` : ''}${bookName ? ` (${bookName})` : ''}. Practice with 4 options and instant feedback on GrowLearnHub.`
    : `Practice MCQ on GrowLearnHub with instant feedback.`;

  const keywords = [
    'MCQ',
    'multiple choice',
    'online test',
    'practice',
    question,
    bookName,
    chapterName,
    mcq?.className ?? '',
  ].filter(Boolean);

  const ogImageUrl = `/live/${slug}/opengraph-image`;
  const twitterImageUrl = `/live/${slug}/twitter-image`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      siteName: 'GrowLearnHub',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: question }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImageUrl],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://growlearnhub.com/live/${slug}/`,
    },
  };
}
