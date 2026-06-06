import { Metadata } from 'next';
import { getNotesClass } from '@/utils/helpers/PastPaperAndNotesDynamic';
import Class9NotesPage from '@/features/Notes/Class9';

const CLASS_SLUG = 'class-9';

export function generateMetadata(): Metadata {
  const classItem = getNotesClass(CLASS_SLUG);
  if (!classItem) return { title: 'Class Notes' };

  const title = `${classItem.className} Notes 2025 – All Subjects PDF | GrowLearnHub`;
  const description = `Download comprehensive ${classItem.classShortName} notes for all subjects in PDF format. Access chapter-wise summaries, key concepts, and study materials.`;

  return {
    title,
    description,
    keywords: [...classItem.keywords],
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com/${CLASS_SLUG}/notes/`,
      images: [{ url: classItem.image, alt: title }],
    },
    alternates: { canonical: `/${CLASS_SLUG}/notes/` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    twitter: { title, description, images: { url: classItem.image, alt: title } },
  };
}

export default function Page() {
  return <Class9NotesPage />;
}
