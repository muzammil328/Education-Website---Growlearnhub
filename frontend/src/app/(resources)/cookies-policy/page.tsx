import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const data = {
  title: 'Cookies Policy | GrowLearnHub',
  description:
    'Review the GrowLearnHub cookies policy to understand how cookies are used to improve performance, analytics, and user experience.',
  image: '/single/cookies_policy.webp',
  keywords: ['growlearnhub', 'growlearnhub cookies policy', 'cookies policy'],
  canonical: '/cookies-policy/',
  url: 'https://growlearnhub.com/cookies-policy/',
  index: false,
  follow: false,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <Heading2 className="line">Cookies Policy</Heading2>

        <div className="space-y-6">
          <Para>
            This Cookies Policy explains what Cookies are and how Growlearnhub uses them.
          </Para>

          <Heading3>What Are Cookies</Heading3>
          <Para>
            Cookies are small text files stored on your device when you visit websites. They help
            websites remember your preferences and improve your browsing experience.
          </Para>

          <Heading3>How We Use Cookies</Heading3>
          <Para>Growlearnhub uses cookies to:</Para>
          <ul className="list">
            <li>Understand how you use our website</li>
            <li>Improve our services and user experience</li>
            <li>Remember your preferences</li>
            <li>Analyze traffic and trends</li>
          </ul>

          <Heading3>Managing Cookies</Heading3>
          <Para>
            You can control or disable cookies through your browser settings. However, disabling
            cookies may affect the functionality of our website.
          </Para>

          <Heading3>Third-Party Cookies</Heading3>
          <Para>
            We may use third-party analytics services that set their own cookies. These third parties
            have their own privacy policies.
          </Para>

          <Heading3>Contact Us</Heading3>
          <Para>
            If you have questions about our Cookies Policy, please contact us.
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
