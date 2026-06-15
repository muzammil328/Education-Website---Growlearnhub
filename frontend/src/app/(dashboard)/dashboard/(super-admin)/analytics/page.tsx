'use client';

import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingDown, Users, Activity } from 'lucide-react';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

export default function DistractorIntelligencePage() {
  const { data: distractor, isLoading: distractorLoading } = trpc.analytics.distractorIntelligence.useQuery(
    { limit: 15 },
    { refetchOnWindowFocus: false },
  );

  const { data: platform, isLoading: platformLoading } = trpc.analytics.platformStats.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const items = distractor?.data ?? [];

  return (
    <div className="space-y-8 p-6">
      <div>
        <Heading1 className="text-2xl font-bold text-foreground">Analytics</Heading1>
        <Para className="text-muted-foreground text-sm mt-1">Platform-wide performance and distractor intelligence</Para>
      </div>

      {/* Platform stats */}
      <section>
        <Heading2 className="text-base font-semibold text-foreground mb-4">Platform Overview</Heading2>
        {platformLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'DAU', value: platform?.dau ?? 0, icon: <Users className="w-5 h-5" />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
              { label: 'WAU', value: platform?.wau ?? 0, icon: <Activity className="w-5 h-5" />, color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30' },
              { label: 'Total Attempts', value: (platform?.totalAttempts ?? 0).toLocaleString(), icon: <TrendingDown className="w-5 h-5" />, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' },
              { label: 'Accuracy', value: `${Math.round((platform?.overallAccuracy ?? 0) * 100)}%`, icon: <AlertTriangle className="w-5 h-5" />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
            ].map(c => (
              <div key={c.label} className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
                <div className={cn('shrink-0 w-10 h-10 rounded-lg flex items-center justify-center', c.color)}>{c.icon}</div>
                <div>
                  <Para className="text-xs text-muted-foreground font-medium">{c.label}</Para>
                  <Para className="text-2xl font-bold text-foreground mt-0.5">{c.value}</Para>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* High error MCQs */}
      {!platformLoading && (platform?.highErrorMcqs ?? []).length > 0 && (
        <section>
          <Heading2 className="text-base font-semibold text-foreground mb-4">
            MCQs Needing Review <span className="text-xs text-muted-foreground font-normal">(error rate &gt; 60%)</span>
          </Heading2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Question</th>
                  <th className="px-4 py-3 text-right">Attempts</th>
                  <th className="px-4 py-3 text-right">Error Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(platform?.highErrorMcqs ?? []).map((m: Record<string, unknown>) => (
                  <tr key={String(m.mcqId)} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-foreground line-clamp-1 max-w-xs">{String(m.question ?? '—')}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{String(m.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-red-600 font-semibold">{Math.round(Number(m.errorRate) * 100)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Distractor intelligence */}
      <section>
        <Heading2 className="text-base font-semibold text-foreground mb-1">Distractor Intelligence</Heading2>
        <Para className="text-xs text-muted-foreground mb-4">MCQs with the most wrong answers — and which option students chose most</Para>

        {distractorLoading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <Para className="text-sm text-muted-foreground">No attempt data yet.</Para>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item: Record<string, unknown>, i: number) => {
              const options = (item.options as string[]) ?? [];
              const topIdx = Number(item.topDistractor);
              const topOpt = options[topIdx] ?? '—';
              const correctIdx = Number(item.correctOption);
              const wrongRate = Math.round(Number(item.wrongRate) * 100);

              return (
                <div key={String(item.mcqId)} className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <Para className="text-sm font-semibold text-foreground leading-relaxed flex-1">{String(item.question ?? '—')}</Para>
                    <span className={cn(
                      'shrink-0 px-2.5 py-1 rounded-full text-xs font-bold',
                      wrongRate >= 70 ? 'bg-red-100 text-red-700' : wrongRate >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground',
                    )}>
                      {wrongRate}% wrong
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {options.map((opt, oi) => (
                      <div key={oi} className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs border',
                        oi === correctIdx ? 'border-green-300 bg-green-50 dark:bg-green-950/20 text-green-700' :
                        oi === topIdx && oi !== correctIdx ? 'border-red-300 bg-red-50 dark:bg-red-950/20 text-red-700 font-semibold' :
                        'border-border text-muted-foreground',
                      )}>
                        <span className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center font-semibold text-xs">{String.fromCharCode(65 + oi)}</span>
                        <span className="line-clamp-1 flex-1">{opt}</span>
                        {oi === correctIdx && <span className="ml-auto text-green-600 font-bold">✓</span>}
                        {oi === topIdx && oi !== correctIdx && <span className="ml-auto">{Number(item.topDistractorCount)}×</span>}
                      </div>
                    ))}
                  </div>

                  <Para className="text-xs text-muted-foreground">
                    Most students chose <strong className="text-red-600">{String.fromCharCode(65 + topIdx)}: {topOpt}</strong> — {Number(item.topDistractorCount)} out of {Number(item.totalWrong)} wrong answers.
                  </Para>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
