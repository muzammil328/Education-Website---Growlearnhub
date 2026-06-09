import PastPaperClass9Chapter from '@/features/PastPaper/Class9/Chapter';

export default async function Page({ params }: { params: Promise<{ board: string; chapter: string }> }) {
  const { board, chapter } = await params;
  return <PastPaperClass9Chapter boardSlug={board} chapterSlug={chapter} />;
}
