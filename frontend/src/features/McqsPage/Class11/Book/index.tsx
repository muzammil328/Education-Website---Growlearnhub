'use client';

import { useChapterByClassAndBookSlug } from '@/hooks/use-public';
import Link from 'next/link';
import McqsInlineSection from '@/components/mcqs/McqsInlineSection';

interface Props {
  bookSlug: string;
}

const CLASS_SLUG = 'class-11';

export default function Class11McqsBookPage({ bookSlug }: Props) {
  const { data, isLoading, error } = useChapterByClassAndBookSlug(CLASS_SLUG, bookSlug);

  if (isLoading) return <p>Loading chapters...</p>;
  if (error) return <p>Failed to load chapters.</p>;

  const chapters = data?.data ?? [];

  return (
    <div className="space-y-6">
      {chapters.length === 0 ? (
        <p>No chapters found.</p>
      ) : (
        <ul className="grid gap-3">
          {chapters.map((chapter: any) => (
            <li key={chapter.slug}>
              <Link
                href={`/${CLASS_SLUG}/mcqs/${bookSlug}/${chapter.slug}`}
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                {chapter.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <McqsInlineSection classSlug={CLASS_SLUG} bookSlug={bookSlug} />
    </div>
  );
}
