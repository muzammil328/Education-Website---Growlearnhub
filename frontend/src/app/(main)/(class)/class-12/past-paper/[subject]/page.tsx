import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import {
  getPastPaperClass,
  getPastPaperBoard,
  getPastPaperSubject,
  getPastPaperAdjacentSubjects,
  PAST_PAPER_BOARDS,
  PAST_PAPER_SUBJECTS,
} from '@/utils/helpers/PastPaperAndNotesDynamic';

const CLASS_SLUG = 'class-12';

export function generateStaticParams() {
  return PAST_PAPER_BOARDS.flatMap(board =>
    PAST_PAPER_SUBJECTS.map(subject => ({
      board: board.slug,
      subject: subject.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string; subject: string }>;
}): Promise<Metadata> {
  const { board: boardSlug, subject: subjectSlug } = await params;
  const classItem = getPastPaperClass(CLASS_SLUG);
  const board = getPastPaperBoard(boardSlug);
  const subject = getPastPaperSubject(subjectSlug);

  if (!classItem || !board || !subject) {
    return { title: 'Past Papers' };
  }

  const title = `${classItem.className} Past Papers ${board.name} ${subject.name} | GrowLearnHub`;
  const description = `Download ${classItem.classShortName} ${subject.name} past papers from ${board.name}. Get solved and unsolved papers in PDF format.`;

  return {
    title,
    description,
    keywords: [
      `${classItem.classShortName.toLowerCase()} past papers ${subject.name.toLowerCase()}`,
      `${board.name} ${subject.name} past papers`,
      `${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com/${CLASS_SLUG}/past-paper/${board.slug}/${subject.slug}/`,
      images: [{ url: classItem.image, alt: title }],
    },
    alternates: {
      canonical: `/${CLASS_SLUG}/past-paper/${board.slug}/${subject.slug}/`,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    twitter: { title, description, images: { url: classItem.image, alt: title } },
  };
}

export default async function Page({ params }: { params: Promise<{ board: string; subject: string }> }) {
  const { board: boardSlug, subject: subjectSlug } = await params;
  const classItem = getPastPaperClass(CLASS_SLUG);
  const board = getPastPaperBoard(boardSlug);
  const subject = getPastPaperSubject(subjectSlug);

  if (!classItem || !board || !subject) {
    notFound();
  }

  const adjacentSubjects = getPastPaperAdjacentSubjects(subjectSlug);

  return (
    <UserLayout
      title={`${classItem.className} Past Papers - ${board.name} ${subject.name}`}
      image={classItem.image}
      canonical={`/${CLASS_SLUG}/past-paper/${board.slug}/${subject.slug}/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/past-paper/${board.slug}/${subject.slug}/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {classItem.className} {subject.name} Past Papers
          </Heading2>
          <p className="text-sm text-muted-foreground">
            {board.name} • {subject.name}
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Past Papers Available</h3>
          <p>
            Download past papers for {classItem.classShortName} {subject.name} from {board.name}.
            Papers are available in PDF format, organized by year.
          </p>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">Other Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {PAST_PAPER_SUBJECTS.map(subj => (
              <a
                key={subj.slug}
                href={`/${CLASS_SLUG}/past-paper/${board.slug}/${subj.slug}`}
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
                href={`/${CLASS_SLUG}/past-paper/${board.slug}/${adjacentSubjects.previous.slug}`}
                className="inline-block rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
              >
                ← {adjacentSubjects.previous.name}
              </a>
            )}
            <a
              href={`/${CLASS_SLUG}/past-paper`}
              className="inline-block rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
            >
              All Subjects
            </a>
            {adjacentSubjects.next && (
              <a
                href={`/${CLASS_SLUG}/past-paper/${board.slug}/${adjacentSubjects.next.slug}`}
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
