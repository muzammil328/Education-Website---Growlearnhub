import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const data = {
  title: 'Study Group | GrowLearnHub',
  description:
    'Join the GrowLearnHub study group to learn with peers, discuss concepts, and stay consistent with class-wise exam preparation.',
  image: '/single/study_group.webp',
  keywords: ['growlearnhub', 'growlearnhub study group', 'study group'],
  canonical: '/study-group/',
  url: 'https://growlearnhub.com/study-group/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <Heading2 className="line">
          Study Groups
        </Heading2>

        <div className="space-y-6">
          <Para>
            Join our study groups to collaborate with fellow students, share knowledge, and improve
            your learning experience.
          </Para>

          <Heading3>
            What Are Study Groups?
          </Heading3>
          <Para>
            Study groups are communities of students who come together to learn, discuss, and help
            each other succeed academically.
          </Para>

          <Heading3>
            Benefits of Study Groups
          </Heading3>
          <ul className="list">
            <li>Collaborative learning with peers</li>
            <li>Share notes and study materials</li>
            <li>Discuss difficult topics</li>
            <li>Stay motivated and accountable</li>
            <li>Learn different perspectives</li>
          </ul>

          <Heading3>
            How to Join
          </Heading3>
          <Para>
            Visit our community page or contact us to learn about available study groups and how to
            join. We welcome students from all classes and subjects.
          </Para>

          <Heading3>
            Create Your Own Group
          </Heading3>
          <Para>
            Want to start a study group with your classmates? Contact us and we&apos;ll help you set
            up and manage your own study group.
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
