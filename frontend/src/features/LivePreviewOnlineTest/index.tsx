'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@muzammil328/ui';
import { useMcqsSetsBySlug } from '@/hooks/use-public';
import { trpc } from '@/trpc/trpc';
import type { McqItem } from '../LivePreviewMcqs';
import UserLayout from '@/components/layout/UserLayout';
import OnlineTestDrawer from './OnlineTestDrawer';

interface Props {
  classSlug?: string;
  bookSlug?: string;
  chapterSlug?: string;
  headingSlug?: string;
  subHeadingSlug?: string;
}

const PAGE_TITLE = 'Online Test | GrowLearnHub';
const SECONDS_PER_QUESTION = 60;

export default function LivePreviewOnlineTest({ classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug }: Props) {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: setsData, isLoading: setsLoading } = useMcqsSetsBySlug(
    classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug
  );

  const { data: mcqsData, isLoading: mcqsLoading } = trpc.public.getMcqsBySlug.useQuery(
    {
      classSlug: classSlug || '',
      bookSlug: bookSlug || '',
      chapterSlug: chapterSlug || '',
      headingSlug: headingSlug || '',
      subHeadingSlug: subHeadingSlug || '',
      page: selectedSet ?? 1,
      limit: 10,
    },
    {
      enabled: Boolean(classSlug && bookSlug && chapterSlug && selectedSet),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const mcqs: McqItem[] = Array.isArray(mcqsData?.data) ? mcqsData.data : [];
  const sets = setsData?.data?.sets ?? [];
  const totalMcqs = setsData?.data?.totalMcqs ?? 0;
  const totalSets = setsData?.data?.totalSets ?? 0;

  const handleSelectSet = useCallback((setNumber: number) => {
    setSelectedSet(setNumber);
    // drawer opens automatically via useEffect once MCQs load
  }, []);

  // auto-open drawer when MCQs finish loading
  useEffect(() => {
    if (mcqs.length > 0 && selectedSet !== null && !drawerOpen) {
      setDrawerOpen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcqs.length, selectedSet]);

  if (setsLoading) {
    return (
      <UserLayout title={PAGE_TITLE}>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/60 font-medium">Loading sets...</p>
        </div>
      </UserLayout>
    );
  }

  if (totalMcqs === 0 && !setsLoading) {
    return (
      <UserLayout title={PAGE_TITLE}>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">No Questions Found</h2>
          <p className="text-foreground/60 text-sm">No MCQs available for the selected criteria.</p>
          <button onClick={() => router.back()} className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium text-sm">Go Back</button>
        </div>
      </UserLayout>
    );
  }

  return (
    <>
      <UserLayout title={PAGE_TITLE}>
        <article className="space-y-8">
          <header className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Online Test Library</h2>
            <p className="text-foreground/70">
              {totalMcqs} questions across {totalSets} practice sets. Choose a set to begin.
            </p>
          </header>

          <section>
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {sets.map((set, i) => {
                const isSelected = selectedSet === set.setNumber;
                const isLoadingThis = isSelected && mcqsLoading;
                return (
                  <button
                    key={set.setNumber}
                    onClick={() => handleSelectSet(set.setNumber)}
                    disabled={isLoadingThis}
                    className="text-left w-full"
                  >
                    <div className="card">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                            {i === 0 ? 'Featured' : `Set ${set.setNumber}`}
                          </p>
                          <span className="text-lg font-semibold text-white leading-8">
                            {i === 0 ? 'Take Full Test' : `Practice Set ${set.setNumber}`}
                          </span>
                          <p className="text-white/70 text-sm mt-1">
                            {set.count} questions · {Math.round(set.count * SECONDS_PER_QUESTION / 60)} min
                          </p>
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/20">
                          {isLoadingThis ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="shine" />
                      <div className="background">
                        <div className="line line1" /><div className="line line2" /><div className="line line3" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">Features</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { title: 'Fullscreen Focus Mode', desc: 'Distraction-free test environment with smooth animations.' },
                { title: 'Smart Question Palette', desc: 'Visual map showing answered, skipped, and marked questions.' },
                { title: 'Mark for Review', desc: 'Flag uncertain questions to revisit before submitting.' },
                { title: 'Auto-Save Progress', desc: 'Answers are saved locally — resume after an accidental refresh.' },
                { title: 'Keyboard Shortcuts', desc: '1–4 to select options, → next, S skip, M mark.' },
                { title: 'Detailed Results', desc: 'Score, accuracy charts, and per-question answer review.' },
              ].map(f => (
                <div key={f.title} className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="text-foreground/70 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </UserLayout>

      {/* Fullscreen drawer */}
      <AnimatePresence>
        {drawerOpen && mcqs.length > 0 && (
          <OnlineTestDrawer
            mcqs={mcqs}
            testTitle={[bookSlug, chapterSlug, headingSlug].filter(Boolean).join(' › ')}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}