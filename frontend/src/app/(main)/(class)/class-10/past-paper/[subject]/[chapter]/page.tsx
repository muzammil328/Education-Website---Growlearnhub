import PastPaperClass10Chapter from '@/features/PastPaper/Class10/Chapter';

export default async function Page({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  return <PastPaperClass10Chapter boardSlug={subject} chapterSlug={chapter} />;
}
