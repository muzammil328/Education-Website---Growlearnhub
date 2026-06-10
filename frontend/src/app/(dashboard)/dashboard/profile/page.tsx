'use client';

import React, { useState, useEffect } from 'react';
import { useCurrentUser, useLogout } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@muzammil328/ui';
import { Label, Input } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { Target, Calendar, Flame, Award } from 'lucide-react';

const COMMON_EXAMS = [
  'MDCAT', 'ECAT', 'USAT', 'NTS', 'PPSC', 'FPSC', 'CSS',
  'Matric Board', 'FSc Board', 'O-Levels', 'A-Levels', 'Other',
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const { data: badgesData } = trpc.user.myBadges.useQuery(undefined, { refetchOnWindowFocus: false });

  const { data: readiness, refetch: refetchReadiness } = trpc.user.readinessScore.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const setExamTarget = trpc.user.setExamTarget.useMutation({
    onSuccess: () => {
      toast.success('Exam target saved');
      void refetchReadiness();
    },
    onError: () => toast.error('Failed to save exam target'),
  });

  const [examTarget, setExamTargetState] = useState('');
  const [examDate, setExamDate] = useState('');

  useEffect(() => {
    if (readiness?.hasExam) {
      setExamTargetState(readiness.examTarget ?? '');
      setExamDate(readiness.examDate ? readiness.examDate.split('T')[0] : '');
    }
  }, [readiness]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, { onSuccess: () => router.push('/login') });
  };

  const handleSaveExam = () => {
    if (!examTarget || !examDate) { toast.error('Please fill in both fields'); return; }
    setExamTarget.mutate({ examTarget, examDate: new Date(examDate).toISOString() });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const daysLeft = readiness?.daysRemaining ?? null;
  const readinessScore = readiness?.readinessScore ?? 0;

  return (
    <div className="container mx-auto py-8 max-w-2xl space-y-6">
      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View and manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ''} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={user?.username || ''} disabled />
          </div>

          <div className="pt-2">
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </div>
        </CardContent>
      </Card>

      {/* Exam countdown card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Exam Countdown
          </CardTitle>
          <CardDescription>Set your target exam to track readiness and get a daily countdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Current readiness if set */}
          {readiness?.hasExam && daysLeft !== null && (
            <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{readiness.examTarget}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(readiness.examDate!).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{daysLeft}</p>
                  <p className="text-xs text-muted-foreground">days left</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Readiness Score</span>
                  <span className={cn(
                    'text-xs font-bold',
                    readinessScore >= 70 ? 'text-green-600' : readinessScore >= 40 ? 'text-amber-600' : 'text-red-500',
                  )}>
                    {readinessScore}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      readinessScore >= 70 ? 'bg-green-500' : readinessScore >= 40 ? 'bg-amber-500' : 'bg-red-500',
                    )}
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {readiness.strongSubHeadings} of {readiness.totalTrackedSubHeadings} tracked topics mastered
                </p>
              </div>

              {(readiness.burstStreakCount ?? 0) > 0 && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <Flame className="w-4 h-4" />
                  <span className="font-semibold">{readiness.burstStreakCount} day burst streak</span>
                </div>
              )}
            </div>
          )}

          {/* Set / update exam */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Target Exam</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_EXAMS.map(exam => (
                  <button
                    key={exam}
                    onClick={() => setExamTargetState(exam)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition',
                      examTarget === exam
                        ? 'bg-primary text-white border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
                    )}
                  >
                    {exam}
                  </button>
                ))}
              </div>
              {examTarget === 'Other' && (
                <Input
                  placeholder="Enter your exam name"
                  value={examTarget === 'Other' ? '' : examTarget}
                  onChange={e => setExamTargetState(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input
                id="examDate"
                type="date"
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button
              onClick={handleSaveExam}
              disabled={!examTarget || !examDate || setExamTarget.isPending}
              className="w-full"
            >
              {setExamTarget.isPending ? 'Saving...' : readiness?.hasExam ? 'Update Exam Target' : 'Set Exam Target'}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Badges card */}
      {(badgesData?.badges?.length ?? 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Badges Earned
            </CardTitle>
            <CardDescription>Achievements unlocked through your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {badgesData!.badges.map(badge => (
                <BadgeChip key={badge} badge={badge} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const BADGE_META: Record<string, { label: string; icon: string; color: string }> = {
  conquer_it: { label: 'Conqueror', icon: '⚔️', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300' },
  open_loop_closer: { label: 'Loop Closer', icon: '🔄', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' },
  confident_mistake_zero: { label: 'Mistake-Free', icon: '🎯', color: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' },
  burst_streak_3: { label: '3-Day Streak', icon: '🔥', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
  burst_streak_7: { label: '7-Day Streak', icon: '🔥', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300' },
  burst_streak_30: { label: '30-Day Streak', icon: '🔥', color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300' },
  exam_ready: { label: 'Exam Ready', icon: '🎓', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
};

function BadgeChip({ badge }: { badge: string }) {
  const meta = BADGE_META[badge] ?? { label: badge, icon: '🏅', color: 'bg-muted text-muted-foreground' };
  return (
    <div className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', meta.color)}>
      <span>{meta.icon}</span>
      <span>{meta.label}</span>
    </div>
  );
}
