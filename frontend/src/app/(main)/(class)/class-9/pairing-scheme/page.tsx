import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import Link from 'next/link';
import { getPairingClass } from '@/utils/helpers/PairingSchemeDynamic';
import UnorderedList from '@/components/elements/list/UnorderedList';

const data = {
  title: '9th Class Pairing Scheme 2025 – Updated Paper Pattern for All Boards | GrowLearnHub',
  description:
    'Get the latest 9th Class Pairing Scheme 2025 for all Punjab Boards. Download subject-wise paper pattern and chapter-wise marks distribution in PDF format on GrowLearnHub.',
  keywords: [
    '9th class pairing scheme 2025',
    'class 9 paper scheme 2025',
    'Punjab board pairing scheme class 9',
    '9th class chapter-wise scheme',
    'class 9 marks distribution',
    'Lahore board paper scheme 9th',
    'Faisalabad board pairing scheme 2025',
    'Rawalpindi board class 9 scheme',
    'GrowLearnHub paper pattern',
  ],
  image: '/9th/class_9_pairing_scheme_growlearnhub.png',
  canonical: '/class-9/pairing-scheme/',
  url: 'https://growlearnhub.com/class-9/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  const classItem = getPairingClass('class-9');

  if (!classItem) {
    return null;
  }

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 9 Pairing Scheme 2025</h2>
          <p className="text-foreground/80">{classItem.summary}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Board Selection</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <CardSmall
              title={classItem.board.name}
              link={`class-9/pairing-scheme/${classItem.board.slug}`}
            />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Quick Subject Access</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {classItem.board.subjects.map(subject => (
              <CardSmall
                key={subject.slug}
                title={subject.name}
                link={`class-9/pairing-scheme/${classItem.board.slug}/${subject.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Why Use the Pairing Scheme?</h3>
          <UnorderedList
            items={[
              { description: 'Helps you focus on important chapters first' },
              { description: 'Clarifies question distribution across chapters' },
              { description: 'Reduces revision time with a targeted approach' },
              { description: 'Aligns your preparation with board exam pattern' },
            ]}
          />
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Explore More Classes</h3>
          <p className="text-foreground/80">
            Continue with{' '}
            <Link href="/class-10/pairing-scheme" className="text-primary hover:underline">
              Class 10
            </Link>
            ,{' '}
            <Link href="/class-11/pairing-scheme" className="text-primary hover:underline">
              Class 11
            </Link>
            , and{' '}
            <Link href="/class-12/pairing-scheme" className="text-primary hover:underline">
              Class 12
            </Link>{' '}
            pairing schemes.
          </p>
        </section>
      </article>
    </UserLayout>
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    type: 'website',
    siteName: 'GrowLearnHub',
    images: [{ url: data.image, alt: data.title }],
  },
  alternates: { canonical: data.canonical },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: { index: data.index, follow: data.follow },
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: { url: data.image, alt: data.title },
  },
};
