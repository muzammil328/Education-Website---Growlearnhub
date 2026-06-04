import type { Metadata } from 'next';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = removeDashAndUppercase(slug);
  const title = `${label} | Online MCQ Test`;
  const description = `Take an interactive online MCQ test for ${label} with instant feedback. Practice questions from various subjects and chapters.`;

  return {
    title,
    description,
    keywords: ['MCQ', 'online test', 'quiz', 'practice questions', 'education', label],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'GrowLearnHub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
