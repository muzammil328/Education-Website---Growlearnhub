import { Metadata } from 'next';
import { getPastPaperClass } from '@/utils/helpers/PastPaperAndNotesDynamic';
import Class11PastPaperPage from '@/features/PastPaper/Class11';

const CLASS_SLUG = 'class-11';

export function generateMetadata(): Metadata {
  const classItem = getPastPaperClass(CLASS_SLUG);
  if (!classItem) return { title: 'Past Papers' };

  const title = `${classItem.className} Past Papers 2025 \u2013 All Boards | GrowLearnHub`;
  const description = `Download solved and unsolved ${classItem.classShortName} past papers for all boards. Choose your board below to get past papers instantly at GrowLearnHub.`;

  return {
    title,
    description,
    keywords: [...classItem.keywords],
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com/${CLASS_SLUG}/past-paper/`,
      images: [{ url: classItem.image, alt: title }],
    },
    alternates: { canonical: `/${CLASS_SLUG}/past-paper/` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    twitter: { title, description, images: { url: classItem.image, alt: title } },
  };
}

export default function Page() {
  return <Class11PastPaperPage />;
}
