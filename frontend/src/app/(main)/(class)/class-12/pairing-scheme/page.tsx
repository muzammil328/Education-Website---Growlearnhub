import { Metadata } from 'next';
import Class12PairingSchemePage from '@/features/PairingScheme/Class12';

const data = {
  title: '12th Class Pairing Scheme 2025 \u2013 All Boards | GrowLearnHub',
  description:
    'Download the official 12th Class Pairing Scheme 2025 for all Boards. Select your board below and get the updated paper scheme instantly on GrowLearnHub.',
  keywords: [
    '12th class pairing scheme 2025',
    'class 12 pairing scheme Punjab board',
    'paper pattern class 12',
    'Faisalabad board pairing scheme 12th',
    'Sargodha board pairing scheme 12th class',
    'Lahore board pairing scheme class 12',
    'Rawalpindi board paper scheme 12th',
    'chapter-wise scheme class 12',
    'GrowLearnHub pairing scheme',
  ],
  image: '/12th/class_12_pairing_scheme_growlearnhub.png',
  canonical: '/class-12/pairing-scheme/',
  url: 'https://growlearnhub.com/class-12/pairing-scheme/',
  index: true,
  follow: true,
};

export default function Page() {
  return <Class12PairingSchemePage />;
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
