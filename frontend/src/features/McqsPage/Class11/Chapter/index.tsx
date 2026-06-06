'use client';

import { useHeadingBySlug } from '@/hooks/use-public';
import Link from 'next/link';

interface Props {
  bookSlug: string;
  chapterSlug: string;
}

const CLASS_SLUG = 'class-11';

export default function Class11McqsBookChapterPage({ bookSlug, chapterSlug }: Props) {
  const { data, isLoading, error } = useHeadingBySlug(CLASS_SLUG, bookSlug, chapterSlug);

  if (isLoading) return <p>Loading headings...</p>;
  if (error) return <p>Failed to load headings.</p>;

  const headings = data?.data ?? [];

  return (
    <div className="space-y-4">
      {headings.length === 0 ? (
        <p>No headings found.</p>
      ) : (
        <ul className="grid gap-3">
          {headings.map((heading: any) => (
            <li key={heading.slug}>
              <Link
                href={`/${CLASS_SLUG}/mcqs/${bookSlug}/${chapterSlug}/${heading.slug}`}
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                {heading.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
