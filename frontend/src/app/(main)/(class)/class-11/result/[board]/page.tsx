import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import {
  getAdjacentBoards,
  getBoard,
  getResultClass,
  PUNJAB_BOARDS,
} from '@/utils/helpers/ResultDateSheetDynamic';

const CLASS_SLUG = 'class-11';

type Params = { board: string };

export function generateStaticParams() {
  return PUNJAB_BOARDS.map(board => ({ board: board.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const classItem = getResultClass(CLASS_SLUG);
  const board = getBoard(params.board);

  if (!classItem || !board) {
    return {
      title: 'Result Board Not Found | GrowLearnHub',
      description: 'Requested result board page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/result/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${board.name} ${classItem.classShortName} Result 2025 - Check by Roll Number | GrowLearnHub`;
  const description = `Check ${board.name} ${classItem.classShortName} result 2025 by roll number or name and review marksheet details.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${board.name.toLowerCase()} ${classItem.classShortName.toLowerCase()} result`,
      `${board.name.toLowerCase()} result by roll number`,
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
  const classItem = getResultClass(CLASS_SLUG);
  const board = getBoard(params.board);

  if (!classItem || !board) {
    notFound();
  }

  const canonical = `/${CLASS_SLUG}/result/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const { previous, next } = getAdjacentBoards(board.slug);

  return (
    <UserLayout
      title={`${board.name} ${classItem.className} Result 2025`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section>
          <h2 className="text-2xl font-semibold text-primary">
            {board.name} {classItem.className} Result 2025
          </h2>
          <p className="text-foreground/80">
            Use the official board result portal to check your result by roll number or name. Keep
            your admit card and personal details ready for a smooth result check.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">How to Check Result</h3>
          <ol className="list-decimal space-y-2 pl-5 text-foreground/80">
            <li>Open the board result portal on announcement day.</li>
            <li>Enter your roll number carefully and submit.</li>
            <li>Download and save your marksheet copy for future use.</li>
          </ol>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {previous && (
              <Link
                href={`/${CLASS_SLUG}/result/${previous.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Previous: {previous.name}
              </Link>
            )}
            <Link
              href={`/${CLASS_SLUG}/result`}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              All Boards
            </Link>
            {next && (
              <Link
                href={`/${CLASS_SLUG}/result/${next.slug}`}
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
