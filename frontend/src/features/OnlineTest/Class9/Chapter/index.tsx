'use client';
import React from 'react';
import { OnlineTestPageSkeleton } from '@/components/QuizSkeleton';
import { decodeRouteParam, toClassDisplayName, toDisplayName } from '@/lib/class-filter';

export default function OnlineTestClass9ChapterPage({
  className,
  bookSlug,
  chapterSlug,
  bookName,
  chapterName,
}: {
  className: string;
  bookSlug: string;
  chapterSlug: string;
  bookName?: string;
  chapterName?: string;
}) {
  const normalizedClassName = toClassDisplayName(className);
  const normalizedBookName = bookName ? decodeRouteParam(bookName) : toDisplayName(bookSlug);
  const normalizedChapterName = chapterName
    ? decodeRouteParam(chapterName)
    : toDisplayName(chapterSlug);

  const [headings, setHeadings] = React.useState<Array<{ headingId?: string; name: string }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchHeadings = async () => {
      try {
        setLoading(true);
        setError(null);

        const items = await getHeadingsByClassAndBookAndChapterName(
          normalizedClassName,
          normalizedBookName,
          normalizedChapterName
        );

        if (!isMounted) {
          return;
        }

        setHeadings(items.map(item => ({ headingId: item.headingId, name: item.name })));
      } catch {
        if (isMounted) {
          setError('Failed to load headings');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchHeadings();

    return () => {
      isMounted = false;
    };
  }, [normalizedBookName, normalizedChapterName, normalizedClassName]);

  if (loading) return <OnlineTestPageSkeleton />;

  if (error)
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Failed to load headings</p>
        <p className="mt-1 text-sm text-red-600">Please try again in a moment.</p>
      </div>
    );

  if (!headings?.length)
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="font-medium text-amber-700">No headings found</p>
        <p className="mt-1 text-sm text-amber-600">
          There are no headings available for this chapter.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      {headings.map(heading => (
        <div
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          key={heading.headingId || heading.name}
        >
          <h2 className="text-lg font-semibold mb-1">{heading.name}</h2>
          <p className="text-sm text-muted-foreground">Heading available for online test flow.</p>
        </div>
      ))}
    </div>
  );
}
