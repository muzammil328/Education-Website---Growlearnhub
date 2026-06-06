import { Metadata } from 'next';
import Class11PairingSchemePage from '@/features/PairingScheme/Class11';

const data = {
  title: '11th Class Pairing Scheme 2025 \u2013 All Boards | GrowLearnHub',
  description:
    'Download the official 11th Class Pairing Scheme 2025 for all Boards. Select your board below and get the updated paper scheme instantly on GrowLearnHub.',
  keywords: [
    '11th class pairing scheme 2025',
    'class 11 pairing scheme Punjab board',
    'paper pattern class 11',
    'Faisalabad board pairing scheme 11th',
    'Sargodha board pairing scheme 11th class',
    'Lahore board pairing scheme class 11',
    'Rawalpindi board paper scheme 11th',
    'chapter-wise scheme class 11',
    'GrowLearnHub pairing scheme',
  ],
  image: '/11th/class_11_pairing_scheme_growlearnhub.png',
  canonical: '/class-11/pairing-scheme/',
  url: 'https://growlearnhub.com/class-11/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  return <Class11PairingSchemePage />;
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    type: 'website',
    siteName: 'GrowLearnHub',
    images: [{ url: data.image, alt: data.title }],
  },
  alternates: { canonical: data.canonical },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: { index: data.index, follow: data.follow },
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: { url: data.image, alt: data.title },
  },
};
