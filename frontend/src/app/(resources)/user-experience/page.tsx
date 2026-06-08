import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

const data = {
  title: 'User Experience | GrowLearnHub',
  description:
    'Explore the GrowLearnHub user experience and see how our platform is designed for simple, fast, and effective learning workflows.',
  image: '/single/user_experience.webp',
  keywords: ['growlearnhub', 'growlearnhub user experience', 'user experience'],
  canonical: '/user-experience/',
  url: 'https://growlearnhub.com/user-experience/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
          <h2 className="line">
            User Experience
          </h2>

          <div className="space-y-6 ">
            <p>
              At Growlearnhub, we are committed to providing an exceptional user experience. Our
              platform is designed to be intuitive, accessible, and helpful for students of all ages.
            </p>

            <h3>
              Easy Navigation
            </h3>
            <p>
              Our website features a clean, organized layout that makes it easy to find what
              you&apos;re looking for. Browse by class, subject, or content type with just a few
              clicks.
            </p>

            <h3>
              Mobile-Friendly Design
            </h3>
            <p>
              Access Growlearnhub from any device. Our responsive design ensures a seamless experience
              on desktops, tablets, and mobile phones.
            </p>

            <h3>
              Fast Loading
            </h3>
            <p>
              We understand the importance of quick access to educational materials. Our platform is
              optimized for fast loading times so you can focus on learning.
            </p>

            <h3>Accessibility</h3>
            <p>
              We strive to make our content accessible to all users. Our platform supports screen
              readers and includes features for users with visual impairments.
            </p>

            <h3>
              Feedback & Support
            </h3>
            <p>
              Have suggestions or encountered issues? Use our &quot;Report a Bug&quot; or
              &quot;Request Feature&quot; pages to help us improve your experience.
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
