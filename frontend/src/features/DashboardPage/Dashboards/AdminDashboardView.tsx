'use client';

import React from 'react';
import { format } from 'date-fns';
import { Card } from '@muzammil328/ui';
import { UserCog, GraduationCap, School, ListChecks } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { UsersIcon } from 'lucide-react';

export function AdminDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const stats = [
    {
      title: 'Total Students',
      count: 1250,
      icon: <UsersIcon className="h-8 w-8" />,
      trend: '+12%',
    },
    { title: 'Total Teachers', count: 45, icon: <UserCog className="h-8 w-8" />, trend: '+5%' },
    { title: 'Total Classes', count: 32, icon: <GraduationCap className="h-8 w-8" />, trend: '+3' },
    { title: 'Total Courses', count: 156, icon: <School className="h-8 w-8" />, trend: '+8' },
    {
      title: 'Active Events',
      count: 12,
      icon: <CalendarIcon className="h-8 w-8" />,
      trend: '3 upcoming',
    },
    {
      title: 'Pending MCQs',
      count: 23,
      icon: <ListChecks className="h-8 w-8" />,
      trend: 'Review needed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize tracking-tight">Admin Dashboard</h1>
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
              Add New Student
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Create Course
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Schedule Event
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
              Review Pending Items
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-muted-foreground">Activity feed will be displayed here</p>
        </Card>
      </div>
    </div>
  );
}
