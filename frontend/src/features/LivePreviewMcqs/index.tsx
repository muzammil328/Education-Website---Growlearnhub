'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@muzammil328/ui';
import UserLayout from '@/components/layout/UserLayout';

export interface McqItem {
  mcqId: string;
  slug?: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

interface Props {
  mcqs: McqItem[];
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  mode?: string;
  onStart?: () => void;
}

type AnswerMap = Record<string, number>;
type RevealMap = Record<string, boolean>;

const PAGE_TITLE = 'MCQs Practice | GrowLearnHub';

function getPaginationPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let p = Math.max(2, current - 2); p <= Math.min(total - 1, current + 2); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function LivePreviewMcqs({ mcqs, page, totalPages, onPageChange }: Props) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [revealed, setRevealed] = useState<RevealMap>({});
  const [studyMode, setStudyMode] = useState(false);

  const handleSelect = (mcqId: string, idx: number) => {
    if (answers[mcqId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [mcqId]: idx }));
  };

  const toggleReveal = (mcqId: string) => {
    setRevealed(prev => ({ ...prev, [mcqId]: !prev[mcqId] }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = mcqs.filter(m => answers[m.mcqId] === m.correctOption).length;

  return (
    <UserLayout title={PAGE_TITLE}>
      <article className="space-y-8">
        <header className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">MCQs Practice</h2>
          <p className="text-foreground/70">
            Browse and practice multiple choice questions at your own pace.
          </p>
        </header>

        {/* Mode toggle + stats strip */}
        <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl border border-border bg-muted/30">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Page <span className="font-semibold text-foreground">{page}</span> — {mcqs.length} questions
            </span>
            {answeredCount > 0 && (
              <span className="text-muted-foreground">
                Answered <span className="font-semibold text-foreground">{answeredCount}</span>
                {' · '}
                <span className="text-green-600 font-semibold">{correctCount} correct</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/50">Study mode</span>
            <button
              onClick={() => setStudyMode(s => !s)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                studyMode ? 'bg-primary' : 'bg-muted'
              )}
            >
              <span className={cn(
                'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                studyMode ? 'translate-x-6' : 'translate-x-1'
              )} />
            </button>
          </div>
        </div>

        {/* MCQ list */}
        <section className="space-y-4">
          {mcqs.map((mcq, idx) => {
            const selected = answers[mcq.mcqId];
            const isAnswered = selected !== undefined;
            const isRevealed = studyMode || revealed[mcq.mcqId];
            const questionNum = (page - 1) * 10 + idx + 1;

            return (
              <div
                key={mcq.mcqId}
                className="rounded-xl border border-border bg-background shadow-sm overflow-hidden"
              >
                {/* Question header */}
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/live/${mcq.slug ?? mcq.mcqId}`}
                      className="shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-semibold text-sm hover:bg-primary hover:text-white transition"
                      title="View full detail"
                    >
                      {questionNum}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/live/${mcq.slug ?? mcq.mcqId}`} className="group">
                        <p className="text-base font-semibold text-foreground leading-relaxed group-hover:text-primary transition">
                          {mcq.question}
                        </p>
                      </Link>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {mcq.bookName && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{mcq.bookName}</span>
                        )}
                        {mcq.chapterName && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">{mcq.chapterName}</span>
                        )}
                        {mcq.headingName && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">{mcq.headingName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="px-5 pb-4 space-y-2">
                  {mcq.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === mcq.correctOption;
                    const showCorrect = isRevealed || isAnswered;

                    return (
                      <button
                        key={i}
                        onClick={() => !studyMode && handleSelect(mcq.mcqId, i)}
                        disabled={studyMode || isAnswered}
                        className={cn(
                          'w-full text-left p-3 rounded-xl border-2 transition-all duration-150 flex items-center gap-3',
                          showCorrect && isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                            : isAnswered && isSelected && !isCorrect
                              ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                              : isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50 disabled:cursor-default disabled:hover:border-border disabled:hover:bg-background'
                        )}
                      >
                        <span className={cn(
                          'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition',
                          showCorrect && isCorrect
                            ? 'bg-green-600 text-white'
                            : isAnswered && isSelected && !isCorrect
                              ? 'bg-red-500 text-white'
                              : isSelected
                                ? 'bg-primary text-white'
                                : 'bg-muted text-muted-foreground'
                        )}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className={cn(
                          'text-sm font-medium',
                          showCorrect && isCorrect ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                        )}>
                          {opt}
                          {showCorrect && isCorrect && (
                            <span className="ml-2 text-xs text-green-600 font-normal">✓ Correct</span>
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <span className="ml-2 text-xs text-red-500 font-normal">✗ Wrong</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer: reveal / explanation */}
                <div className="px-5 pb-4 flex items-center justify-between gap-2">
                  {!studyMode && !isAnswered && (
                    <button
                      onClick={() => toggleReveal(mcq.mcqId)}
                      className="text-xs text-foreground/50 hover:text-primary transition underline underline-offset-2"
                    >
                      {revealed[mcq.mcqId] ? 'Hide answer' : 'Show answer'}
                    </button>
                  )}
                  {studyMode && <span className="text-xs text-primary font-medium">Study mode — answers shown</span>}
                  {isAnswered && !studyMode && (
                    <span className={cn(
                      'text-xs font-semibold',
                      selected === mcq.correctOption ? 'text-green-600' : 'text-red-500'
                    )}>
                      {selected === mcq.correctOption ? '✓ Correct!' : '✗ Incorrect'}
                    </span>
                  )}
                  <Link
                    href={`/live/${mcq.slug ?? mcq.mcqId}`}
                    className="ml-auto flex items-center gap-1 text-xs text-foreground/40 hover:text-primary transition"
                    title="Open detail page"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open
                  </Link>
                </div>

                {/* Explanation (shown when answered or revealed) */}
                {mcq.explanation && (isAnswered || isRevealed) && (
                  <div className="mx-5 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{mcq.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center flex-wrap gap-1.5 pt-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-border text-foreground disabled:opacity-40 hover:bg-muted transition"
            >
              ← Prev
            </button>
            {getPaginationPages(page, totalPages).map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm select-none">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={cn(
                    'w-9 h-9 rounded-lg text-sm font-medium transition',
                    p === page
                      ? 'bg-primary text-white'
                      : 'border border-border text-foreground hover:bg-muted'
                  )}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-border text-foreground disabled:opacity-40 hover:bg-muted transition"
            >
              Next →
            </button>
          </div>
        )}
      </article>
    </UserLayout>
  );
}
