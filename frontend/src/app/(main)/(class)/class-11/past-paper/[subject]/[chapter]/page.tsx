import PastPaperClass11Chapter from '@/features/PastPaper/Class11/Chapter';

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <PastPaperClass11Chapter boardSlug={subject} chapterSlug={chapter} />;
}
