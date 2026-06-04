import type { Metadata } from 'next';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { getDateSheetClass, PUNJAB_BOARDS } from '@/utils/helpers/ResultDateSheetDynamic';

const CLASS_SLUG = 'class-12';

export function generateMetadata(): Metadata {
  const classItem = getDateSheetClass(CLASS_SLUG);

  if (!classItem) {
    return {
      title: 'Date Sheet Page Not Found | GrowLearnHub',
      description: 'Requested date sheet page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/date-sheet/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${classItem.classShortName} Date Sheet 2025 - All Punjab Boards | GrowLearnHub`;
  const description = `Find ${classItem.classShortName} date sheet 2025 board-wise and plan your paper preparation according to the official schedule.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${classItem.classShortName.toLowerCase()} exam schedule`,
      `${classItem.classShortName.toLowerCase()} board date sheet`,
      'Punjab board date sheet 2025',
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

export default function Page() {
  const classItem = getDateSheetClass(CLASS_SLUG);

  if (!classItem) {
    return null;
  }

  const canonical = `/${CLASS_SLUG}/date-sheet/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${classItem.className} Date Sheet 2025`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">
            {classItem.className} Date Sheet 2025
          </h2>
          <p className="text-foreground/80">{classItem.summary}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Board-wise Date Sheet Links</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PUNJAB_BOARDS.map(board => (
              <CardSmall
                key={board.slug}
                title={board.name}
                link={`${CLASS_SLUG}/date-sheet/${board.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">
            How to Use Date Sheet Effectively
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Prioritize difficult subjects scheduled earlier in the exam window.</li>
            <li>Build daily revision slots around the official exam sequence.</li>
            <li>Keep buffer days for past paper practice and quick revision.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Resources</h3>
          <p className="text-foreground/80">
            Continue with{' '}
            <Link href={`/${CLASS_SLUG}/result`} className="text-primary hover:underline">
              result updates
            </Link>{' '}
            and{' '}
            <Link href={`/${CLASS_SLUG}/online-test`} className="text-primary hover:underline">
              online tests
            </Link>{' '}
            to strengthen exam readiness.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
