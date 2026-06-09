import type { Metadata } from 'next';
import ResultBoardClass12 from '@/features/Result/Class12/Board';

type Params = { board: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { board } = await params;
  const boardName = board.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const title = `Class 12 Result 2025 – ${boardName} | GrowLearnHub`;
  const canonical = `/class-12/result/${board}/`;
  return {
    title,
    description: `Download and view the Class 12 annual result 2025 for ${boardName}. PDF preview available.`,
    alternates: { canonical },
    openGraph: { title, url: `https://growlearnhub.com${canonical}`, type: 'website', siteName: 'GrowLearnHub' },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { board } = await params;
  return <ResultBoardClass12 boardSlug={board} />;
}
