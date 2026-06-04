import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { Heading2 } from '@muzammil328/ui';
import {
  getNotesClass,
  NOTES_BOARD,
  NOTES_SUBJECTS,
} from '@/utils/helpers/PastPaperAndNotesDynamic';

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
  const classItem = getNotesClass(CLASS_SLUG);

  if (!classItem) {
    return <div>Class not found</div>;
  }

  return (
    <UserLayout
      title={`${classItem.className} Notes 2025`}
      image={classItem.image}
      canonical={`/${CLASS_SLUG}/notes/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/notes/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {classItem.className} Notes – All Subjects
          </Heading2>
          <p className="text-base">{classItem.summary}</p>
        </header>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Subjects Available</h3>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {NOTES_SUBJECTS.map(subject => (
              <CardSmall
                key={subject.slug}
                title={subject.name}
                link={`${CLASS_SLUG}/notes/${NOTES_BOARD.slug}/${subject.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">How to Use These Notes</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Read chapters in order:</strong> Follow the chapter-wise structure to build a
              solid foundation
            </li>
            <li>
              <strong>Review key concepts:</strong> Focus on highlighted important concepts and
              definitions
            </li>
            <li>
              <strong>Practice questions:</strong> Solve included practice questions to reinforce
              understanding
            </li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">Related Resources</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${CLASS_SLUG}/past-paper`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Past Papers
            </a>
            <a
              href={`/${CLASS_SLUG}/date-sheet`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Date Sheet
            </a>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
