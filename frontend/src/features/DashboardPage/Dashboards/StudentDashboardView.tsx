'use client';

import React from 'react';
import { format } from 'date-fns';
import { Card } from '@muzammil328/ui';
import { School, FileText, ListChecks, CheckCircle2 } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { ClockIcon } from 'lucide-react';

export function StudentDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const stats = [
    { title: 'My Courses', count: 6, icon: <School className="h-8 w-8" />, trend: 'Enrolled' },
    {
      title: 'Assignments Due',
      count: 8,
      icon: <FileText className="h-8 w-8" />,
      trend: 'Next 7 days',
    },
    {
      title: 'Completed',
      count: 45,
      icon: <CheckCircle2 className="h-8 w-8" />,
      trend: 'Assignments',
    },
    {
      title: 'Upcoming Events',
      count: 3,
      icon: <CalendarIcon className="h-8 w-8" />,
      trend: 'This week',
    },
    {
      title: 'Quiz Scores',
      count: 87,
      icon: <ListChecks className="h-8 w-8" />,
      trend: '% average',
    },
    { title: 'Attendance', count: 92, icon: <ClockIcon className="h-8 w-8" />, trend: '% rate' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">It&apos;s {currentDate}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">My Statistics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold">{stat.count.toLocaleString()}</p>
                    <span className="text-xs text-muted-foreground">{stat.trend}</span>
                  </div>
                </div>
                <div className="text-destructive opacity-80">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              View Assignments
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Take Quiz
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              View Schedule
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Access Study Materials
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-muted-foreground">Your recent learning activities will appear here</p>
        </Card>
      </div>
    </div>
  );
}
