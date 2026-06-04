import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import Link from 'next/link';
import { getPairingClass } from '@/utils/helpers/PairingSchemeDynamic';

const data = {
  title: '12th Class Pairing Scheme 2025 – All Boards | GrowLearnHub',
  description:
    'Download the official 12th Class Pairing Scheme 2025 for all Boards. Select your board below and get the updated paper scheme instantly on GrowLearnHub.',
  keywords: [
    '12th class pairing scheme 2025',
    'class 12 pairing scheme Punjab board',
    'paper pattern class 12',
    'Faisalabad board pairing scheme 12th',
    'Sargodha board pairing scheme 12th class',
    'Lahore board pairing scheme class 12',
    'Rawalpindi board paper scheme 12th',
    'chapter-wise scheme class 12',
    'GrowLearnHub pairing scheme',
  ],
  image: '/12th/class_12_pairing_scheme_growlearnhub.png',
  canonical: '/class-12/pairing-scheme/',
  url: 'https://growlearnhub.com/class-12/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  const classItem = getPairingClass('class-12');

  if (!classItem) {
    return null;
  }

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 12 Pairing Scheme 2025</h2>
          <p className="text-foreground/80">{classItem.summary}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Board Selection</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <CardSmall
              title={classItem.board.name}
              link={`class-12/pairing-scheme/${classItem.board.slug}`}
            />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Subject-wise Pairing Schemes</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {classItem.board.subjects.map(subject => (
              <CardSmall
                key={subject.slug}
                title={subject.name}
                link={`class-12/pairing-scheme/${classItem.board.slug}/${subject.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Related Resources</h3>
          <p className="text-foreground/80">
            For complete preparation, combine this scheme with{' '}
            <Link href="/class-12/books" className="text-primary hover:underline">
              Class 12 books
            </Link>{' '}
            and{' '}
            <Link href="/class-12/online-test" className="text-primary hover:underline">
              online tests
            </Link>{' '}
            to practice according to board pattern.
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
