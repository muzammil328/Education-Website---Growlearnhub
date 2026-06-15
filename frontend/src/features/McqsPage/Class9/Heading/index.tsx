'use client';

import McqsInlineSection from '@/components/mcqs/McqsInlineSection';

interface Props {
  bookSlug: string;
  chapterSlug: string;
  headingSlug: string;
}

const CLASS_SLUG = 'class-9';

export default function Class9McqsHeadingPage({ bookSlug, chapterSlug, headingSlug }: Props) {
  return (
    <div className="space-y-6">
      <McqsInlineSection
        classSlug={CLASS_SLUG}
        bookSlug={bookSlug}
        chapterSlug={chapterSlug}
        headingSlug={headingSlug}
      />
    </div>
  );
}
