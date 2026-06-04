import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import {
  getAdjacentBoards,
  getBoard,
  getDateSheetClass,
  PUNJAB_BOARDS,
} from '@/utils/helpers/ResultDateSheetDynamic';

const CLASS_SLUG = 'class-11';

type Params = { board: string };

export function generateStaticParams() {
  return PUNJAB_BOARDS.map(board => ({ board: board.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const classItem = getDateSheetClass(CLASS_SLUG);
  const board = getBoard(params.board);

  if (!classItem || !board) {
    return {
      title: 'Date Sheet Board Not Found | GrowLearnHub',
      description: 'Requested date sheet board page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/date-sheet/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${board.name} ${classItem.classShortName} Date Sheet 2025 | GrowLearnHub`;
  const description = `Check ${board.name} ${classItem.classShortName} date sheet 2025 and prepare your exam plan according to the official board schedule.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${board.name.toLowerCase()} ${classItem.classShortName.toLowerCase()} date sheet`,
      `${board.name.toLowerCase()} exam schedule`,
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
  const classItem = getDateSheetClass(CLASS_SLUG);
  const board = getBoard(params.board);

  if (!classItem || !board) {
    notFound();
  }

  const canonical = `/${CLASS_SLUG}/date-sheet/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const { previous, next } = getAdjacentBoards(board.slug);

  return (
    <UserLayout
      title={`${board.name} ${classItem.className} Date Sheet 2025`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section>
          <h2 className="text-2xl font-semibold text-primary">
            {board.name} {classItem.className} Date Sheet 2025
          </h2>
          <p className="text-foreground/80">
            Review the latest board schedule and align subject-wise revision with your exam
            sequence. This helps improve consistency and reduce last-minute pressure.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Preparation Plan Tips</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Create a day-by-day plan from first paper to last paper.</li>
            <li>Reserve high-focus hours for theoretical subjects.</li>
            <li>Keep one daily slot for past paper practice and quick revision.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {previous && (
              <Link
                href={`/${CLASS_SLUG}/date-sheet/${previous.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Previous: {previous.name}
              </Link>
            )}
            <Link
              href={`/${CLASS_SLUG}/date-sheet`}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              All Boards
            </Link>
            {next && (
              <Link
                href={`/${CLASS_SLUG}/date-sheet/${next.slug}`}
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
