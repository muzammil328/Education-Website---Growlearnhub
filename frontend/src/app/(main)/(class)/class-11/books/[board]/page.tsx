import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { CLASS11_PUNJAB_BOARDS, getClass11Board } from '@/utils/helpers/Class11BooksDynamic';

type Params = { board: string };

export function generateStaticParams() {
  return CLASS11_PUNJAB_BOARDS.map(board => ({ board: board.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const board = getClass11Board(params.board);

  if (!board) {
    return {
      title: 'Class 11 Book Not Found | GrowLearnHub',
      description: 'Requested Class 11 book could not be found.',
    };
  }

  const canonical = `/class-11/books/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${board.name} Class 11 Book PDF | Punjab Board - GrowLearnHub`;
  const description = `${board.summary} Read online or choose English/Urdu medium and access chapter-wise navigation.`;

  return {
    title,
    description,
    keywords: [
      `${board.name} class 11 book pdf`,
      `punjab board class 11 ${board.name.toLowerCase()} book`,
      'class 11 books pdf',
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'GrowLearnHub',
      images: [{ url: board.image, alt: `${board.name} class 11 book` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: board.image, alt: `${board.name} class 11 book` }],
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const board = getClass11Board(params.board);

  if (!board) {
    notFound();
  }

  const canonical = `/class-11/books/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${board.name} Class 11 Book PDF`}
      image={board.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            {board.summary} Choose your preferred medium below to open the complete textbook.
          </p>
          <p className="text-foreground/80 mt-4">
            You can also return to{' '}
            <Link href="/class-11/books" className="font-medium text-primary hover:underline">
              Class 11 books list
            </Link>{' '}
            to explore other subjects.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Select Medium
          </h2>
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {board.mediums.map(medium => (
              <CardSmall
                key={medium.slug}
                title={`${board.name} ${medium.name}`}
                link={`class-11/books/${board.slug}/${medium.slug}`}
              />
            ))}
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
