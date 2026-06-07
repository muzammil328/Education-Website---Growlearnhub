'use client';
import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMcqsBySlug } from '@/hooks/use-public';
import { cn } from '@muzammil328/ui';

type Mode = 'online-test' | 'mcqs';

interface AnswerState {
  [mcqId: string]: number;
}

interface McqItem {
  mcqId: string;
  question: string;
  options: string[];
  correctOption: number;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

export default function LivePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = (searchParams.get('mode') as Mode) || 'mcqs';

  const classSlug = searchParams.get('class') || undefined;
  const bookSlug = searchParams.get('book') || undefined;
  const chapterSlug = searchParams.get('chapter') || undefined;
  const headingSlug = searchParams.get('heading') || undefined;
  const subHeadingSlug = searchParams.get('subHeading') || undefined;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(1);
  const [quizStarted, setQuizStarted] = useState(false);
  const limit = 10;

  const { data, isLoading, error } = useMcqsBySlug(
    classSlug,
    bookSlug,
    chapterSlug,
    headingSlug,
    subHeadingSlug,
    page,
    limit
  );

  const mcqs: McqItem[] = Array.isArray(data?.data) ? (data.data as McqItem[]) : [];
  const totalPages = data?.pagination?.totalPages ?? 0;

  const score = useMemo(() => {
    let correct = 0;
    mcqs.forEach(mcq => {
      const selectedAnswer = answers[mcq.mcqId];
      if (selectedAnswer !== undefined && selectedAnswer === mcq.correctOption) {
        correct++;
      }
    });
    return correct;
  }, [mcqs, answers]);

  const handleSelectAnswer = (optionIndex: number) => {
    const currentMcq = mcqs[currentIndex];
    if (!currentMcq) return;
    setAnswers(prev => ({
      ...prev,
      [currentMcq.mcqId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const progress = mcqs.length > 0 ? ((currentIndex + 1) / mcqs.length) * 100 : 0;
  const currentMcq = mcqs[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Questions</h2>
          <p className="text-slate-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No Questions Found</h2>
          <p className="text-slate-600">There are no MCQs available for the selected criteria.</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <McqsListPage
        mcqs={mcqs}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        mode={mode}
        onStart={() => setQuizStarted(true)}
      />
    );
  }

  if (showResults) {
    const percentage = mcqs.length > 0 ? Math.round((score / mcqs.length) * 100) : 0;
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div
              className={cn(
                'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold',
                percentage >= 70
                  ? 'bg-linear-to-br from-green-400 to-emerald-600'
                  : percentage >= 40
                    ? 'bg-linear-to-br from-amber-400 to-orange-600'
                    : 'bg-linear-to-br from-red-400 to-rose-600'
              )}
            >
              {percentage}%
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
            <p className="text-slate-600 mb-6">
              You scored <span className="font-semibold text-green-600">{score}</span> out of{' '}
              <span className="font-semibold">{mcqs.length}</span>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentIndex(0);
                  setShowResults(false);
                }}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-medium"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentIndex + 1} of {mcqs.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <span className="shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm">
              {currentIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-slate-900 leading-relaxed">
              {currentMcq?.question}
            </h2>
          </div>

          {currentMcq?.options && currentMcq.options.length > 0 ? (
            <div className="space-y-3">
              {currentMcq.options.map((optionText: string, idx: number) => {
                const selectedAnswer = answers[currentMcq.mcqId];
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                      'hover:border-blue-300 hover:bg-blue-50',
                      isSelected
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-slate-200 bg-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition',
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span
                        className={cn(
                          'font-medium',
                          isSelected ? 'text-blue-700' : 'text-slate-700'
                        )}
                      >
                        {optionText}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No options available</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={cn(
              'px-6 py-3 rounded-xl font-medium transition',
              currentIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            )}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {mcqs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to question ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
                className={cn(
                  'w-3 h-3 rounded-full transition',
                  idx === currentIndex
                    ? 'bg-blue-600'
                    : answers[mcqs[idx]?.mcqId] !== undefined
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                )}
              />
            ))}
          </div>

          {currentIndex === mcqs.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition shadow-lg shadow-green-500/25"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function McqsListPage({
  mcqs,
  page,
  totalPages,
  onPageChange,
  mode = 'mcqs',
  onStart,
}: {
  mcqs: McqItem[];
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  mode?: string;
  onStart?: () => void;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">MCQs Library</h1>
          <p className="text-slate-600">{mcqs.length} questions available</p>
        </div>

        <div className="grid gap-4">
          {mcqs.map((mcq, idx) => (
            <div
              key={mcq.mcqId}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-semibold">
                  {(page - 1) * 10 + idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{mcq.question}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {mcq.className && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {mcq.className}
                      </span>
                    )}
                    {mcq.bookName && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {mcq.bookName}
                      </span>
                    )}
                    {mcq.chapterName && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {mcq.chapterName}
                      </span>
                    )}
                    {mcq.headingName && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {mcq.headingName}
                      </span>
                    )}
                  </div>
                </div>
                {mode === 'online-test' && (
                  <button
                    onClick={onStart}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2 shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Start Test
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={cn(
                  'w-10 h-10 rounded-xl font-medium transition',
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
