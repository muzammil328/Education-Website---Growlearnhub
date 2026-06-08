import React from 'react';
import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import ContactForm from '@/components/forms/ContactForm';

const data = {
  title: 'Contact Us | GrowLearnHub',
  description:
    'Contact GrowLearnHub for support, feedback, and academic resource inquiries. Reach our team quickly through the contact form.',
  image: '/single/contact_us.webp',
  keywords: ['growlearnhub', 'growlearnhub contact us', 'contact us'],
  canonical: '/contact-us/',
  url: 'https://growlearnhub.com/contact-us/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2>
            Get in Touch
          </h2>
          <p className="sm">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
        <ContactForm />
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
