'use client';

import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { AlertTriangle, Users, BookOpen, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

export default function TeacherDashboardPage() {
  const { data: overview, isLoading: overviewLoading } = trpc.analytics.classProgressOverview.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { data: alerts, isLoading: alertsLoading } = trpc.analytics.confidentMistakeAlerts.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { data: distractor, isLoading: distractorLoading } = trpc.analytics.distractorIntelligence.useQuery(
    { limit: 5 },
    { refetchOnWindowFocus: false },
  );

  const students = overview?.data ?? [];
  const alertStudents = alerts?.data ?? [];
  const topDistractors = distractor?.data ?? [];

  return (
    <div className="space-y-8 p-6">
      <div>
        <Heading1 className="text-2xl font-bold text-foreground">Teacher Dashboard</Heading1>
        <Para className="text-muted-foreground text-sm mt-1">Class performance, struggle reports, and student alerts</Para>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500 dark:bg-blue-950/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <Para className="text-xs text-muted-foreground font-medium">Total Students</Para>
            <Para className="text-2xl font-bold text-foreground mt-0.5">{students.length}</Para>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 p-5 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-950/40">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <Para className="text-xs text-amber-700 dark:text-amber-400 font-medium">Confident Mistake Alerts</Para>
            <Para className="text-2xl font-bold text-amber-800 dark:text-amber-300 mt-0.5">{alertStudents.length}</Para>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-red-50 text-red-500 dark:bg-red-950/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <Para className="text-xs text-muted-foreground font-medium">High-Error MCQs</Para>
            <Para className="text-2xl font-bold text-foreground mt-0.5">{topDistractors.length}</Para>
          </div>
        </div>
      </section>

      {/* Confident mistake alerts */}
      {alertStudents.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <Heading2 className="text-base font-semibold text-foreground">Student Alerts — Confident Mistakes This Week</Heading2>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-right">Confident Mistakes</th>
                  <th className="px-4 py-3 text-right">Topics Affected</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {alertStudents.map((s: Record<string, unknown>) => (
                  <tr key={String(s.userId)} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Para className="font-medium text-foreground">{String(s.name ?? 'Unknown')}</Para>
                      <Para className="text-xs text-muted-foreground">{String(s.email ?? '')}</Para>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-red-600">{String(s.totalConfidentMistakes)}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{String(s.affectedMcqCount)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                        <RotateCcw className="w-3 h-3" /> Assign Drill
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Class struggle report — top distractors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Heading2 className="text-base font-semibold text-foreground">Class Struggle Report</Heading2>
          <Link href="/dashboard/analytics" className="text-xs text-primary hover:underline">View full report →</Link>
        </div>
        {distractorLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
        ) : topDistractors.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No attempt data yet.</div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Question</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Top Wrong Answer</th>
                  <th className="px-4 py-3 text-right">Wrong Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topDistractors.map((item: Record<string, unknown>) => {
                  const options = (item.options as string[]) ?? [];
                  const topIdx = Number(item.topDistractor);
                  const wrongRate = Math.round(Number(item.wrongRate) * 100);
                  return (
                    <tr key={String(item.mcqId)} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-foreground line-clamp-1 max-w-xs">{String(item.question ?? '—')}</td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground text-xs">
                        <span className="font-semibold text-red-600">{String.fromCharCode(65 + topIdx)}:</span> {options[topIdx] ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn(
                          'font-bold',
                          wrongRate >= 70 ? 'text-red-600' : wrongRate >= 50 ? 'text-amber-600' : 'text-muted-foreground',
                        )}>
                          {wrongRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Student progress table */}
      <section>
        <Heading2 className="text-base font-semibold text-foreground mb-4">Student Progress Overview</Heading2>
        {overviewLoading ? (
          <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />)}</div>
        ) : students.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No students in your institution yet.</div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-right">Attempted</th>
                  <th className="px-4 py-3 text-right">Accuracy</th>
                  <th className="px-4 py-3 text-right hidden sm:table-cell">Open Loops</th>
                  <th className="px-4 py-3 text-right hidden md:table-cell">Weak Topics</th>
                  <th className="px-4 py-3 text-right hidden md:table-cell">Conf. Mistakes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((s: Record<string, unknown>) => {
                  const accuracy = Math.round(Number(s.accuracy) * 100);
                  return (
                    <tr key={String(s.userId)} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{String(s.name ?? 'Unknown')}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{String(s.total)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn('font-semibold', accuracy >= 70 ? 'text-green-600' : accuracy >= 40 ? 'text-amber-600' : 'text-red-500')}>
                          {accuracy}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell text-amber-600 font-medium">{String(s.openLoops)}</td>
                      <td className="px-4 py-3 text-right hidden md:table-cell text-red-500">{String(s.weakSubHeadings)}</td>
                      <td className="px-4 py-3 text-right hidden md:table-cell text-violet-600 font-semibold">{String(s.confidentMistakes)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
