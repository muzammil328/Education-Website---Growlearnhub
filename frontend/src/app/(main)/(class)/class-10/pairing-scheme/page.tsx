import { Metadata } from 'next';
import Class10PairingSchemePage from '@/features/PairingScheme/Class10';

const data = {
  title: '10th Class Pairing Scheme 2025 \u2013 All Boards | GrowLearnHub',
  description:
    'Download the official 10th Class Pairing Scheme 2025 for all Boards. Select your board below and get the updated paper scheme instantly on GrowLearnHub.',
  keywords: [
    '10th class pairing scheme 2025',
    'class 10 pairing scheme Punjab board',
    'paper pattern class 10',
    'Faisalabad board pairing scheme 10th',
    'Sargodha board pairing scheme 10th class',
    'Lahore board pairing scheme class 10',
    'Rawalpindi board paper scheme 10th',
    'chapter-wise scheme class 10',
    'GrowLearnHub pairing scheme',
  ],
  image: '/10th/class_10_pairing_scheme_growlearnhub.png',
  canonical: '/class-10/pairing-scheme/',
  url: 'https://growlearnhub.com/class-10/pairing-scheme/',
  index: true,
  follow: true,
};

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

export default function Page() {
  return <Class10PairingSchemePage />;
}
