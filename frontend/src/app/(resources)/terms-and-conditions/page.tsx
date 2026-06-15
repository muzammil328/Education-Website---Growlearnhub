import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const data = {
  title: 'Terms and Conditions | GrowLearnHub',
  description:
    'Read GrowLearnHub terms and conditions for account usage, content policies, and platform rules before using our educational services.',
  image: '/single/term_and_condition.webp',
  keywords: ['growlearnhub', 'growlearnhub term and condition', 'term and condition'],
  canonical: '/terms-and-conditions/',
  url: 'https://growlearnhub.com/terms-and-conditions/',
  index: true,
  follow: true,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
          <Heading2 className="line">
            Terms and Conditions
          </Heading2>

          <div className="space-y-6 ">
            <Para>
              Welcome to Growlearnhub. By accessing and using our website, you agree to be bound by
              these Terms and Conditions.
            </Para>

            <Heading3>
              Use of Website
            </Heading3>
            <Para>
              You may use our website for educational purposes only. You agree not to use the website
              for any unlawful purpose or in any way that could damage, disable, or impair the
              website.
            </Para>

            <Heading3>
              Intellectual Property
            </Heading3>
            <Para>
              All content on Growlearnhub, including study materials, past papers, and other
              resources, are protected by copyright laws. You may download materials for personal
              educational use only.
            </Para>

            <Heading3>
              User Accounts
            </Heading3>
            <Para>
              If you create an account on our website, you are responsible for maintaining the
              confidentiality of your account and password.
            </Para>

            <Heading3>
              Disclaimer
            </Heading3>
            <Para>
              The information provided on Growlearnhub is for educational purposes only. We strive to
              provide accurate information but make no warranties about the completeness or accuracy
              of any content.
            </Para>

            <Heading3>
              Changes to Terms
            </Heading3>
            <Para>
              We reserve the right to modify these Terms and Conditions at any time. Your continued
              use of the website constitutes acceptance of any changes.
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
