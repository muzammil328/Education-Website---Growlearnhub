import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';

const data = {
  title: 'Disclaimer | GrowLearnHub',
  description:
    'Read the GrowLearnHub disclaimer to understand content limitations, informational use, and responsibilities when using our education resources.',
  image: '/single/disclaimer.webp',
  keywords: ['growlearnhub', 'growlearnhub disclaimer', 'disclaimer'],
  canonical: '/disclaimer/',
  url: 'https://growlearnhub.com/disclaimer/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <h2 className="line">
          Disclaimer
        </h2>

        <div className="space-y-6 ">
          <p>
            The information provided on Growlearnhub is for general educational purposes only. We
            strive to provide accurate and up-to-date content, but we make no warranties or
            representations about the completeness, accuracy, or reliability of any information on
            this website.
          </p>

          <h3>
            Educational Content
          </h3>
          <p>
            All study materials, past papers, MCQs, and other educational content on Growlearnhub
            are intended to supplement classroom learning. They should not replace formal
            instruction or textbooks.
          </p>

          <h3>
            Exam Preparation
          </h3>
          <p>
            While we strive to provide relevant exam preparation materials, we cannot guarantee that
            our materials will match actual exam questions. Past papers and guess papers are based
            on previous years&apos; patterns and should be used as practice only.
          </p>

          <h3>
            External Links
          </h3>
          <p>
            Our website may contain links to external websites. We are not responsible for the
            content or accuracy of these external sites.
          </p>

          <h3>
            No Professional Advice
          </h3>
          <p>
            The information on this website is not intended as professional academic or career
            advice. For specific guidance, please consult with qualified educators or professionals.
          </p>
        </div>
      </section>
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
