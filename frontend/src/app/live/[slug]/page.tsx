import { generateMetadata, fetchMcqBySlug } from './metadata';
import McqDetailClient from './McqDetailClient';

export { generateMetadata };

export default async function LiveMcqDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initialData = await fetchMcqBySlug(slug);

  return <McqDetailClient slug={slug} initialData={initialData} />;
}
