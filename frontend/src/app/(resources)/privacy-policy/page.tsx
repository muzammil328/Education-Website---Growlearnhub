import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Metadata } from 'next';

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
        <h2 className="line">
          Privacy Policy
        </h2>

        <div className="space-y-6">
          <p>
            At Growlearnhub, we take your privacy seriously. This Privacy Policy outlines how we
            collect, use, and protect your personal information.
          </p>

          <h3>
            Information We Collect
          </h3>
          <p>
            We may collect personal information such as your name, email address, and phone number
            when you contact us or use our services. We also collect non-personal information such
            as browser type and pages visited for analytical purposes.
          </p>

          <h3>
            How We Use Your Information
          </h3>
          <p>
            The information we collect is used to provide and improve our services, respond to your
            inquiries, and send you relevant updates about our platform.
          </p>

          <h3>
            Data Protection
          </h3>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h3>
            Third-Party Services
          </h3>
          <p>
            We may use third-party services for analytics and website functionality. These services
            have their own privacy policies governing their use of your information.
          </p>

          <h3>
            Contact Us
          </h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our
            Contact Us page.
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
