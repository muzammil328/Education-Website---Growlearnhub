'use client';

import { useChapterByClassAndBookSlug } from '@/hooks/use-public';
import Link from 'next/link';
import McqsInlineSection from '@/components/mcqs/McqsInlineSection';
import { Para } from '@muzammil328/ui';

interface Props {
  bookSlug: string;
}

const CLASS_SLUG = 'class-11';

export default function Class11McqsBookPage({ bookSlug }: Props) {
  const { data, isLoading, error } = useChapterByClassAndBookSlug(CLASS_SLUG, bookSlug);

  if (isLoading) return <Para>Loading chapters...</Para>;
  if (error) return <Para>Failed to load chapters.</Para>;

  const chapters = data?.data ?? [];

  return (
    <div className="space-y-6">
      {chapters.length === 0 ? (
        <Para>No chapters found.</Para>
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
