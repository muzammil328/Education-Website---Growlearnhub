'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/trpc';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Zap, CheckCircle2, XCircle, ArrowRight, Timer } from 'lucide-react';
import UserLayout from '@/components/layout/UserLayout';

type ConfidenceTag = 'sure' | 'guessed' | 'no_idea';

const BURST_TIME_PER_Q = 60;

function generateSessionId() {
  return `burst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type BurstMcq = { id: string; question: string; options: string[]; correctOption?: number };

export default function BurstClient() {
  const router = useRouter();
  const { user } = useAuth();

  const [sessionId] = useState(generateSessionId);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [confidenceTag, setConfidenceTag] = useState<ConfidenceTag | undefined>(undefined);
  const [results, setResults] = useState<Array<{ isCorrect: boolean; confidenceTag?: ConfidenceTag }>>([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(BURST_TIME_PER_Q);

  const { data, isLoading } = trpc.adaptiveMcq.getMicroBurst.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const submitAttempt = trpc.mcqAttempt.submit.useMutation();
  const completeBurstMutation = trpc.mcqAttempt.completeBurstSession.useMutation();

  const mcqs: BurstMcq[] = (data?.data ?? []) as BurstMcq[];
  const cur = mcqs[idx];

  const advance = useCallback((isCorrect: boolean, tag?: ConfidenceTag) => {
    setResults(r => [...r, { isCorrect, confidenceTag: tag }]);
    if (idx + 1 >= mcqs.length) {
      setDone(true);
      completeBurstMutation.mutate();
    } else {
      setIdx(i => i + 1);
      setSelected(undefined);
      setSubmitted(false);
      setConfidenceTag(undefined);
    }
  }, [idx, mcqs.length]);

  // Per-question countdown — resets when idx changes
  useEffect(() => {
    if (submitted || done || !mcqs.length) return;
    setTimeLeft(BURST_TIME_PER_Q);
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { clearInterval(t); advance(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, submitted, done]);

  const handleSubmit = useCallback(() => {
    if (selected === undefined || !cur) return;
    setSubmitted(true);
    const isCorrect = selected === cur.correctOption;
    if (user) {
      submitAttempt.mutate({
        mcqId: cur.id,
        selectedOption: selected,
        confidenceTag,
        sessionId,
        quizMode: 'micro_burst',
      });
    }
    // Show answer feedback briefly, then auto-advance after 1.5s if confidence tagged or user clicks next
    if (!confidenceTag) return; // wait for user to tag or click next
    setTimeout(() => advance(isCorrect, confidenceTag), 1500);
  }, [selected, cur, user, confidenceTag, sessionId, submitAttempt, advance]);

  const handleNext = useCallback(() => {
    const isCorrect = cur ? selected === cur.correctOption : false;
    advance(isCorrect, confidenceTag);
  }, [cur, selected, confidenceTag, advance]);

  if (!user) {
    return (
      <UserLayout title="Micro Burst | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Zap className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-semibold">Login to start your daily Micro Burst</h2>
          <button onClick={() => router.push('/login')} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium">Login</button>
        </div>
      </UserLayout>
    );
  }

  if (isLoading) {
    return (
      <UserLayout title="Micro Burst | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your burst...</p>
        </div>
      </UserLayout>
    );
  }

  if (!mcqs.length) {
    return (
      <UserLayout title="Micro Burst | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-semibold">No burst available</h2>
          <p className="text-muted-foreground text-sm">Practice more MCQs to unlock your daily burst.</p>
          <button onClick={() => router.push('/live/mcqs')} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium">Browse MCQs</button>
        </div>
      </UserLayout>
    );
  }

  if (done) {
    const correct = results.filter(r => r.isCorrect).length;
    const pct = Math.round((correct / results.length) * 100);
    const confidentMistakes = results.filter(r => r.confidenceTag === 'sure' && !r.isCorrect).length;

    return (
      <UserLayout title="Burst Complete | GrowLearnHub">
        <div className="max-w-md mx-auto py-12 space-y-6 text-center">
          <div className={cn(
            'w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto text-white text-3xl font-bold shadow-lg',
            pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500',
          )}>
            {pct}%
          </div>
          <div>
            <h1 className="text-2xl font-bold">Burst Complete! ⚡</h1>
            <p className="text-muted-foreground text-sm mt-1">{correct} of {results.length} correct</p>
          </div>

          {confidentMistakes > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 p-4 text-left">
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                ⚠️ {confidentMistakes} Confident Mistake{confidentMistakes > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                You were sure but wrong — review these topics to fix the misconception.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => { setIdx(0); setSelected(undefined); setSubmitted(false); setConfidenceTag(undefined); setResults([]); setDone(false); }}
              className="flex-1 py-3 rounded-xl text-sm font-medium border border-border hover:bg-muted transition"
            >
              Retry
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  const timerColor = timeLeft < 15 ? 'text-red-500 animate-pulse' : timeLeft < 30 ? 'text-amber-500' : 'text-foreground';

  return (
    <UserLayout title="Micro Burst | GrowLearnHub">
      <div className="max-w-xl mx-auto py-8 space-y-5">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-foreground">Micro Burst</span>
            <span className="text-xs text-muted-foreground ml-1">Q{idx + 1}/{mcqs.length}</span>
          </div>
          <div className={cn('flex items-center gap-1.5 text-sm font-mono font-semibold', timerColor)}>
            <Timer className="w-4 h-4" />
            {timeLeft}s
          </div>
        </div>

        {/* progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((idx + 1) / mcqs.length) * 100}%` }}
          />
        </div>

        {/* timer bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', timeLeft < 15 ? 'bg-red-500' : 'bg-amber-400')}
            style={{ width: `${(timeLeft / BURST_TIME_PER_Q) * 100}%` }}
          />
        </div>

        {/* question card */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <p className="text-base font-semibold text-foreground leading-relaxed">{cur?.question}</p>

          <div className="space-y-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
            {cur?.options?.map((opt, i) => {
              let bg = 'bg-background hover:bg-muted/40 text-foreground';
              if (submitted) {
                if (i === cur.correctOption) bg = 'bg-green-50 text-green-700 dark:bg-green-950/20';
                else if (i === selected) bg = 'bg-red-50 text-red-700 dark:bg-red-950/20';
              } else if (selected === i) {
                bg = 'bg-primary/8 text-primary';
              }
              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelected(i)}
                  disabled={submitted}
                  className={cn('w-full flex items-center gap-4 px-5 py-4 text-left transition-colors', bg)}
                >
                  <span className={cn(
                    'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border',
                    selected === i ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground',
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm font-medium">{opt}</span>
                  {submitted && i === cur.correctOption && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                  {submitted && i === selected && i !== cur.correctOption && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* confidence tag — shown after selecting, before submitting */}
          {!submitted && selected !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium">How confident?</p>
              <div className="flex gap-2">
                {([
                  { tag: 'sure' as ConfidenceTag, label: '✅ Sure', active: 'bg-green-600 text-white border-green-600', inactive: 'border-border text-muted-foreground hover:border-green-400' },
                  { tag: 'guessed' as ConfidenceTag, label: '🤔 Guessed', active: 'bg-amber-500 text-white border-amber-500', inactive: 'border-border text-muted-foreground hover:border-amber-400' },
                  { tag: 'no_idea' as ConfidenceTag, label: '❓ No Idea', active: 'bg-red-500 text-white border-red-500', inactive: 'border-border text-muted-foreground hover:border-red-400' },
                ] as const).map(({ tag, label, active, inactive }) => (
                  <button
                    key={tag}
                    onClick={() => setConfidenceTag(tag)}
                    className={cn('flex-1 py-2 text-xs font-semibold rounded-lg border transition', confidenceTag === tag ? active : inactive)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected === undefined}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 disabled:opacity-40 transition"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition"
              >
                {idx + 1 < mcqs.length ? 'Next' : 'Finish'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
