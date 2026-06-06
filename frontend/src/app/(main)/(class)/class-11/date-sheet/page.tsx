import type { Metadata } from 'next';
import { getDateSheetClass } from '@/utils/helpers/ResultDateSheetDynamic';
import Class11DateSheetPage from '@/features/DateSheet/Class11';

const CLASS_SLUG = 'class-11';

export function generateMetadata(): Metadata {
  const classItem = getDateSheetClass(CLASS_SLUG);

  if (!classItem) {
    return {
      title: 'Date Sheet Page Not Found | GrowLearnHub',
      description: 'Requested date sheet page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/date-sheet/`;
  const title = `${classItem.classShortName} Date Sheet 2025 - All Punjab Boards | GrowLearnHub`;
  const description = `Find ${classItem.classShortName} date sheet 2025 board-wise and plan your paper preparation according to the official schedule.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${classItem.classShortName.toLowerCase()} exam schedule`,
      `${classItem.classShortName.toLowerCase()} board date sheet`,
      'Punjab board date sheet 2025',
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com${canonical}`,
      type: 'website',
      siteName: 'GrowLearnHub',
      images: [{ url: classItem.image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: classItem.image, alt: title }],
    },
  };
}

export default function Page() {
  return <Class11DateSheetPage />;
}
