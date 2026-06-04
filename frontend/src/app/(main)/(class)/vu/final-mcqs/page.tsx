import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { vuFinalMcqsData } from '@/utils/helpers/VU';

const data = {
  title: 'Virtual University Final Term Mcqs',
  description:
    'Final Term MCQs page offering extensive question banks, practice questions, answers, and detailed explanations to enhance learning.',
  keywords: [
    'growlearnhub',
    'final mcqs',
    'growlearnhub vu final mcqs',
    'vu final mcqs',
    'virtual university final mcqs',
  ],
  image: '/vu/vu_final_term_mcqs.webp',
  canonical: '/vu/final-mcqs/',
  url: 'https://growlearnhub.com/vu/final-mcqs/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {vuFinalMcqsData.map(data => {
          return (
            <CardSmall key={data.name} title={data.name} link={`vu/final-mcqs/${data.slug}`} />
          );
        })}
      </div>
    </UserLayout>
  );
}
// export const vuFinalMcqsData = [
//   {
//     name: "CS101 Final Mcqs",
//     slug: "cs101",
//   },
//   {
//     name: "CS201 Final Mcqs",
//     slug: "cs201",
//   },
//   {
//     name: "CS302 Final Mcqs",
//     slug: "cs302",
//   },
//   {
//     name: "ENG201 Final Mcqs",
//     slug: "eng201",
//   },
//   {
//     name: "MGT211 Final Mcqs",
//     slug: "mgt211",
//   },
// ];

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    images: [
      {
        url: data.image,
        alt: data.title,
      },
    ],
  },
  alternates: {
    canonical: data.canonical,
  },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: {
      index: data.index,
      follow: data.follow,
    },
  },
  twitter: {
    title: data.title,
    description: data.description,
    images: {
      url: data.image,
      alt: data.title,
    },
  },
};
