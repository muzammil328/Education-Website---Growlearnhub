import PastPaperClass12Board from '@/features/PastPaper/Class12/Subject';

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <PastPaperClass12Board boardSlug={subject} />;
}
