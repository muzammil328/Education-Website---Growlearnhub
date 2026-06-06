import { Metadata } from 'next';
import Class9PairingSchemePage from '@/features/PairingScheme/Class9';

const data = {
  title: '9th Class Pairing Scheme 2025 – Updated Paper Pattern for All Boards | GrowLearnHub',
  description:
    'Get the latest 9th Class Pairing Scheme 2025 for all Punjab Boards. Download subject-wise paper pattern and chapter-wise marks distribution in PDF format on GrowLearnHub.',
  keywords: [
    '9th class pairing scheme 2025',
    'class 9 paper scheme 2025',
    'Punjab board pairing scheme class 9',
    '9th class chapter-wise scheme',
    'class 9 marks distribution',
    'Lahore board paper scheme 9th',
    'Faisalabad board pairing scheme 2025',
    'Rawalpindi board class 9 scheme',
    'GrowLearnHub paper pattern',
  ],
  image: '/9th/class_9_pairing_scheme_growlearnhub.png',
  canonical: '/class-9/pairing-scheme/',
  url: 'https://growlearnhub.com/class-9/pairing-scheme/',
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
  return <Class9PairingSchemePage />;
}
