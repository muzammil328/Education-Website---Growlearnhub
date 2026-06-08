import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';

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
        <h2 className="line">Cookies Policy</h2>

        <div className="space-y-6">
          <p>
            This Cookies Policy explains what Cookies are and how Growlearnhub uses them.
          </p>

          <h3>What Are Cookies</h3>
          <p>
            Cookies are small text files stored on your device when you visit websites. They help
            websites remember your preferences and improve your browsing experience.
          </p>

          <h3>How We Use Cookies</h3>
          <p>Growlearnhub uses cookies to:</p>
          <ul className="list">
            <li>Understand how you use our website</li>
            <li>Improve our services and user experience</li>
            <li>Remember your preferences</li>
            <li>Analyze traffic and trends</li>
          </ul>

          <h3>Managing Cookies</h3>
          <p>
            You can control or disable cookies through your browser settings. However, disabling
            cookies may affect the functionality of our website.
          </p>

          <h3>Third-Party Cookies</h3>
          <p>
            We may use third-party analytics services that set their own cookies. These third parties
            have their own privacy policies.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have questions about our Cookies Policy, please contact us.
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
