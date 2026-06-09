import PastPaperClass9Board from '@/features/PastPaper/Class9/Subject';

export default async function Page({ params }: { params: Promise<{ board: string }> }) {
  const { board } = await params;
  return <PastPaperClass9Board boardSlug={board} />;
}
