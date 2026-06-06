import React from 'react';
import Link from 'next/link';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { PUNJAB_BOARDS } from '@/utils/helpers/ResultDateSheetDynamic';

export default function Class10PairingSchemePage({
  title,
  image,
  canonical,
  url,
  classSlug,
  description,
}: {
  title: string;
  image: string;
  canonical: string;
  url: string;
  classSlug: string;
  description: string;
}) {
  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          <p className="text-foreground/80">{description}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Choose Your Board</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PUNJAB_BOARDS.map(board => (
              <CardSmall
                key={board.slug}
                title={board.name}
                link={`${classSlug}/result/${board.slug}`}
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
            <Link href={`/${classSlug}/date-sheet`} className="text-primary hover:underline">
              date sheet
            </Link>{' '}
            and{' '}
            <Link href={`/${classSlug}/pairing-scheme`} className="text-primary hover:underline">
              pairing scheme
            </Link>{' '}
            pages for complete exam preparation.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}
