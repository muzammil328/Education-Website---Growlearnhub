import PastPaperClass11Board from '@/features/PastPaper/Class11/Subject';

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <PastPaperClass11Board boardSlug={subject} />;
}
