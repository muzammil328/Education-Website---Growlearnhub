'use client';

import { useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug } from '@/hooks/use-public';
import Link from 'next/link';
import McqsInlineSection from '@/components/mcqs/McqsInlineSection';

interface Props {
  bookSlug: string;
  chapterSlug: string;
  headingSlug: string;
}

const CLASS_SLUG = 'class-9';

export default function Class9McqsHeadingPage({ bookSlug, chapterSlug, headingSlug }: Props) {
  const { data, isLoading, error } = useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug(
    CLASS_SLUG,
    bookSlug,
    chapterSlug,
    headingSlug
  );

  if (isLoading) return <p>Loading subheadings...</p>;
  if (error) return <p>Failed to load subheadings.</p>;

  const subHeadings = data?.data ?? [];

  return (
    <div className="space-y-6">
      {subHeadings.length === 0 ? (
        <p>No subheadings found.</p>
      ) : (
        <ul className="grid gap-3">
          {subHeadings.map((subHeading: any) => (
            <li key={subHeading.slug}>
              <Link
                href={`/live/mcqs?class=${CLASS_SLUG}&book=${bookSlug}&chapter=${chapterSlug}&heading=${headingSlug}&subHeading=${subHeading.slug}`}
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                {subHeading.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <McqsInlineSection
        classSlug={CLASS_SLUG}
        bookSlug={bookSlug}
        chapterSlug={chapterSlug}
        headingSlug={headingSlug}
      />
    </div>
  );
}
