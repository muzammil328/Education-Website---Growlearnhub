import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

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
        <Heading2 className="line">
          Disclaimer
        </Heading2>

        <div className="space-y-6 ">
          <Para>
            The information provided on Growlearnhub is for general educational purposes only. We
            strive to provide accurate and up-to-date content, but we make no warranties or
            representations about the completeness, accuracy, or reliability of any information on
            this website.
          </Para>

          <Heading3>
            Educational Content
          </Heading3>
          <Para>
            All study materials, past papers, MCQs, and other educational content on Growlearnhub
            are intended to supplement classroom learning. They should not replace formal
            instruction or textbooks.
          </Para>

          <Heading3>
            Exam Preparation
          </Heading3>
          <Para>
            While we strive to provide relevant exam preparation materials, we cannot guarantee that
            our materials will match actual exam questions. Past papers and guess papers are based
            on previous years&apos; patterns and should be used as practice only.
          </Para>

          <Heading3>
            External Links
          </Heading3>
          <Para>
            Our website may contain links to external websites. We are not responsible for the
            content or accuracy of these external sites.
          </Para>

          <Heading3>
            No Professional Advice
          </Heading3>
          <Para>
            The information on this website is not intended as professional academic or career
            advice. For specific guidance, please consult with qualified educators or professionals.
          </Para>
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
