import type { Metadata } from 'next';
import { getResultClass } from '@/utils/helpers/ResultDateSheetDynamic';
import Class10ResultPage from '@/features/Result/Class10';

const CLASS_SLUG = 'class-10';

export function generateMetadata(): Metadata {
  const classItem = getResultClass(CLASS_SLUG);

  if (!classItem) {
    return {
      title: 'Result Page Not Found | GrowLearnHub',
      description: 'Requested result page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/result/`;
  const title = `${classItem.classShortName} Result 2025 - Check by Roll Number and Name | GrowLearnHub`;
  const description = `Check ${classItem.classShortName} result 2025 for all Punjab boards. Select your board and access official result guidance by roll number and name.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${classItem.classShortName.toLowerCase()} result by name`,
      `${classItem.classShortName.toLowerCase()} result by roll number`,
      'Punjab board result 2025',
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
  return <Class10ResultPage />;
}
