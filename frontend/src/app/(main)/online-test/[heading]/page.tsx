import type { Metadata } from 'next';
import { config } from '@/config';
import OnlineTestHeadingPage from '@/features/OnlineTestPage/Heading';

interface PageProps {
  params: Promise<{ heading: string }>;
}

function humanizeSlug(slug: string): string {
  return slug

    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { heading } = await params;
  const label = humanizeSlug(heading);
  const canonical = `/online-test/${heading}/`;
  const siteUrl = config.SITE_URL || 'https://growlearnhub.com';
  const url = `${siteUrl}/online-test/${heading}/`;
  const title = `${label} Online Test | Free Chapter-wise Quizzes | GrowLearnHub`;
  const description = `Take free ${label} online tests chapter by chapter with instant scoring and detailed feedback on GrowLearnHub.`;
  const ogImageUrl = new URL('/opengraph-image.jpg', siteUrl).toString();
  return {
    title,
    description,
    keywords: [
      `${label} online test`,
      `${label} chapter wise test`,
      `${label} mcqs`,
      'free online test',
      'growlearnhub',
    ],
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImageUrl, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { heading } = await params;
  return <OnlineTestHeadingPage book={heading} />;
}
