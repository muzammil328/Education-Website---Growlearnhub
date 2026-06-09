import PastPaperClass12Chapter from '@/features/PastPaper/Class12/Chapter';

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <PastPaperClass12Chapter boardSlug={subject} chapterSlug={chapter} />;
}
