'use client';

import { useChapterDetail, useHeadingByClassAndSubjectAndChapterSlug } from '@/hooks/use-public';
import Link from 'next/link';
import McqsInlineSection from '@/components/mcqs/McqsInlineSection';
import { Heading2, Para } from '@muzammil328/ui';

interface Props {
  bookSlug: string;
  chapterSlug: string;
}

const CLASS_SLUG = 'class-9';

export default function Class9McqsBookChapterPage({ bookSlug, chapterSlug }: Props) {
  const { data: chapterData } = useChapterDetail(CLASS_SLUG, bookSlug, chapterSlug);
  const { data, isLoading, error } = useHeadingByClassAndSubjectAndChapterSlug(CLASS_SLUG, bookSlug, chapterSlug);

  const chapterInfo = chapterData?.data?.chapter;

  if (isLoading) return <Para>Loading headings...</Para>;
  if (error) return <Para>Failed to load headings.</Para>;

  const headings = data?.data ?? [];

  return (
    <div className="space-y-6">
      {chapterInfo && (
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {chapterInfo.order ? `Chapter ${chapterInfo.order} ${chapterInfo.name} - Class 9 MCQs` : `${chapterInfo.name} - Class 9 MCQs`}
          </Heading2>
          {chapterInfo.description && (
            <Para className="text-base">
              {chapterInfo.description}
            </Para>
          )}
          {!chapterInfo.description && (
            <Para className="text-base">
              Practice chapter-wise MCQs for Class 9 {chapterInfo.name}. Test your understanding with multiple-choice questions covering all key topics.
            </Para>
          )}
        </header>
      )}
      {headings.length === 0 ? (
        <Para>No headings found.</Para>
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
      <McqsInlineSection classSlug={CLASS_SLUG} bookSlug={bookSlug} chapterSlug={chapterSlug} />
    </div>
  );
}
