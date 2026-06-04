import type { Metadata } from 'next';
import { config } from '@/config';
import OnlineTestSubHeadingPage from '@/features/OnlineTestPage/SubHeading';

interface PageProps {
  params: Promise<{ heading: string; subHeading: string }>;
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
  const { heading, subHeading } = await params;
  const headingLabel = humanizeSlug(heading);
  const subHeadingLabel = humanizeSlug(subHeading);
  const title = `${headingLabel} - ${subHeadingLabel} Online Test | GrowLearnHub`;
  const description = `Practice ${headingLabel} ${subHeadingLabel} online test questions with instant results and detailed answers on GrowLearnHub.`;
  const canonical = `/online-test/${heading}/${subHeading}/`;
  const siteUrl = config.SITE_URL || 'https://growlearnhub.com';
  const url = `${siteUrl}/online-test/${heading}/${subHeading}/`;
  const ogImageUrl = new URL('/opengraph-image.jpg', siteUrl).toString();
  return {
    title,
    description,
    keywords: [
      `${headingLabel} ${subHeadingLabel} online test`,
      `${headingLabel} ${subHeadingLabel} mcqs`,
      `${subHeadingLabel} quiz`,
      'chapter wise online test',
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
    twitter: { title, description, images: [ogImageUrl] },
  };
}

export default async function Page({ params }: PageProps) {
  const { heading, subHeading } = await params;
  return <OnlineTestSubHeadingPage book={heading} heading={subHeading} />;
}
