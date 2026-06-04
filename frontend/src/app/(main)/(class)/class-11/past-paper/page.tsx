import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { Heading2 } from '@muzammil328/ui';
import { getPastPaperClass, PAST_PAPER_BOARDS } from '@/utils/helpers/PastPaperAndNotesDynamic';

const CLASS_SLUG = 'class-11';

export function generateMetadata(): Metadata {
  const classItem = getPastPaperClass(CLASS_SLUG);
  if (!classItem) return { title: 'Past Papers' };

  const title = `${classItem.className} Past Papers 2025 – All Boards | GrowLearnHub`;
  const description = `Download solved and unsolved ${classItem.classShortName} past papers for all boards. Choose your board below to get past papers instantly at GrowLearnHub.`;

  return {
    title,
    description,
    keywords: [...classItem.keywords],
    openGraph: {
      title,
      description,
      url: `https://growlearnhub.com/${CLASS_SLUG}/past-paper/`,
      images: [{ url: classItem.image, alt: title }],
    },
    alternates: { canonical: `/${CLASS_SLUG}/past-paper/` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    twitter: { title, description, images: { url: classItem.image, alt: title } },
  };
}

export default function Page() {
  const classItem = getPastPaperClass(CLASS_SLUG);

  if (!classItem) {
    return <div>Class not found</div>;
  }

  return (
    <UserLayout
      title={`${classItem.className} Past Papers 2025`}
      image={classItem.image}
      canonical={`/${CLASS_SLUG}/past-paper/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/past-paper/`}
    >
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {classItem.className} Past Papers – 2025
          </Heading2>
          <p className="text-base">{classItem.summary}</p>
        </header>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Select Your Board</h3>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PAST_PAPER_BOARDS.map(board => (
              <CardSmall
                key={board.slug}
                title={board.name}
                link={`${CLASS_SLUG}/past-paper/${board.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">How to Use Past Papers</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Understand patterns:</strong> Review past papers to learn recurring question
              types and exam structure
            </li>
            <li>
              <strong>Practice timing:</strong> Solve papers under timed conditions to improve speed
              and accuracy
            </li>
            <li>
              <strong>Identify weak areas:</strong> Use results to focus study efforts on
              challenging topics
            </li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">Related Resources</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/${CLASS_SLUG}/date-sheet`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Date Sheet
            </a>
            <a
              href={`/${CLASS_SLUG}/pairing-scheme`}
              className="inline-block rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
            >
              Pairing Scheme
            </a>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
