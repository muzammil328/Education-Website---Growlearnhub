import type { Metadata } from 'next';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { getResultClass, PUNJAB_BOARDS } from '@/utils/helpers/ResultDateSheetDynamic';

const CLASS_SLUG = 'class-11';

export function generateMetadata(): Metadata {
  const classItem = getResultClass(CLASS_SLUG);

  if (!classItem) {
    return {
      title: 'Result Page Not Found | GrowLearnHub',
      description: 'Requested result page could not be found.',
    };
  }

  const canonical = `/${CLASS_SLUG}/result/`;
  const url = `https://growlearnhub.com${canonical}`;
  const title = `${classItem.classShortName} Result 2025 - Check by Roll Number and Name | GrowLearnHub`;
  const description = `Check ${classItem.classShortName} result 2025 for all Punjab boards. Select your board and access official result guidance by roll number and name.`;

  return {
    title,
    description,
    keywords: [
      ...classItem.keywords,
      `${classItem.classShortName.toLowerCase()} result by name`,
      `${classItem.classShortName.toLowerCase()} result by roll number`,
      'Punjab board result 2025',
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
  const classItem = getResultClass(CLASS_SLUG);

  if (!classItem) {
    return null;
  }

  const canonical = `/${CLASS_SLUG}/result/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${classItem.className} Result 2025`}
      image={classItem.image}
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">{classItem.className} Result 2025</h2>
          <p className="text-foreground/80">{classItem.summary}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Choose Your Board</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PUNJAB_BOARDS.map(board => (
              <CardSmall
                key={board.slug}
                title={board.name}
                link={`${CLASS_SLUG}/result/${board.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Result Checking Methods</h3>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Check by roll number for fastest lookup on result day.</li>
            <li>Check by name when roll number is unavailable.</li>
            <li>Save and print your provisional marksheet for admissions.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Pages</h3>
          <p className="text-foreground/80">
            Explore{' '}
            <Link href={`/${CLASS_SLUG}/date-sheet`} className="text-primary hover:underline">
              date sheet
            </Link>{' '}
            and{' '}
            <Link href={`/${CLASS_SLUG}/pairing-scheme`} className="text-primary hover:underline">
              pairing scheme
            </Link>{' '}
            pages for complete exam preparation.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
