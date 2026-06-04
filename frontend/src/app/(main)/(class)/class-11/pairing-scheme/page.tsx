import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import Link from 'next/link';
import { getPairingClass } from '@/utils/helpers/PairingSchemeDynamic';

const data = {
  title: '11th Class Pairing Scheme 2025 – All Boards | GrowLearnHub',
  description:
    'Download the official 11th Class Pairing Scheme 2025 for all Boards. Select your board below and get the updated paper scheme instantly on GrowLearnHub.',
  keywords: [
    '11th class pairing scheme 2025',
    'class 11 pairing scheme Punjab board',
    'paper pattern class 11',
    'Faisalabad board pairing scheme 11th',
    'Sargodha board pairing scheme 11th class',
    'Lahore board pairing scheme class 11',
    'Rawalpindi board paper scheme 11th',
    'chapter-wise scheme class 11',
    'GrowLearnHub pairing scheme',
  ],
  image: '/11th/class_11_pairing_scheme_growlearnhub.png',
  canonical: '/class-11/pairing-scheme/',
  url: 'https://growlearnhub.com/class-11/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  const classItem = getPairingClass('class-11');

  if (!classItem) {
    return null;
  }

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">Class 11 Pairing Scheme 2025</h2>
          <p className="text-foreground/80">{classItem.summary}</p>
        </header>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Board Selection</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <CardSmall
              title={classItem.board.name}
              link={`class-11/pairing-scheme/${classItem.board.slug}`}
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
                link={`class-11/pairing-scheme/${classItem.board.slug}/${subject.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Pairing Scheme Flow</h3>
          <p className="text-foreground/80">
            You can move between{' '}
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
            to maintain continuity in board exam planning.
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
