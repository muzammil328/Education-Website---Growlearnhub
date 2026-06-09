import PastPaperClass10Board from '@/features/PastPaper/Class10/Subject';

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <PastPaperClass10Board boardSlug={subject} />;
}
