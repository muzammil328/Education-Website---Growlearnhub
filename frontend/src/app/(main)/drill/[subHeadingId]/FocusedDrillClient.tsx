'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/trpc';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react';
import UserLayout from '@/components/layout/UserLayout';

type ConfidenceTag = 'sure' | 'guessed' | 'no_idea';

function generateSessionId() {
  return `drill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

interface Props {
  subHeadingId: string;
}

export default function FocusedDrillClient({ subHeadingId }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [sessionId] = useState(generateSessionId);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [confidenceTag, setConfidenceTag] = useState<ConfidenceTag | undefined>(undefined);
  const [results, setResults] = useState<Array<{ isCorrect: boolean; confidenceTag?: ConfidenceTag }>>([]);
  const [done, setDone] = useState(false);

  const { data, isLoading } = trpc.adaptiveMcq.getNextBatch.useQuery(
    { subHeadingId, sessionId, mode: 'focused_drill', limit: 10 },
    { enabled: Boolean(subHeadingId), refetchOnWindowFocus: false },
  );

  const submitAttempt = trpc.mcqAttempt.submit.useMutation();
  const dismissLoop = trpc.userProgress.dismissLoop.useMutation();
  const { data: progressData } = trpc.userProgress.subHeadingProgress.useQuery(
    { subHeadingId },
    { enabled: Boolean(user && subHeadingId) },
  );

  const mcqs = data?.data ?? [];
  const cur = mcqs[idx];

  const handleSelect = useCallback((i: number) => {
    if (submitted) return;
    setSelected(i);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (selected === undefined || !cur) return;
    setSubmitted(true);

    if (user) {
      submitAttempt.mutate({
        mcqId: cur.id,
        selectedOption: selected,
        confidenceTag,
        sessionId,
        quizMode: 'focused_drill',
      });
    }
  }, [selected, cur, user, confidenceTag, sessionId, submitAttempt]);

  const handleNext = useCallback(() => {
    if (!cur) return;
    const isCorrect = selected === mcqs[idx]?.options?.indexOf(mcqs[idx]?.options?.[selected ?? -1] ?? '') || false;
    setResults(r => [...r, { isCorrect: submitted, confidenceTag }]);

    if (idx + 1 >= mcqs.length) {
      // Dismiss open loop if performance is ok
      if (progressData?.data?._id) {
        dismissLoop.mutate({ progressId: String(progressData.data._id) });
      }
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(undefined);
      setSubmitted(false);
      setConfidenceTag(undefined);
    }
  }, [cur, idx, mcqs, submitted, confidenceTag, progressData, dismissLoop]);

  if (isLoading) {
    return (
      <UserLayout title="Focused Drill | GrowLearnHub">
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </UserLayout>
    );
  }

  if (!mcqs.length) {
    return (
      <UserLayout title="Focused Drill | GrowLearnHub">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-semibold">No questions to drill!</h2>
          <p className="text-muted-foreground text-sm">You&apos;ve cleared this topic.</p>
          <button onClick={() => router.back()} className="mt-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium">Go Back</button>
        </div>
      </UserLayout>
    );
  }

  if (done) {
    const correct = results.filter(r => r.isCorrect).length;
    const confidentMistakes = results.filter(r => r.confidenceTag === 'sure' && !r.isCorrect).length;
    const pct = Math.round((correct / results.length) * 100);

    return (
      <UserLayout title="Drill Complete | GrowLearnHub">
        <div className="max-w-lg mx-auto py-12 space-y-6">
          <div className={cn(
            'w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto text-white text-3xl font-bold shadow-lg',
            pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500',
          )}>
            {pct}%
          </div>
          <h1 className="text-2xl font-bold text-center">Drill Complete!</h1>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border p-4 text-center bg-green-50 dark:bg-green-950/20">
              <p className="text-2xl font-bold text-green-600">{correct}</p>
              <p className="text-xs text-muted-foreground mt-1">Correct</p>
            </div>
            <div className="rounded-xl border p-4 text-center bg-red-50 dark:bg-red-950/20">
              <p className="text-2xl font-bold text-red-500">{results.length - correct}</p>
              <p className="text-xs text-muted-foreground mt-1">Wrong</p>
            </div>
            <div className="rounded-xl border p-4 text-center bg-violet-50 dark:bg-violet-950/20">
              <p className="text-2xl font-bold text-violet-600">{confidentMistakes}</p>
              <p className="text-xs text-muted-foreground mt-1">Confident Mistakes</p>
            </div>
          </div>
          {confidentMistakes > 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 p-4">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">
                You had {confidentMistakes} confident mistake{confidentMistakes > 1 ? 's' : ''} — these are misconceptions, not knowledge gaps. Review the explanations carefully.
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => { setIdx(0); setSelected(undefined); setSubmitted(false); setConfidenceTag(undefined); setResults([]); setDone(false); }}
              className="flex-1 py-3 rounded-xl text-sm font-medium border border-border hover:bg-muted transition flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retry Drill
            </button>
            <button onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition">
              Dashboard
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  const isCorrect = submitted && cur && selected === cur.options.indexOf(cur.options[selected] ?? '');

  return (
    <UserLayout title="Focused Drill | GrowLearnHub">
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                <RotateCcw className="w-3 h-3" /> Focused Drill
              </span>
              {data?.masteryBand && (
                <span className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  data.masteryBand === 'weak' ? 'bg-red-100 text-red-700' :
                  data.masteryBand === 'developing' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700',
                )}>
                  {data.masteryBand}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm">Question {idx + 1} of {mcqs.length}</p>
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((idx + 1) / mcqs.length) * 100}%` }} />
          </div>
        </div>

        {/* question */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          {cur?.isRecovery && (
            <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
              <RotateCcw className="w-3.5 h-3.5" /> Recovery question — you got this wrong before
            </div>
          )}
          <p className="text-base font-semibold text-foreground leading-relaxed">{cur?.question}</p>

          <div className="space-y-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
            {cur?.options.map((opt, i) => {
              let bg = 'bg-background hover:bg-muted/40 text-foreground';
              if (submitted) {
                if (i === selected && i !== mcqs[idx]?.options?.findIndex?.((_, oi) => oi === (mcqs[idx] as { correctOption?: number })?.correctOption)) bg = 'bg-red-50 text-red-700 dark:bg-red-950/20';
                if (i === (cur as unknown as { correctOption?: number })?.correctOption) bg = 'bg-green-50 text-green-700 dark:bg-green-950/20';
              } else if (selected === i) {
                bg = 'bg-primary/8 text-primary';
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={submitted}
                  className={cn('w-full flex items-center gap-4 px-5 py-4 text-left transition-colors', bg)}>
                  <span className={cn('shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border',
                    selected === i ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground')}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm font-medium">{opt}</span>
                  {submitted && i === (cur as unknown as { correctOption?: number })?.correctOption && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                  {submitted && i === selected && i !== (cur as unknown as { correctOption?: number })?.correctOption && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* confidence tag */}
          {!submitted && selected !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium">How confident were you?</p>
              <div className="flex gap-2">
                {([
                  { tag: 'sure' as ConfidenceTag, label: '✅ Sure', active: 'bg-green-600 text-white border-green-600', inactive: 'border-border text-muted-foreground hover:border-green-400' },
                  { tag: 'guessed' as ConfidenceTag, label: '🤔 Guessed', active: 'bg-amber-500 text-white border-amber-500', inactive: 'border-border text-muted-foreground hover:border-amber-400' },
                  { tag: 'no_idea' as ConfidenceTag, label: '❓ No Idea', active: 'bg-red-500 text-white border-red-500', inactive: 'border-border text-muted-foreground hover:border-red-400' },
                ] as const).map(({ tag, label, active, inactive }) => (
                  <button key={tag} onClick={() => setConfidenceTag(tag)}
                    className={cn('flex-1 py-2 text-xs font-semibold rounded-lg border transition', confidenceTag === tag ? active : inactive)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* submit / next */}
          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button onClick={handleSubmit} disabled={selected === undefined}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 disabled:opacity-40 transition">
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition">
                {idx + 1 < mcqs.length ? 'Next Question' : 'Finish Drill'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
