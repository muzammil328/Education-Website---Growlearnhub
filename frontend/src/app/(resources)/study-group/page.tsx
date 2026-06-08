import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

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
        <h2 className="line">
          Study Groups
        </h2>

        <div className="space-y-6">
          <p>
            Join our study groups to collaborate with fellow students, share knowledge, and improve
            your learning experience.
          </p>

          <h3>
            What Are Study Groups?
          </h3>
          <p>
            Study groups are communities of students who come together to learn, discuss, and help
            each other succeed academically.
          </p>

          <h3>
            Benefits of Study Groups
          </h3>
          <ul className="list">
            <li>Collaborative learning with peers</li>
            <li>Share notes and study materials</li>
            <li>Discuss difficult topics</li>
            <li>Stay motivated and accountable</li>
            <li>Learn different perspectives</li>
          </ul>

          <h3>
            How to Join
          </h3>
          <p>
            Visit our community page or contact us to learn about available study groups and how to
            join. We welcome students from all classes and subjects.
          </p>

          <h3>
            Create Your Own Group
          </h3>
          <p>
            Want to start a study group with your classmates? Contact us and we&apos;ll help you set
            up and manage your own study group.
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
