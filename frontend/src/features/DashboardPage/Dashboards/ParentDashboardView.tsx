'use client';

import React from 'react';
import { format } from 'date-fns';
import { Card } from '@muzammil328/ui';
import { MessageSquare, CreditCard } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { UsersIcon } from 'lucide-react';
import { ClockIcon } from 'lucide-react';
import { TrendingUpIcon } from 'lucide-react';

export function ParentDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const stats = [
    {
      title: 'Children Enrolled',
      count: 2,
      icon: <UsersIcon className="h-8 w-8" />,
      trend: 'Active',
    },
    {
      title: 'Overall Performance',
      count: 85,
      icon: <TrendingUpIcon className="h-8 w-8" />,
      trend: '% average',
    },
    {
      title: 'Attendance Rate',
      count: 94,
      icon: <ClockIcon className="h-8 w-8" />,
      trend: '% this month',
    },
    {
      title: 'Upcoming Events',
      count: 4,
      icon: <CalendarIcon className="h-8 w-8" />,
      trend: 'This month',
    },
    { title: 'Fee Status', count: 1, icon: <CreditCard className="h-8 w-8" />, trend: 'Pending' },
    {
      title: 'Teacher Messages',
      count: 3,
      icon: <MessageSquare className="h-8 w-8" />,
      trend: 'Unread',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground">It&apos;s {currentDate}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Overview Statistics</h2>
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
              View Child&apos;s Progress
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Contact Teacher
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Pay Fees
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              View Schedule
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          <p className="text-muted-foreground">Updates about your children will appear here</p>
        </Card>
      </div>
    </div>
  );
}
