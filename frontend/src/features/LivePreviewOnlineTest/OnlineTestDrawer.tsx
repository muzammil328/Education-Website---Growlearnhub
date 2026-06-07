'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@muzammil328/ui';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import type { McqItem } from '../LivePreviewMcqs';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// ── types ──────────────────────────────────────────────────────────────────
type QuestionStatus = 'unvisited' | 'answered' | 'skipped' | 'marked';

interface Props {
  mcqs: McqItem[];
  testTitle: string;
  onClose: () => void;
}

// ── helpers ─────────────────────────────────────────────────────────────────
const TOTAL_SECONDS = (n: number) => n * 60;

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

function prettify(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const STATUS_COLOR: Record<QuestionStatus, string> = {
  unvisited: 'border border-border bg-background text-foreground/50',
  answered:  'bg-green-500 text-white border border-green-500',
  skipped:   'bg-gray-400 text-white border border-gray-400',
  marked:    'bg-orange-400 text-white border border-orange-400',
};

const LEGEND = [
  { key: 'current',   color: 'bg-primary',     label: 'Current' },
  { key: 'answered',  color: 'bg-green-500',   label: 'Answered' },
  { key: 'marked',    color: 'bg-orange-400',  label: 'Marked' },
  { key: 'skipped',   color: 'bg-gray-400',    label: 'Skipped' },
  { key: 'unvisited', color: 'border border-border bg-background', label: 'Not visited' },
] as const;

// ── sub-components ──────────────────────────────────────────────────────────

function TestHeader({
  title, subtitle, idx, n, timeLeft, onClose,
}: {
  title: string; subtitle: string; idx: number; n: number; timeLeft: number; onClose: () => void;
}) {
  const timerCls =
    timeLeft < 60 ? 'text-red-600 animate-pulse' :
    timeLeft < 300 ? 'text-orange-500' :
    'text-foreground';

  const progress = ((idx + 1) / n) * 100;

  return (
    <div className="shrink-0 border-b border-border bg-background px-6 py-3 flex items-center gap-6">
      {/* left: icon + title */}
      <div className="flex items-center gap-3 min-w-0 w-64 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{title}</p>
          <p className="text-xs text-foreground/50 truncate">{subtitle}</p>
        </div>
      </div>

      {/* center: progress */}
      <div className="flex-1 flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-foreground">Question {idx + 1} of {n}</p>
        <div className="w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* right: timer + close */}
      <div className="flex items-center gap-3 shrink-0 w-64 justify-end">
        <div className={cn('flex items-center gap-1.5 text-sm font-mono font-semibold', timerCls)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {fmt(timeLeft)}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/40 hover:bg-red-50 hover:text-red-500 border border-border transition"
          title="Leave test"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function QuestionPanel({
  mcq, idx, status, selected, onSelect, onMark,
}: {
  mcq: McqItem; idx: number; status: QuestionStatus;
  selected: number | undefined; onSelect: (i: number) => void; onMark: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Q header row */}
      <div className="flex items-center justify-between px-8 pt-6 pb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm font-bold rounded-lg">
          Q {idx + 1}
        </span>
        <button
          onClick={onMark}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition',
            status === 'marked'
              ? 'bg-orange-100 text-orange-600 border-orange-300'
              : 'border-border text-foreground/60 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50'
          )}
        >
          <svg className="w-4 h-4" fill={status === 'marked' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
          Mark for Review
        </button>
      </div>

      {/* Question */}
      <div className="px-8 pb-4">
        <p className="text-base font-semibold text-foreground leading-relaxed">{mcq.question}</p>
        <p className="text-sm text-foreground/40 mt-1">Select the best answer from the options below</p>
      </div>

      {/* Options */}
      <div className="px-8 pb-8 space-y-0 divide-y divide-border border border-border rounded-xl mx-8 overflow-hidden">
        {mcq.options.map((opt, i) => {
          const isSel = selected === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'w-full flex items-center gap-4 px-5 py-4 text-left transition-colors',
                isSel
                  ? 'bg-primary/8 text-primary'
                  : 'bg-background hover:bg-muted/40 text-foreground'
              )}
            >
              <span className={cn(
                'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border',
                isSel ? 'bg-primary text-white border-primary' : 'border-border text-foreground/60'
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm font-medium">{opt}</span>
              <span className={cn(
                'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
                isSel ? 'border-primary' : 'border-border'
              )}>
                {isSel && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* keyboard hint */}
      <p className="text-center text-xs text-foreground/30 pb-6 mt-2">
        <kbd className="px-1 rounded bg-muted">1–4</kbd> select ·
        <kbd className="ml-1 px-1 rounded bg-muted">S</kbd> skip ·
        <kbd className="ml-1 px-1 rounded bg-muted">M</kbd> mark ·
        <kbd className="ml-1 px-1 rounded bg-muted">→</kbd> next
      </p>
    </div>
  );
}

function QuestionPalette({
  mcqs, idx, statuses, counts, onNavigate, className,
}: {
  mcqs: McqItem[]; idx: number;
  statuses: Record<string, QuestionStatus>;
  counts: { answered: number; skipped: number; marked: number; unvisited: number };
  onNavigate: (i: number) => void;
  className?: string;
}) {
  const status = (id: string): QuestionStatus => statuses[id] ?? 'unvisited';

  return (
    <div className={cn('w-72 shrink-0 border-l border-border flex flex-col bg-background overflow-y-auto', className)}>
      {/* palette header */}
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">Question Palette</p>
        <div className="flex flex-wrap gap-1.5">
          {mcqs.map((m, i) => (
            <button
              key={m.mcqId}
              onClick={() => onNavigate(i)}
              className={cn(
                'w-9 h-9 rounded-lg text-xs font-semibold transition hover:scale-105',
                i === idx
                  ? 'bg-primary text-white ring-2 ring-primary/30 ring-offset-1'
                  : STATUS_COLOR[status(m.mcqId)]
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="px-5 py-3 border-b border-border space-y-1.5">
        {LEGEND.map(l => (
          <div key={l.key} className="flex items-center gap-2 text-xs text-foreground/60">
            <span className={cn('w-3.5 h-3.5 rounded-sm shrink-0', l.color)} />
            {l.label}
          </div>
        ))}
      </div>

      {/* summary */}
      <div className="px-5 py-4">
        <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">Summary</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{counts.answered}</p>
            <p className="text-xs text-foreground/50 mt-0.5">Answered</p>
          </div>
          <div className="rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-bold text-orange-500">{counts.skipped}</p>
            <p className="text-xs text-foreground/50 mt-0.5">Skipped</p>
          </div>
          <div className="rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">{counts.marked}</p>
            <p className="text-xs text-foreground/50 mt-0.5">Marked</p>
          </div>
          <div className="rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground/40">{counts.unvisited}</p>
            <p className="text-xs text-foreground/50 mt-0.5">Unvisited</p>
          </div>
        </div>
      </div>

      {/* submit test */}
      <div className="px-5 pb-5 mt-auto">
        <div className="h-px bg-border mb-4" />
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition flex items-center justify-center gap-2"
          id="sidebar-submit-btn"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Submit Test
        </button>
      </div>
    </div>
  );
}

function TestFooter({
  idx, n, onPrev, onNext, onSkip, onSubmit, onPaletteOpen,
}: {
  idx: number; n: number;
  onPrev: () => void; onNext: () => void;
  onSkip: () => void; onSubmit: () => void; onPaletteOpen: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-border bg-background px-6 py-3 flex items-center justify-between gap-3">
      <button
        onClick={onPrev}
        disabled={idx === 0}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground disabled:opacity-40 hover:bg-muted transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={onSkip}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/60 hover:bg-muted border border-border transition"
        >
          Skip
        </button>
        {/* mobile palette toggle */}
        <button
          onClick={onPaletteOpen}
          className="lg:hidden px-3 py-2.5 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <button
        onClick={idx < n - 1 ? onNext : onSubmit}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-white hover:opacity-90 transition"
      >
        {idx < n - 1 ? 'Next' : 'Submit Test'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────
export default function OnlineTestDrawer({ mcqs, testTitle, onClose }: Props) {
  const n = mcqs.length;

  const storageKey = `online-test-${testTitle.replace(/\s/g, '-')}`;

  // lazy-init state from localStorage on first render
  const [idx, setIdx] = useState<number>(() => {
    try { const s = localStorage.getItem(storageKey); return s ? (JSON.parse(s).idx ?? 0) : 0; } catch { return 0; }
  });
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try { const s = localStorage.getItem(storageKey); return s ? (JSON.parse(s).answers ?? {}) : {}; } catch { return {}; }
  });
  const [statuses, setStatuses] = useState<Record<string, QuestionStatus>>(() => {
    try { const s = localStorage.getItem(storageKey); return s ? (JSON.parse(s).statuses ?? {}) : {}; } catch { return {}; }
  });
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    try { const s = localStorage.getItem(storageKey); return s ? (JSON.parse(s).timeLeft ?? TOTAL_SECONDS(n)) : TOTAL_SECONDS(n); } catch { return TOTAL_SECONDS(n); }
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

  const cur = mcqs[idx];
  const status = (id: string): QuestionStatus => statuses[id] ?? 'unvisited';

  // derive title parts
  const parts = testTitle.split('›').map(s => s.trim()).filter(Boolean);
  const mainTitle = parts[0] ? prettify(parts[0]) : 'Online Test';
  const subtitle = [
    parts.slice(1).map(prettify).join(' › '),
    `${n} Questions`,
  ].filter(Boolean).join(' · ');

  // ── actions ───────────────────────────────────────────────────────────────
  const selectAnswer = useCallback((optIdx: number) => {
    if (!cur) return;
    setAnswers(p => ({ ...p, [cur.mcqId]: optIdx }));
    setStatuses(p => {
      if ((p[cur.mcqId] ?? 'unvisited') !== 'marked') return { ...p, [cur.mcqId]: 'answered' };
      return p;
    });
  }, [cur]);

  const navigate = useCallback((to: number) => {
    setIdx(to);
    questionRef.current?.scrollTo({ top: 0 });
  }, []);

  const handleFinalSubmit = useCallback(() => {
    clearInterval(timerRef.current!);
    setTimeTaken(TOTAL_SECONDS(n) - timeLeftRef.current);
    localStorage.removeItem(storageKey);
    setShowSubmitModal(false);
    setShowResults(true);
  }, [n, storageKey]);

  const handleNext = useCallback(() => { setIdx(i => Math.min(n - 1, i + 1)); }, [n]);
  const handlePrev = useCallback(() => { setIdx(i => Math.max(0, i - 1)); }, []);

  const handleSkip = useCallback(() => {
    setStatuses(p => {
      const cur2 = mcqs[idx];
      if (!cur2) return p;
      if ((p[cur2.mcqId] ?? 'unvisited') !== 'answered') return { ...p, [cur2.mcqId]: 'skipped' };
      return p;
    });
    setIdx(i => Math.min(n - 1, i + 1));
  }, [idx, mcqs, n]);

  const handleMark = useCallback(() => {
    setStatuses(p => {
      const cur2 = mcqs[idx];
      if (!cur2) return p;
      return { ...p, [cur2.mcqId]: 'marked' };
    });
    setIdx(i => Math.min(n - 1, i + 1));
  }, [idx, mcqs, n]);

  useEffect(() => {
    if (showResults) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, statuses, idx, timeLeft }));
    } catch { /* ignore */ }
  }, [answers, statuses, idx, timeLeft, showResults, storageKey]);

  // ── timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (showResults) return;
    timerRef.current = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { clearInterval(timerRef.current!); handleFinalSubmit(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timerRef.current!);
  }, [showResults, handleFinalSubmit]);

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showSubmitModal || showResults || showConfirmLeave) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 's' || e.key === 'S') handleSkip();
      else if (e.key === 'm' || e.key === 'M') handleMark();
      else if (['1','2','3','4'].includes(e.key)) {
        const i = parseInt(e.key) - 1;
        if (cur?.options[i] !== undefined) selectAnswer(i);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, cur, showSubmitModal, showResults, showConfirmLeave, handleNext, handlePrev, handleSkip, handleMark, selectAnswer]);

  // ── counts ────────────────────────────────────────────────────────────────
  const counts = useMemo(() => {
    let answered = 0, skipped = 0, marked = 0, unvisited = 0;
    mcqs.forEach(m => {
      const s = statuses[m.mcqId] ?? 'unvisited';
      if (s === 'answered') answered++;
      else if (s === 'skipped') skipped++;
      else if (s === 'marked') marked++;
      else unvisited++;
    });
    return { answered, skipped, marked, unvisited };
  }, [mcqs, statuses]);

  const score = useMemo(() =>
    mcqs.filter(m => answers[m.mcqId] === m.correctOption).length,
  [mcqs, answers]);

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (showResults) {
    const pct = Math.round((score / n) * 100);
    const wrong = counts.answered - score;
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;
    const reviewMcq = mcqs[reviewIdx];
    const revSel = answers[reviewMcq?.mcqId ?? ''];

    if (isReviewMode) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
          <div className="shrink-0 bg-background border-b border-border px-6 py-3 flex items-center justify-between">
            <button onClick={() => setIsReviewMode(false)} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              Back to Results
            </button>
            <span className="text-sm font-medium">Q{reviewIdx + 1} / {n}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-4">
            <div className="flex items-start gap-3 p-5 rounded-2xl border border-border shadow-sm">
              <span className="shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-semibold text-sm">{reviewIdx + 1}</span>
              <p className="text-base font-semibold leading-relaxed">{reviewMcq?.question}</p>
            </div>
            <div className="space-y-2">
              {reviewMcq?.options.map((opt, i) => {
                const isCorrect = i === reviewMcq.correctOption;
                const isSelected = revSel === i;
                return (
                  <div key={i} className={cn('p-4 rounded-xl border-2 flex items-center gap-3',
                    isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : isSelected && !isCorrect ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                    : 'border-border')}>
                    <span className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0',
                      isCorrect ? 'bg-green-600 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-muted text-foreground/60')}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className={cn('text-sm font-medium', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-foreground')}>
                      {opt}
                      {isCorrect && <span className="ml-2 text-xs text-green-600">✓ Correct</span>}
                      {isSelected && !isCorrect && <span className="ml-2 text-xs text-red-500">✗ Your Answer</span>}
                    </span>
                  </div>
                );
              })}
            </div>
            {reviewMcq?.explanation && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Explanation</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{reviewMcq.explanation}</p>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-border bg-background px-6 py-3 flex justify-between">
            <button onClick={() => setReviewIdx(i => Math.max(0, i - 1))} disabled={reviewIdx === 0}
              className="px-5 py-2 rounded-xl text-sm font-medium border border-border disabled:opacity-40 hover:bg-muted transition">← Prev</button>
            <button onClick={() => setReviewIdx(i => Math.min(n - 1, i + 1))} disabled={reviewIdx === n - 1}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-primary text-white disabled:opacity-40 hover:opacity-90 transition">Next →</button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            className="rounded-2xl border border-border bg-background shadow-lg p-8 text-center space-y-4">
            <div className={cn('w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto text-white shadow-lg',
              pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500')}>
              <span className="text-3xl font-bold">{pct}%</span>
              <span className="text-sm opacity-80">{score}/{n}</span>
            </div>
            <h1 className="text-2xl font-bold">Test Completed!</h1>
            <p className="text-foreground/60 text-sm">Time taken: {mins}m {secs}s</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-3">
            {[
              { label: 'Correct',  value: score,           color: 'text-green-600',  bg: 'bg-green-50 border-green-200' },
              { label: 'Wrong',    value: wrong,            color: 'text-red-500',    bg: 'bg-red-50 border-red-200' },
              { label: 'Skipped',  value: counts.skipped,  color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
              { label: 'Marked',   value: counts.marked,   color: 'text-violet-500', bg: 'bg-violet-50 border-violet-200' },
            ].map(s => (
              <div key={s.label} className={cn('rounded-xl border p-3 text-center', s.bg)}>
                <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
                <p className="text-xs text-foreground/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm font-semibold mb-4">Accuracy Overview</p>
              <div className="w-40 mx-auto">
                <Doughnut
                  data={{ labels: ['Correct','Wrong','Skipped'], datasets: [{ data: [score, wrong, counts.skipped], backgroundColor: ['#22c55e','#ef4444','#f97316'], borderWidth: 0 }] }}
                  options={{ cutout: '70%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } } }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm font-semibold mb-4">Performance Breakdown</p>
              <Bar
                data={{ labels: ['Correct','Wrong','Skipped','Marked'], datasets: [{ label: 'Questions', data: [score, wrong, counts.skipped, counts.marked], backgroundColor: ['#22c55e','#ef4444','#f97316','#8b5cf6'], borderRadius: 6, borderSkipped: false }] }}
                options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }}
              />
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <p className="text-sm font-semibold mb-3">Question Map</p>
            <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
              {mcqs.map((m, i) => {
                const s = statuses[m.mcqId] ?? 'unvisited';
                const isCorrect = answers[m.mcqId] === m.correctOption;
                return (
                  <button key={m.mcqId} onClick={() => { setReviewIdx(i); setIsReviewMode(true); }}
                    className={cn('aspect-square rounded-lg text-xs font-semibold transition hover:scale-110',
                      s === 'answered' ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                      : s === 'skipped' ? 'bg-gray-400 text-white'
                      : s === 'marked' ? 'bg-orange-400 text-white'
                      : 'bg-muted text-foreground/50')}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-foreground/40 mt-2">Click any question to review</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => { setIsReviewMode(true); setReviewIdx(0); }}
              className="flex-1 py-3 rounded-xl text-sm font-medium border border-border hover:bg-muted transition">
              Review Answers
            </button>
            <button onClick={() => { setAnswers({}); setStatuses({}); setIdx(0); setTimeLeft(TOTAL_SECONDS(n)); setShowResults(false); setTimeTaken(0); }}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition">
              Retake Test
            </button>
            <button onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition">
              Back to Chapter
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ── QUIZ DRAWER ───────────────────────────────────────────────────────────
  return (
    <>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden"
      >
        {/* header */}
        <TestHeader
          title={mainTitle}
          subtitle={subtitle}
          idx={idx}
          n={n}
          timeLeft={timeLeft}
          onClose={() => setShowConfirmLeave(true)}
        />

        {/* body: question + sidebar */}
        <div className="flex-1 overflow-hidden flex">
          {/* question column */}
          <div ref={questionRef} className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.18 }}
              >
                {cur && (
                  <QuestionPanel
                    mcq={cur}
                    idx={idx}
                    status={status(cur.mcqId)}
                    selected={answers[cur.mcqId]}
                    onSelect={selectAnswer}
                    onMark={handleMark}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* sidebar (desktop) */}
          <QuestionPalette
            className="hidden lg:flex"
            mcqs={mcqs}
            idx={idx}
            statuses={statuses}
            counts={counts}
            onNavigate={navigate}
          />
        </div>

        {/* footer */}
        <TestFooter
          idx={idx}
          n={n}
          onPrev={handlePrev}
          onNext={handleNext}
          onSkip={handleSkip}
          onSubmit={() => setShowSubmitModal(true)}
          onPaletteOpen={() => setPaletteOpen(true)}
        />
      </motion.div>

      {/* mobile palette bottom sheet */}
      <AnimatePresence>
        {paletteOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setPaletteOpen(false)}
              className="fixed inset-0 z-60 bg-black/40" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-61 bg-background rounded-t-2xl border-t border-border p-5 max-h-[75vh] overflow-y-auto">
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <p className="text-sm font-bold text-foreground mb-3">Question Palette</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mcqs.map((m, i) => (
                  <button key={m.mcqId} onClick={() => { navigate(i); setPaletteOpen(false); }}
                    className={cn('w-10 h-10 rounded-lg text-sm font-semibold transition',
                      i === idx ? 'bg-primary text-white ring-2 ring-primary/30'
                      : STATUS_COLOR[status(m.mcqId)])}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                {LEGEND.map(l => (
                  <div key={l.key} className="flex items-center gap-2 text-xs text-foreground/60">
                    <span className={cn('w-3.5 h-3.5 rounded-sm', l.color)} />{l.label}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border p-3 text-center">
                  <p className="text-xl font-bold text-green-600">{counts.answered}</p>
                  <p className="text-xs text-foreground/50">Answered</p>
                </div>
                <div className="rounded-xl border p-3 text-center">
                  <p className="text-xl font-bold text-gray-500">{counts.skipped}</p>
                  <p className="text-xs text-foreground/50">Skipped</p>
                </div>
                <div className="rounded-xl border p-3 text-center">
                  <p className="text-xl font-bold text-orange-400">{counts.marked}</p>
                  <p className="text-xs text-foreground/50">Marked</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* submit modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-61 flex items-center justify-center p-4">
              <div className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-sm p-6 space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">Submit Test?</h2>
                  <p className="text-sm text-foreground/60 mt-1">Make sure you&apos;ve reviewed all questions.</p>
                </div>
                <div className="space-y-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
                  {[
                    { label: 'Total Questions',   value: n },
                    { label: 'Answered',          value: counts.answered },
                    { label: 'Skipped',           value: counts.skipped },
                    { label: 'Marked for Review', value: counts.marked },
                    { label: 'Unvisited',         value: counts.unvisited },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-foreground/60">{r.label}</span>
                      <span className="font-semibold">{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-muted transition">
                    Continue Test
                  </button>
                  <button onClick={handleFinalSubmit}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition">
                    Submit Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* confirm leave modal */}
      <AnimatePresence>
        {showConfirmLeave && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-61 flex items-center justify-center p-4">
              <div className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-sm p-6 space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">Leave Test?</h2>
                  <p className="text-sm text-foreground/60 mt-1">Your progress is saved. You can resume later.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowConfirmLeave(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-muted transition">
                    Stay
                  </button>
                  <button onClick={() => { setShowConfirmLeave(false); onClose(); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition">
                    Leave
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}