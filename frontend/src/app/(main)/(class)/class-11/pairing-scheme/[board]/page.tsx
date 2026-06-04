import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { getPairingBoard, getPairingClass } from '@/utils/helpers/PairingSchemeDynamic';

type Params = { board: string };

export function generateStaticParams() {
  const classItem = getPairingClass('class-11');

  if (!classItem) {
    return [];
  }

  return [{ board: classItem.board.slug }];
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const classItem = getPairingClass('class-11');
  const board = classItem ? getPairingBoard(classItem, params.board) : undefined;

  if (!classItem || !board) {
    return {
      title: 'Class 11 Pairing Scheme Board Not Found | GrowLearnHub',
      description: 'Requested Class 11 pairing scheme board page could not be found.',
    };
  }

  const canonical = `/class-11/pairing-scheme/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${classItem.classShortName} ${board.name} Pairing Scheme 2025 | GrowLearnHub`;
  const description = `Explore ${classItem.classShortName} ${board.name} subject-wise pairing schemes for Biology, Chemistry, Physics, and Math.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${classItem.classShortName.toLowerCase()} ${board.slug} pairing scheme`,
      `${classItem.className.toLowerCase()} subject wise paper pattern`,
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

  if (!classItem || !board) {
    notFound();
  }

  const canonical = `/class-11/pairing-scheme/${board.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${classItem.className} ${board.name} Pairing Scheme`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section>
          <h2 className="text-2xl font-semibold text-primary">Subject-wise Pairing Scheme</h2>
          <p className="text-foreground/80">
            Choose a subject to open the {classItem.className} {board.name} pairing scheme page with
            chapter-focused preparation guidance.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Available Subjects</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {board.subjects.map(subject => (
              <CardSmall
                key={subject.slug}
                title={subject.name}
                link={`class-11/pairing-scheme/${board.slug}/${subject.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/class-11/pairing-scheme"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Back to Class 11 Pairing Scheme
            </Link>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
