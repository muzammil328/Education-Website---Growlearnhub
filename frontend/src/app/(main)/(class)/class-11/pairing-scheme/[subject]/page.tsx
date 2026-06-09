import type { Metadata } from 'next';
import PairingSchemeClass11Board from '@/features/PairingScheme/Class11/Subject';

type Params = { subject: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { subject } = await params;
  const boardName = subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const title = `Class 11 Pairing Scheme 2025 – ${boardName} | GrowLearnHub`;
  const canonical = `/class-11/pairing-scheme/${subject}/`;
  return {
    title,
    description: `View and download the Class 11 pairing scheme 2025 for ${boardName}. Chapter-wise paper pattern image.`,
    alternates: { canonical },
    openGraph: { title, url: `https://growlearnhub.com${canonical}`, type: 'website', siteName: 'GrowLearnHub' },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { subject } = await params;
  return <PairingSchemeClass11Board boardSlug={subject} />;
}
