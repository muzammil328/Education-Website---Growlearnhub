import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

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
          <Heading2 className="line">
            User Experience
          </Heading2>

          <div className="space-y-6 ">
            <Para>
              At Growlearnhub, we are committed to providing an exceptional user experience. Our
              platform is designed to be intuitive, accessible, and helpful for students of all ages.
            </Para>

            <Heading3>
              Easy Navigation
            </Heading3>
            <Para>
              Our website features a clean, organized layout that makes it easy to find what
              you&apos;re looking for. Browse by class, subject, or content type with just a few
              clicks.
            </Para>

            <Heading3>
              Mobile-Friendly Design
            </Heading3>
            <Para>
              Access Growlearnhub from any device. Our responsive design ensures a seamless experience
              on desktops, tablets, and mobile phones.
            </Para>

            <Heading3>
              Fast Loading
            </Heading3>
            <Para>
              We understand the importance of quick access to educational materials. Our platform is
              optimized for fast loading times so you can focus on learning.
            </Para>

            <Heading3>Accessibility</Heading3>
            <Para>
              We strive to make our content accessible to all users. Our platform supports screen
              readers and includes features for users with visual impairments.
            </Para>

            <Heading3>
              Feedback & Support
            </Heading3>
            <Para>
              Have suggestions or encountered issues? Use our &quot;Report a Bug&quot; or
              &quot;Request Feature&quot; pages to help us improve your experience.
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
