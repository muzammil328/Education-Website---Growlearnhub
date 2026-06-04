import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardSmall from '@/components/card/SmallCard';
import PDFViewer from '@/components/elements/PDFViewer';
import UserLayout from '@/components/layout/UserLayout';
import {
  CLASS12_PUNJAB_BOARDS,
  getClass12Board,
  getClass12Chapters,
  getClass12Medium,
} from '@/utils/helpers/Class12BooksDynamic';

type Params = { board: string; medium: string };

export function generateStaticParams() {
  return CLASS12_PUNJAB_BOARDS.flatMap(board =>
    board.mediums.map(medium => ({ board: board.slug, medium: medium.slug }))
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const board = getClass12Board(params.board);
  const medium = board ? getClass12Medium(board, params.medium) : undefined;

  if (!board || !medium) {
    return {
      title: 'Class 12 Book Medium Not Found | GrowLearnHub',
      description: 'Requested Class 12 book medium could not be found.',
    };
  }

  const canonical = `/class-12/books/${board.slug}/${medium.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${board.name} Class 12 Book PDF (${medium.name}) | GrowLearnHub`;
  const description = `Read ${board.name} Class 12 textbook in ${medium.name}. Use chapter-wise links or view the full PDF online.`;

  return {
    title,
    description,
    keywords: [
      `${board.name} class 12 ${medium.name.toLowerCase()} pdf`,
      `${board.name} class 12 book pdf`,
      'class 12 chapter wise book',
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'GrowLearnHub',
      images: [{ url: board.image, alt: `${board.name} class 12 ${medium.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: board.image, alt: `${board.name} class 12 ${medium.name}` }],
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const board = getClass12Board(params.board);
  const medium = board ? getClass12Medium(board, params.medium) : undefined;

  if (!board || !medium) {
    notFound();
  }

  const chapters = getClass12Chapters(board.chapterCount);
  const canonical = `/class-12/books/${board.slug}/${medium.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${board.name} Class 12 Book (${medium.name})`}
      image={board.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Access {board.name} Class 12 textbook in {medium.name}. Use chapter-wise links below for
            quick navigation, or read the full PDF in one place.
          </p>
          <p className="text-foreground/80 mt-4">
            Go back to{' '}
            <Link
              href={`/class-12/books/${board.slug}`}
              className="font-medium text-primary hover:underline"
            >
              {board.name} board page
            </Link>{' '}
            or browse all{' '}
            <Link href="/class-12/books" className="font-medium text-primary hover:underline">
              Class 12 subjects
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Chapter-Wise Navigation
          </h2>
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {chapters.map(chapter => (
              <CardSmall
                key={chapter.slug}
                title={`${chapter.title} - ${board.name}`}
                link={`class-12/books/${board.slug}/${medium.slug}/${chapter.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary">Full Book PDF</h2>
          <PDFViewer pdfUrl={medium.fileId} />
        </section>
      </article>
    </UserLayout>
  );
}
