'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Para, Progress } from '@muzammil328/ui';
import { Trophy, Target } from 'lucide-react';
import { TrendingUpIcon } from 'lucide-react';
import { ClockIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface QuizAttempt {
  id: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeTaken?: number;
}

interface AnalyticsData {
  totalQuizzes: number;
  averageScore: number;
  totalQuestions: number;
  correctAnswers: number;
  recentAttempts: QuizAttempt[];
  subjectPerformance: {
    subject: string;
    averageScore: number;
    attempts: number;
  }[];
}

interface AnalyticsPageProps {
  userId?: string;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ userId }) => {
  // TODO: Replace with actual API call
  const { data: analyticsData, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['student-analytics', userId],
    queryFn: async () => {
      // Placeholder - replace with actual API endpoint
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        recentAttempts: [],
        subjectPerformance: [],
      };
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-32 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No analytics data available yet. Start taking quizzes to see your progress!
        </CardContent>
      </Card>
    );
  }

  const accuracy =
    analyticsData.totalQuestions > 0
      ? Math.round((analyticsData.correctAnswers / analyticsData.totalQuestions) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalQuizzes}</div>
            <Para className="text-xs text-muted-foreground">Quizzes completed</Para>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageScore}%</div>
            <Para className="text-xs text-muted-foreground">Overall performance</Para>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accuracy}%</div>
            <Para className="text-xs text-muted-foreground">
              {analyticsData.correctAnswers} / {analyticsData.totalQuestions} correct
            </Para>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalQuestions}</div>
            <Para className="text-xs text-muted-foreground">Questions answered</Para>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      {analyticsData.subjectPerformance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.subjectPerformance.map(subject => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span>
                    {subject.averageScore}% ({subject.attempts} attempts)
                  </span>
                </div>
                <Progress value={subject.averageScore} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Attempts */}
      {analyticsData.recentAttempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Quiz Attempts</CardTitle>
            <CardDescription>Your last 5 quiz attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentAttempts.map(attempt => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <Para className="font-medium">{attempt.quizName}</Para>
                    <Para className="text-sm text-muted-foreground">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </Para>
                  </div>
                  <div className="text-right">
                    <Para className="font-bold text-primary">
                      {attempt.score}/{attempt.totalQuestions}
                    </Para>
                    <Para className="text-sm text-muted-foreground">{attempt.percentage}%</Para>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
