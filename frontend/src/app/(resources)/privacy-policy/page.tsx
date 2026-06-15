import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const data = {
  title: 'Privacy Policy | GrowLearnHub',
  description:
    'Read the GrowLearnHub privacy policy to learn how we collect, use, and protect your personal information on our platform.',
  image: '/single/privacy_policy.webp',
  keywords: ['growlearnhub', 'growlearnhub privacy policy', 'privacy policy'],
  canonical: '/privacy-policy/',
  url: 'https://growlearnhub.com/privacy-policy/',
  index: false,
  follow: false,
};

export default function page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <Heading2 className="line">
          Privacy Policy
        </Heading2>

        <div className="space-y-6">
          <Para>
            At Growlearnhub, we take your privacy seriously. This Privacy Policy outlines how we
            collect, use, and protect your personal information.
          </Para>

          <Heading3>
            Information We Collect
          </Heading3>
          <Para>
            We may collect personal information such as your name, email address, and phone number
            when you contact us or use our services. We also collect non-personal information such
            as browser type and pages visited for analytical purposes.
          </Para>

          <Heading3>
            How We Use Your Information
          </Heading3>
          <Para>
            The information we collect is used to provide and improve our services, respond to your
            inquiries, and send you relevant updates about our platform.
          </Para>

          <Heading3>
            Data Protection
          </Heading3>
          <Para>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </Para>

          <Heading3>
            Third-Party Services
          </Heading3>
          <Para>
            We may use third-party services for analytics and website functionality. These services
            have their own privacy policies governing their use of your information.
          </Para>

          <Heading3>
            Contact Us
          </Heading3>
          <Para>
            If you have any questions about this Privacy Policy, please contact us through our
            Contact Us page.
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
