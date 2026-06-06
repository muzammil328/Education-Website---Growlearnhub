import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import { Heading2 } from '@muzammil328/ui';
import {
  decodeRouteParam,
  slugifyPathSegment,
  toClassDisplayName,
  toDisplayName,
} from '@/lib/class-filter';

export default function OnlineTestClass9BookPage({
  className,
  bookSlug,
  bookName,
}: {
  className: string;
  bookSlug: string;
  bookName?: string;
}) {
  const decodedBookName = bookName ? decodeRouteParam(bookName) : toDisplayName(bookSlug);
  const normalizedClassName = toClassDisplayName(className);

  const [chapters, setChapters] = React.useState<Array<{ name: string; slug: string }>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchChapters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const items = await getChaptersByClassAndBookName(normalizedClassName, decodedBookName);

        if (!isMounted) {
          return;
        }

        setChapters(
          items.map(item => ({
            name: item.name,
            slug: item.slug || slugifyPathSegment(item.name),
          }))
        );
      } catch {
        if (isMounted) {
          setError('Failed to load chapters');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchChapters();

    return () => {
      isMounted = false;
    };
  }, [decodedBookName, normalizedClassName]);

  if (isLoading) {
    return (
      <div>
        <Heading2>Chapter Wise Online Test</Heading2>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Failed to load chapters</p>
        <p className="mt-1 text-sm text-red-600">Please try again in a moment.</p>
      </div>
    );
  }

  if (!chapters.length) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="font-medium text-amber-700">No chapters found</p>
        <p className="mt-1 text-sm text-amber-600">
          There are no chapters available for this class and book.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Heading2>Chapter Wise Online Test</Heading2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {chapters.map(chapter => (
          <CardSmall
            key={chapter.slug}
            title={chapter.name}
            link={`${className}/online-test/${bookSlug}/${chapter.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
