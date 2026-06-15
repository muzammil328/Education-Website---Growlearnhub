'use client';

import React from 'react';
import { format } from 'date-fns';
import { Card, Heading1, Heading2, Heading3, Para } from '@muzammil328/ui';
import { GraduationCap, FileText, ListChecks } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { UsersIcon } from 'lucide-react';
import { TrendingUpIcon } from 'lucide-react';

export function TeacherDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const stats = [
    { title: 'My Classes', count: 8, icon: <GraduationCap className="h-8 w-8" />, trend: 'Active' },
    {
      title: 'Total Students',
      count: 245,
      icon: <UsersIcon className="h-8 w-8" />,
      trend: 'In my classes',
    },
    {
      title: 'Assignments Pending',
      count: 12,
      icon: <FileText className="h-8 w-8" />,
      trend: 'To review',
    },
    {
      title: 'Upcoming Events',
      count: 5,
      icon: <CalendarIcon className="h-8 w-8" />,
      trend: 'This week',
    },
    {
      title: 'Course Progress',
      count: 78,
      icon: <TrendingUpIcon className="h-8 w-8" />,
      trend: '% completed',
    },
    { title: 'MCQs Created', count: 156, icon: <ListChecks className="h-8 w-8" />, trend: 'Total' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Heading1 className="text-3xl font-bold capitalize tracking-tight">Teacher Dashboard</Heading1>
        <Para>It&apos;s {currentDate}</Para>
      </div>

      <div>
        <Heading2 className="text-2xl font-semibold mb-4">My Statistics</Heading2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Para className="text-sm font-medium text-muted-foreground">{stat.title}</Para>
                  <div className="flex items-baseline gap-2 mt-2">
                    <Para className="text-3xl font-bold">{stat.count.toLocaleString()}</Para>
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
          <Heading3 className="text-lg font-semibold mb-4">Quick Actions</Heading3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Create Assignment
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Add MCQs
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Schedule Class
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              View Student Progress
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <Heading3 className="text-lg font-semibold mb-4">Recent Activity</Heading3>
          <Para>Your recent teaching activities will appear here</Para>
        </Card>
      </div>
    </div>
  );
}
