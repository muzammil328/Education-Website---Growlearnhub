import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardSmall from '@/components/card/SmallCard';
import PDFViewer from '@/components/elements/PDFViewer';
import UserLayout from '@/components/layout/UserLayout';
import { generatePageMetadata } from '@/lib/seo';
import { config } from '@/config';
import { BookWithMediums } from '@/types/book.types';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

const CLASS_SLUG = 'class-10';

async function getBookBySlug(slug: string) {
  try {
    const queryParams = new URLSearchParams({
      className: CLASS_SLUG,
      tag: 'mcqs',
      status: 'active',
      page: '1',
      limit: '100',
    });
    const res = await get<{ data: BookWithMediums[] }>(
      `${config.book.get()}&${queryParams.toString()}`
    );
    return (res?.data || []).find(b => b.slug === slug) || null;
  } catch {
    return null;
  }
}

type Params = { board: string; medium: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const book = await getBookBySlug(params.board);

  if (!book) {
    return {
      title: 'Class 10 Book Medium Not Found | GrowLearnHub',
      description: 'Requested Class 10 book medium could not be found.',
    };
  }

  const bookName = removeDashAndUppercase(params.board);
  const medium = book.mediums.find(m => m.slug === params.medium);

  if (!medium) {
    return {
      title: 'Class 10 Book Medium Not Found | GrowLearnHub',
      description: 'Requested Class 10 book medium could not be found.',
    };
  }

  const canonical = `/class-10/books/${book.slug}/${medium.slug}/`;
  const title = `${bookName} Class 10 Book PDF (${medium.name})`;
  const description = `Read ${bookName} Class 10 textbook in ${medium.name}. Use chapter-wise links or view the full PDF online.`;

  return generatePageMetadata({
    title,
    description,
    canonical,
    keywords: [
      `${bookName.toLowerCase()} class 10 ${medium.name.toLowerCase()} pdf`,
      `${bookName.toLowerCase()} class 10 book pdf`,
      'class 10 chapter wise book',
      'punjab board class 10 books',
    ],
    image: '/10th/class_10_book.webp',
  });
}

export default async function Page({ params }: { params: Params }) {
  const book = await getBookBySlug(params.board);

  if (!book) {
    notFound();
  }

  const medium = book.mediums.find(m => m.slug === params.medium);

  if (!medium) {
    notFound();
  }

  const bookName = removeDashAndUppercase(params.board);
  const canonical = `/class-10/books/${book.slug}/${medium.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  const chaptersForMedium = book.chapters.filter(
    c => !c.mediumId || c.mediumId === medium.mediumId
  );

  return (
    <UserLayout
      title={`${bookName} Class 10 Book (${medium.name})`}
      image="/10th/class_10_book.webp"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Access <strong>{bookName}</strong> Class 10 textbook in <strong>{medium.name}</strong>.
            Use chapter-wise links below for quick navigation, or read the full PDF in one place.
          </p>
          <p className="text-foreground/80 mt-4">
            Go back to{' '}
            <Link
              href={`/class-10/books/${book.slug}`}
              className="font-medium text-primary hover:underline"
            >
              {bookName} book page
            </Link>{' '}
            or browse all{' '}
            <Link href="/class-10/books" className="font-medium text-primary hover:underline">
              Class 10 subjects
            </Link>
            .
          </p>
        </section>

        {chaptersForMedium.length > 0 && (
          <section className="mb-10">
            <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
              Chapter-Wise Navigation
            </h2>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {chaptersForMedium.map(chapter => (
                <CardSmall
                  key={chapter.chapterId}
                  title={chapter.name}
                  link={`class-10/books/${book.slug}/${medium.slug}/${chapter.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {medium.fileId && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary">Full Book PDF</h2>
            <p className="text-foreground/80 mb-4">
              Use this full textbook viewer when you want to read continuously instead of chapter by
              chapter.
            </p>
            <PDFViewer pdfUrl={medium.fileId} />
          </section>
        )}
      </article>
    </UserLayout>
  );
}
