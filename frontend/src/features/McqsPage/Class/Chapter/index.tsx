import React from 'react';
import { Heading2 } from '@muzammil328/ui';
import { SectionGrid } from '@/features/McqsPage/server/McqSections';

interface ClassWiseChaptersProps {
  classSlug: string;
  className: string;
  bookSlug: string;
  bookName: string;
  heading: string;
  intro: string;
  emptyMessage: string;
}

export default async function ClassWiseChapters({
  classSlug,
  className,
  bookSlug,
  bookName,
  heading,
  intro,
  emptyMessage,
}: ClassWiseChaptersProps) {
  const chapters = await getChaptersByClassAndBookName(className, bookName);

  return (
    <>
      <header className="space-y-3">
        <Heading2 className="mb-2" weight="bold" size="sm">
          {heading}
        </Heading2>
        <p className="text-base">{intro}</p>
      </header>

      <SectionGrid
        title="Chapters"
        emptyMessage={emptyMessage}
        items={chapters.map(chapter => ({
          title: chapter.name,
          link: `/${classSlug}/mcqs/${bookSlug}/${chapter.slug}`,
        }))}
      />
    </>
  );
}
