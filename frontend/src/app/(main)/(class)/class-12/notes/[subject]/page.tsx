import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import {
  getNotesClass,
  getNotesBoard,
  getNotesSubject,
  getNotesAdjacentSubjects,
  NOTES_BOARD,
  NOTES_SUBJECTS,
} from '@/utils/helpers/PastPaperAndNotesDynamic';

const CLASS_SLUG = 'class-12';

export function generateStaticParams() {
  return NOTES_SUBJECTS.map(subject => ({
    board: NOTES_BOARD.slug,
    subject: subject.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { board: string; subject: string };
}): Metadata {
  const classItem = getNotesClass(CLASS_SLUG);
  const board = getNotesBoard(params.board);
  const subject = getNotesSubject(params.subject);

  if (!classItem || !board || !subject) {
    return { title: 'Class Notes' };
  }

  const title = `${classItem.className} ${subject.name} Notes PDF | GrowLearnHub`;
  const description = `Download comprehensive ${classItem.classShortName} ${subject.name} notes in PDF format. Access chapter-wise summaries and key concepts for exam preparation.`;

  return {
    title,
    description,
    keywords: [
      `${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()} notes`,
      `${classItem.className} notes pdf`,
      `${subject.name} notes`,
    ],
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com/${CLASS_SLUG}/notes/${board.slug}/${subject.slug}/`,
      images: [{ url: classItem.image, alt: title }],
    },
    alternates: {
      canonical: `/${CLASS_SLUG}/notes/${board.slug}/${subject.slug}/`,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    twitter: { title, description, images: { url: classItem.image, alt: title } },
  };
}

export default function Page({ params }: { params: { board: string; subject: string } }) {
  const classItem = getNotesClass(CLASS_SLUG);
  const board = getNotesBoard(params.board);
  const subject = getNotesSubject(params.subject);

  if (!classItem || !board || !subject) {
    notFound();
  }

  const adjacentSubjects = getNotesAdjacentSubjects(params.subject);

  return (
    <UserLayout
      title={`${classItem.className} ${subject.name} Notes`}
      image={classItem.image}
      canonical={`/${CLASS_SLUG}/notes/${board.slug}/${subject.slug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/notes/${board.slug}/${subject.slug}/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {classItem.className} {subject.name} Notes
          </Heading2>
          <p className="text-sm text-muted-foreground">
            Complete study material covering all chapters
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Chapter-wise Content</h3>
          <p className="text-muted-foreground">
            Access comprehensive notes for {classItem.classShortName} {subject.name}. These notes
            include chapter summaries, key concepts, important definitions, and practice questions
            to help you prepare effectively for exams.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">PDF Download</h3>
          <p>
            Download the complete {classItem.classShortName} {subject.name} notes in PDF format
            for offline access and better study experience.
          </p>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">Other Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {NOTES_SUBJECTS.map(subj => (
              <a
                key={subj.slug}
                href={`/${CLASS_SLUG}/notes/${board.slug}/${subj.slug}`}
                className={`inline-block rounded-md px-3 py-2 text-sm transition-colors ${
                  subj.slug === subject.slug
                    ? 'bg-primary text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {subj.name}
              </a>
            ))}
          </div>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {adjacentSubjects.previous && (
              <a
                href={`/${CLASS_SLUG}/notes/${board.slug}/${adjacentSubjects.previous.slug}`}
                className="inline-block rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
              >
                ← {adjacentSubjects.previous.name}
              </a>
            )}
            <a
              href={`/${CLASS_SLUG}/notes`}
              className="inline-block rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
            >
              All Subjects
            </a>
            {adjacentSubjects.next && (
              <a
                href={`/${CLASS_SLUG}/notes/${board.slug}/${adjacentSubjects.next.slug}`}
                className="inline-block rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
              >
                {adjacentSubjects.next.name} →
              </a>
            )}
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
