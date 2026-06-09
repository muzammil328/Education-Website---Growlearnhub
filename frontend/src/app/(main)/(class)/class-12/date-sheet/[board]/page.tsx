import type { Metadata } from 'next';
import DateSheetClass12Board from '@/features/DateSheet/Class12/Board';

type Params = { board: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { board } = await params;
  const boardName = board.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const title = `Class 12 Date Sheet 2025 – ${boardName} | GrowLearnHub`;
  const canonical = `/class-12/date-sheet/${board}/`;
  return {
    title,
    description: `View and download the Class 12 date sheet 2025 for ${boardName}. Official exam schedule image.`,
    alternates: { canonical },
    openGraph: { title, url: `https://growlearnhub.com${canonical}`, type: 'website', siteName: 'GrowLearnHub' },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { board } = await params;
  return <DateSheetClass12Board boardSlug={board} />;
}
