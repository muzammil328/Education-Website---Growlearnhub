'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  CheckCircle2,
  XCircle,
  Target,
  Clock,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Flame,
  CalendarClock,
  Calendar,
} from 'lucide-react';
import { trpc } from '@/trpc/trpc';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function StudentDashboardView() {
  const { user } = useAuth();
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const { data: stats, isLoading: statsLoading } = trpc.mcqAttempt.myStats.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: historyData, isLoading: historyLoading } = trpc.mcqAttempt.myHistory.useQuery(
    { page: 1, limit: 10 },
    { enabled: Boolean(user), refetchOnWindowFocus: false },
  );

  const { data: openLoopsData } = trpc.userProgress.openLoops.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: dueData } = trpc.userProgress.dueForReview.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: weakData } = trpc.userProgress.weakSubHeadings.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: myProgressData } = trpc.userProgress.myProgress.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: badgesData } = trpc.user.myBadges.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const { data: readiness } = trpc.user.readinessScore.useQuery(undefined, {
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const history = historyData?.data ?? [];
  const accuracy = stats ? Math.round((stats.accuracy ?? 0) * 100) : 0;
  const openLoopCount = openLoopsData?.totalOpenLoops ?? 0;
  const dueCount = dueData?.data?.length ?? 0;
  const weakCount = weakData?.data?.length ?? 0;

  const statCards = [
    {
      label: 'Total Attempted',
      value: stats?.total ?? 0,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',
    },
    {
      label: 'Correct',
      value: stats?.correct ?? 0,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50 dark:bg-green-950/30',
    },
    {
      label: 'Incorrect',
      value: stats?.incorrect ?? 0,
      icon: <XCircle className="w-5 h-5" />,
      color: 'text-red-500 bg-red-50 dark:bg-red-950/30',
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: <Target className="w-5 h-5" />,
      color: 'text-primary bg-primary/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0] ?? 'Student'} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">{currentDate}</p>
      </div>

      {/* Adaptive Alerts Row */}
      {(openLoopCount > 0 || dueCount > 0 || (stats?.confidentMistakes ?? 0) > 0) && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {openLoopCount > 0 && (
            <Link
              href={`/drill/${openLoopsData?.data?.[0] ? String((openLoopsData.data[0].subHeadingId as Record<string,string>)?._id ?? openLoopsData.data[0].subHeadingId ?? '') : ''}`}
              className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 px-4 py-3 hover:border-amber-400 transition"
            >
              <RotateCcw className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {openLoopCount} Open {openLoopCount === 1 ? 'Loop' : 'Loops'}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400">Tap to start focused drill →</p>
              </div>
            </Link>
          )}
          {dueCount > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20 px-4 py-3">
              <CalendarClock className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  {dueCount} Due for Review
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Spaced repetition due today</p>
              </div>
            </div>
          )}
          {(stats?.confidentMistakes ?? 0) > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20 px-4 py-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                  {stats?.confidentMistakes} Confident Mistakes
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">Sure but wrong — misconceptions</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Exam Countdown */}
      {readiness?.hasExam && (
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{readiness.examTarget}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(readiness.examDate!).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              {(readiness.burstStreakCount ?? 0) > 0 && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-bold">{readiness.burstStreakCount}</span>
                  <span className="text-xs text-muted-foreground">streak</span>
                </div>
              )}
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{readiness.daysRemaining}</p>
                <p className="text-xs text-muted-foreground">days left</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground font-medium">Readiness</span>
              <span className={cn(
                'text-xs font-bold',
                (readiness.readinessScore ?? 0) >= 70 ? 'text-green-600' :
                (readiness.readinessScore ?? 0) >= 40 ? 'text-amber-600' : 'text-red-500',
              )}>
                {readiness.readinessScore}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700',
                  (readiness.readinessScore ?? 0) >= 70 ? 'bg-green-500' :
                  (readiness.readinessScore ?? 0) >= 40 ? 'bg-amber-500' : 'bg-red-500',
                )}
                style={{ width: `${readiness.readinessScore ?? 0}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Stat Cards */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">Your MCQ Stats</h2>
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map(card => (
              <div
                key={card.label}
                className="rounded-xl border border-border bg-card p-5 flex items-start gap-4"
              >
                <div
                  className={cn(
                    'shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                    card.color,
                  )}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-0.5">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Accuracy bar */}
      {!statsLoading && stats && stats.total > 0 && (
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Overall Accuracy</span>
            </div>
            <span className="text-sm font-bold text-primary">{accuracy}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700',
                accuracy >= 70 ? 'bg-green-500' : accuracy >= 40 ? 'bg-amber-500' : 'bg-red-500',
              )}
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{stats.correct} correct</span>
            <span>{stats.incorrect} incorrect</span>
          </div>
        </section>
      )}

      {/* Weak Topics */}
      {weakCount > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <h2 className="text-base font-semibold text-foreground">Weak Topics</h2>
            </div>
            <span className="text-xs text-muted-foreground">{weakCount} topics need attention</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(weakData?.data ?? []).slice(0, 6).map(p => {
              const sub = p.subHeadingId as Record<string, string> | null;
              const ch = p.chapterId as Record<string, string> | null;
              const label = sub?.name ?? ch?.name ?? 'Unknown topic';
              const score = Math.round(p.masteryScore ?? 0);
              return (
                <div
                  key={String(p._id)}
                  className="rounded-xl border border-red-200 dark:border-red-900/40 bg-card p-4"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-1">{label}</p>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mastery: {score}% · {p.incorrect ?? 0} wrong
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent Attempts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Recent Attempts</h2>
          <Link href="/live/mcqs" className="text-xs text-primary hover:underline">
            Practice more →
          </Link>
        </div>

        {historyLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">No attempts yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Take an online test to see your history here.
            </p>
            <Link
              href="/live/online-test"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start a Test
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Result</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Time Taken</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Attempted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {history.map((attempt, i) => (
                  <tr key={attempt.attemptId} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                          attempt.isCorrect
                            ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400',
                        )}
                      >
                        {attempt.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Incorrect
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                      {attempt.timeTakenMs ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {(attempt.timeTakenMs / 1000).toFixed(1)}s
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      {attempt.attemptedAt
                        ? format(new Date(attempt.attemptedAt), 'd MMM yyyy, HH:mm')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Progress Rings */}
      {(myProgressData?.data?.length ?? 0) > 0 && (
        <section>
          <h2 className="text-base font-semibold text-foreground mb-4">Mastery Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(myProgressData!.data as Array<{ subHeadingId: { name?: string }; masteryBand: string; masteryScore: number }>).slice(0, 8).map((p, i) => {
              const name = p.subHeadingId?.name ?? `Topic ${i + 1}`;
              const score = p.masteryScore ?? 0;
              const band = p.masteryBand ?? 'weak';
              const ringColor = band === 'strong' ? '#22c55e' : band === 'developing' ? '#f59e0b' : '#ef4444';
              const circumference = 2 * Math.PI * 28;
              const dash = (score / 100) * circumference;
              return (
                <div key={i} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="28" fill="none" stroke="currentColor" strokeWidth="7" className="text-muted" />
                    <circle
                      cx="36" cy="36" r="28" fill="none"
                      stroke={ringColor} strokeWidth="7"
                      strokeDasharray={`${dash} ${circumference}`}
                      strokeLinecap="round"
                      transform="rotate(-90 36 36)"
                    />
                    <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="700" fill={ringColor}>{score}%</text>
                  </svg>
                  <p className="text-xs font-medium text-center text-foreground leading-tight line-clamp-2">{name}</p>
                  <span className={cn(
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                    band === 'strong' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' :
                    band === 'developing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' :
                    'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
                  )}>
                    {band.charAt(0).toUpperCase() + band.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Badges */}
      {(badgesData?.badges?.length ?? 0) > 0 && (
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badgesData!.badges.map((badge: string) => {
              const BADGE_META: Record<string, { label: string; icon: string; color: string }> = {
                conquer_it: { label: 'Conqueror', icon: '⚔️', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300' },
                open_loop_closer: { label: 'Loop Closer', icon: '🔄', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
                confident_mistake_zero: { label: 'Mistake-Free', icon: '🎯', color: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' },
                burst_streak_3: { label: '3-Day Streak', icon: '🔥', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
                burst_streak_7: { label: '7-Day Streak', icon: '🔥', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300' },
                burst_streak_30: { label: '30-Day Streak', icon: '🔥', color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300' },
                exam_ready: { label: 'Exam Ready', icon: '🎓', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
              };
              const meta = BADGE_META[badge] ?? { label: badge, icon: '🏅', color: 'bg-muted text-muted-foreground' };
              return (
                <div key={badge} className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', meta.color)}>
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Micro Burst ⚡', href: '/burst', desc: '5 targeted questions in under 5 min' },
            { label: 'Take Online Test', href: '/live/online-test', desc: 'Practice with timed sets' },
            { label: 'Browse MCQs', href: '/live/mcqs', desc: 'Study at your own pace' },
            { label: 'Class 9 MCQs', href: '/class-9/mcqs', desc: 'Chapter-wise questions' },
          ].map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 hover:bg-muted/40 transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
