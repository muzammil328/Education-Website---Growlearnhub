'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { cn, Heading1, Heading2, Para } from '@muzammil328/ui';
import { trpc } from '@/trpc/trpc';
import UserLayout from '@/components/layout/UserLayout';
import type { McqData } from './metadata';

interface Props {
  slug: string;
  initialData?: McqData | null;
}

interface RelatedMcq extends McqData {
  _selected: number | null;
}

function RelatedMcqCard({ mcq, onSelect }: { mcq: RelatedMcq; onSelect: (slug: string, optIndex: number) => void }) {
  const isAnswered = mcq._selected !== null;
  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 bg-primary/10 text-primary rounded flex items-center justify-center font-semibold text-xs">Q</span>
        <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{mcq.question}</p>
      </div>
      <div className="space-y-1.5">
        {mcq.options.map((opt: string, i: number) => {
          const isSelected = mcq._selected === i;
          const isCorrectOpt = i === mcq.correctOption;
          return (
            <button
              key={i}
              onClick={() => !isAnswered && onSelect(mcq.slug, i)}
              disabled={isAnswered}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg border text-sm transition-all duration-100 flex items-center gap-2',
                isAnswered && isCorrectOpt
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                  : isAnswered && isSelected && !isCorrectOpt
                    ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                    : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50 disabled:cursor-default'
              )}
            >
              <span className={cn(
                'shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold',
                isAnswered && isCorrectOpt ? 'bg-green-600 text-white' :
                isAnswered && isSelected && !isCorrectOpt ? 'bg-red-500 text-white' :
                isSelected ? 'bg-primary text-white' : 'bg-muted text-foreground/60'
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className={cn(
                isAnswered && isCorrectOpt ? 'text-green-700 dark:text-green-400' : 'text-foreground'
              )}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
      <Link
        href={`/live/${mcq.slug}/`}
        className="mt-2 inline-block text-xs text-primary font-medium hover:underline"
      >
        View full question →
      </Link>
    </div>
  );
}

export default function McqDetailClient({ slug, initialData }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [relatedSelections, setRelatedSelections] = useState<Record<string, number | null>>({});

  const { data, isLoading, error } = trpc.public.getMcqBySlug.useQuery(
    { slug },
    {
      enabled: Boolean(slug) && !initialData,
      retry: false,
      refetchOnWindowFocus: false,
      initialData: initialData
        ? { success: true, data: initialData }
        : undefined,
    }
  );

  const mcq = data?.data;

  const relatedQuery = trpc.public.getMcqsBySlug.useQuery(
    {
      classSlug: mcq?.classSlug ?? '',
      bookSlug: mcq?.bookSlug ?? '',
      chapterSlug: mcq?.chapterSlug ?? '',
      limit: 11,
    },
    {
      enabled: Boolean(mcq?.classSlug && mcq?.chapterSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const relatedMcqs = useMemo(() => {
    if (!relatedQuery.data?.data) return [];
    return relatedQuery.data.data
      .filter((r) => r.slug !== slug)
      .slice(0, 10)
      .map((r) => ({
        ...r,
        _selected: relatedSelections[r.slug] ?? null,
      }));
  }, [relatedQuery.data, slug, relatedSelections]);

  function handleRelatedSelect(mcqSlug: string, optIndex: number) {
    setRelatedSelections((prev) => ({ ...prev, [mcqSlug]: optIndex }));
  }

  if (isLoading) {
    return (
      <UserLayout title="Loading... | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <Para className="text-foreground/60 font-medium">Loading question...</Para>
        </div>
      </UserLayout>
    );
  }

  if (error || !data) {
    return (
      <UserLayout title="Not Found | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <Heading2 className="text-xl font-semibold text-foreground">Question Not Found</Heading2>
          <Para className="text-foreground/60 text-sm">{error?.message || 'The requested question does not exist.'}</Para>
          <button onClick={() => router.back()} className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-medium">
            Go Back
          </button>
        </div>
      </UserLayout>
    );
  }

  const isAnswered = selected !== null;
  const isCorrect = selected === mcq.correctOption;

  return (
    <UserLayout title={`${mcq.question} | GrowLearnHub MCQ`}>
      <article className="space-y-6 max-w-2xl">
        {/* Breadcrumb tags */}
        <div className="flex flex-wrap gap-1.5">
          {mcq.bookName && <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{mcq.bookName}</span>}
          {mcq.chapterName && <span className="px-2 py-0.5 bg-muted text-foreground/60 rounded-full text-xs">{mcq.chapterName}</span>}
          {mcq.headingName && <span className="px-2 py-0.5 bg-muted text-foreground/60 rounded-full text-xs">{mcq.headingName}</span>}
          {mcq.difficulty && (
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-semibold',
              mcq.difficulty === 'hard' ? 'bg-red-100 text-red-600' :
              mcq.difficulty === 'medium' ? 'bg-amber-100 text-amber-600' :
              'bg-green-100 text-green-600'
            )}>
              {mcq.difficulty}
            </span>
          )}
        </div>

        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-6">
            <span className="shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-semibold text-sm">Q</span>
            <Heading1 className="text-lg font-semibold text-foreground leading-relaxed">{mcq.question}</Heading1>
          </div>

          {mcq.options?.length > 0 ? (
            <div className="space-y-3">
              {mcq.options.map((opt: string, i: number) => {
                const isSelected = selected === i;
                const isCorrectOpt = i === mcq.correctOption;
                return (
                  <button
                    key={i}
                    onClick={() => !isAnswered && setSelected(i)}
                    disabled={isAnswered}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-3',
                      isAnswered && isCorrectOpt
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                        : isAnswered && isSelected && !isCorrectOpt
                          ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                          : isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50 disabled:cursor-default disabled:hover:border-border disabled:hover:bg-background'
                    )}
                  >
                    <span className={cn(
                      'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition',
                      isAnswered && isCorrectOpt ? 'bg-green-600 text-white' :
                      isAnswered && isSelected && !isCorrectOpt ? 'bg-red-500 text-white' :
                      isSelected ? 'bg-primary text-white' : 'bg-muted text-foreground/60'
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className={cn(
                      'font-medium text-sm',
                      isAnswered && isCorrectOpt ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                    )}>
                      {opt}
                      {isAnswered && isCorrectOpt && <span className="ml-2 text-xs text-green-600 font-normal">✓ Correct Answer</span>}
                      {isAnswered && isSelected && !isCorrectOpt && <span className="ml-2 text-xs text-red-500 font-normal">✗ Your Answer</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <Para className="text-center py-8 text-foreground/40 text-sm">No options available</Para>
          )}

          {isAnswered && (
            <div className={cn(
              'mt-5 p-3 rounded-xl text-sm font-semibold text-center',
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            )}>
              {isCorrect ? '✓ Correct! Well done.' : '✗ Incorrect. See the correct answer highlighted above.'}
            </div>
          )}
        </div>

        {mcq.explanation && (
          <div>
            <button
              onClick={() => setShowExplanation(s => !s)}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition"
            >
              <svg className={cn('w-4 h-4 transition-transform', showExplanation && 'rotate-90')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            {showExplanation && (
              <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Para className="text-sm text-foreground/80 leading-relaxed">{mcq.explanation}</Para>
              </div>
            )}
          </div>
        )}

        {!isAnswered && (
          <Para className="text-xs text-foreground/40 text-center">Select an option to check your answer</Para>
        )}

        {/* Related MCQs */}
        {relatedMcqs.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-border">
            <Heading2 className="text-base font-semibold text-foreground">
              Related Questions from {mcq.chapterName || 'this Chapter'}
            </Heading2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedMcqs.map((r) => (
                <RelatedMcqCard key={r.slug} mcq={r} onSelect={handleRelatedSelect} />
              ))}
            </div>
          </section>
        )}
      </article>
    </UserLayout>
  );
}
