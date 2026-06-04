import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import {
  getPairingAdjacentSubjects,
  getPairingBoard,
  getPairingClass,
  getPairingSubject,
} from '@/utils/helpers/PairingSchemeDynamic';

type Params = { board: string; subject: string };

export function generateStaticParams() {
  const classItem = getPairingClass('class-11');

  if (!classItem) {
    return [];
  }

  return classItem.board.subjects.map(subject => ({
    board: classItem.board.slug,
    subject: subject.slug,
  }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const classItem = getPairingClass('class-11');
  const board = classItem ? getPairingBoard(classItem, params.board) : undefined;
  const subject = board ? getPairingSubject(board, params.subject) : undefined;

  if (!classItem || !board || !subject) {
    return {
      title: 'Class 11 Pairing Scheme Not Found | GrowLearnHub',
      description: 'Requested Class 11 pairing scheme page could not be found.',
    };
  }

  const canonical = `/class-11/pairing-scheme/${board.slug}/${subject.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${classItem.classShortName} ${subject.name} Pairing Scheme 2025 - ${board.name} | GrowLearnHub`;
  const description = `View ${classItem.classShortName} ${subject.name} pairing scheme 2025 for ${board.name} with chapter-wise preparation guidance.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      ...subject.keywords,
      `${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()} pairing scheme 2025`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
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

export default function Page({ params }: { params: Params }) {
  const classItem = getPairingClass('class-11');
  const board = classItem ? getPairingBoard(classItem, params.board) : undefined;
  const subject = board ? getPairingSubject(board, params.subject) : undefined;

  if (!classItem || !board || !subject) {
    notFound();
  }

  const canonical = `/class-11/pairing-scheme/${board.slug}/${subject.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const { previous, next } = getPairingAdjacentSubjects(board, subject.slug);

  return (
    <UserLayout
      title={`${classItem.className} ${subject.name} Pairing Scheme`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section>
          <h2 className="text-2xl font-semibold text-primary">
            {classItem.className} {subject.name} Pairing Scheme - {board.name}
          </h2>
          <p className="text-foreground/80">{subject.summary}</p>
        </section>

        {subject.scheme && subject.scheme.length > 0 ? (
          <section className="mt-8">
            <h3 className="text-xl font-semibold text-foreground">Chapter-wise Distribution</h3>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="p-3">Chapter</th>
                    <th className="p-3 text-center">MCQs</th>
                    <th className="p-3 text-center">Short Qs</th>
                    <th className="p-3 text-center">Long Qs</th>
                  </tr>
                </thead>
                <tbody>
                  {subject.scheme.map(row => (
                    <tr key={row.chapter} className="border-t border-border">
                      <td className="p-3">{row.chapter}</td>
                      <td className="p-3 text-center">{row.mcqs}</td>
                      <td className="p-3 text-center">{row.short}</td>
                      <td className="p-3 text-center">{row.long}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="mt-8">
            <h3 className="text-xl font-semibold text-foreground">
              How to Use This Pairing Scheme
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-foreground/80">
              <li>Start revision from chapters with higher expected question coverage.</li>
              <li>Prepare definitions, short notes, and long questions from recurring units.</li>
              <li>Use past papers with this scheme to improve exam-time decision making.</li>
            </ul>
          </section>
        )}

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {previous && (
              <Link
                href={`/class-11/pairing-scheme/${board.slug}/${previous.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Previous: {previous.name}
              </Link>
            )}
            <Link
              href={`/class-11/pairing-scheme/${board.slug}`}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              All Subjects
            </Link>
            {next && (
              <Link
                href={`/class-11/pairing-scheme/${board.slug}/${next.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Next: {next.name}
              </Link>
            )}
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
