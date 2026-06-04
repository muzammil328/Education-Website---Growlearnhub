import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PDFViewer from '@/components/elements/PDFViewer';
import UserLayout from '@/components/layout/UserLayout';
import {
  CLASS11_PUNJAB_BOARDS,
  getClass11Board,
  getClass11Chapters,
  getClass11Medium,
} from '@/utils/helpers/Class11BooksDynamic';

type Params = { board: string; medium: string; chapter: string };

export function generateStaticParams() {
  return CLASS11_PUNJAB_BOARDS.flatMap(board =>
    board.mediums.flatMap(medium =>
      getClass11Chapters(board.chapterCount).map(chapter => ({
        board: board.slug,
        medium: medium.slug,
        chapter: chapter.slug,
      }))
    )
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const board = getClass11Board(params.board);
  const medium = board ? getClass11Medium(board, params.medium) : undefined;
  const chapter = board
    ? getClass11Chapters(board.chapterCount).find(item => item.slug === params.chapter)
    : undefined;

  if (!board || !medium || !chapter) {
    return {
      title: 'Class 11 Chapter Not Found | GrowLearnHub',
      description: 'Requested Class 11 chapter page could not be found.',
    };
  }

  const canonical = `/class-11/books/${board.slug}/${medium.slug}/${chapter.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${board.name} Class 11 ${chapter.title} (${medium.name}) | GrowLearnHub`;
  const description = `${chapter.title} of ${board.name} Class 11 (${medium.name}). Read chapter-wise guidance and view the full textbook PDF.`;

  return {
    title,
    description,
    keywords: [
      `${board.name} class 11 ${chapter.slug}`,
      `${board.name} ${medium.name.toLowerCase()} ${chapter.title.toLowerCase()}`,
      'class 11 chapter wise books',
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'GrowLearnHub',
      images: [{ url: board.image, alt: `${board.name} ${chapter.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: board.image, alt: `${board.name} ${chapter.title}` }],
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const board = getClass11Board(params.board);
  const medium = board ? getClass11Medium(board, params.medium) : undefined;
  const chapters = board ? getClass11Chapters(board.chapterCount) : [];
  const chapter = chapters.find(item => item.slug === params.chapter);

  if (!board || !medium || !chapter) {
    notFound();
  }

  const canonical = `/class-11/books/${board.slug}/${medium.slug}/${chapter.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const currentIndex = chapters.findIndex(item => item.slug === chapter.slug);
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <UserLayout
      title={`${board.name} ${chapter.title} (${medium.name})`}
      image={board.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">{chapter.title}</h2>
          <p className="text-foreground/80">
            You are viewing {chapter.title} from the {board.name} Class 11 textbook in {medium.name}
            . Use navigation below to move between chapters.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-foreground">Chapter Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {previousChapter && (
              <Link
                href={`/class-11/books/${board.slug}/${medium.slug}/${previousChapter.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Previous: {previousChapter.title}
              </Link>
            )}
            <Link
              href={`/class-11/books/${board.slug}/${medium.slug}`}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              All Chapters
            </Link>
            {nextChapter && (
              <Link
                href={`/class-11/books/${board.slug}/${medium.slug}/${nextChapter.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Next: {nextChapter.title}
              </Link>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">Full Book Reference</h3>
          <PDFViewer pdfUrl={medium.fileId} />
        </section>
      </article>
    </UserLayout>
  );
}
