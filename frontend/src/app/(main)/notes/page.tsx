import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

const data = {
  title: 'Notes – All Classes | GrowLearnHub',
  description:
    'Browse class-wise notes for Matric, Intermediate, and other academic levels. Find chapter-wise and subject-wise study material for better exam preparation on GrowLearnHub.',
  image: '/notes/class_9_notes.webp',
  keywords: [
    'class notes all classes',
    '9th class notes',
    '10th class notes',
    '11th class notes',
    '12th class notes',
    'intermediate notes',
    'chapter-wise notes',
    'study notes',
    'growlearnhub notes',
    'class wise notes',
  ],
  canonical: '/notes/',
  url: 'https://growlearnhub.com/notes/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-3xl font-bold text-primary">Notes</h1>
        <p className="text-lg text-muted-foreground">Coming Soon</p>
      </div>
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
    type: 'website',
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
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.image],
  },
};
