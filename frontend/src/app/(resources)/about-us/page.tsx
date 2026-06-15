import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading1, Heading3, Para } from '@muzammil328/ui';

const data = {
  title: 'About Us | GrowLearnHub',
  description:
    'Learn about GrowLearnHub, our mission to support students, parents, and teachers with quality study resources, MCQs, notes, and online test preption.',
  image: '/single/about_us.webp',
  keywords: ['growlearnhub', 'growlearnhub about us', 'about us'],
  canonical: '/about-us/',
  url: 'https://growlearnhub.com/about-us/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <Heading1>
          About Growlearnhub
        </Heading1>

        <div className="space-y-6">
          <Para className="text-muted-foreground">
            Welcome to Growlearnhub, your premier destination for quality education and learning
            resources. We are dedicated to providing students with comprehensive study materials,
            past papers, MCQs, and online tests to help them succeed in their academic journey.
          </Para>

          <Para>
            Our platform covers a wide range of subjects and classes, from Class 9 to Class 12,
            including vocational education resources. We believe that education is the key to
            personal growth and societal development.
          </Para>

          <Heading3>
            Our Mission
          </Heading3>
          <Para>
            Our mission is to make quality education accessible to everyone. We strive to provide
            the best learning resources, tools, and support to help students achieve their full
            potential and excel in their studies.
          </Para>

          <Heading3>
            Our Vision
          </Heading3>
          <Para>
            We envision a world where every student has access to quality educational resources
            regardless of their background. Growlearnhub aims to be the go-to platform for students
            seeking to enhance their knowledge and academic performance.
          </Para>

          <Heading3>
            What We Offer
          </Heading3>
          <ul className="list">
            <li>Comprehensive study notes for all subjects</li>
            <li>Past papers and guess papers</li>
            <li>Multiple choice questions (MCQs)</li>
            <li>Online tests and quizzes</li>
            <li>Pairing schemes</li>
            <li>Date sheets and results</li>
            <li>Books and educational resources</li>
          </ul>
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
