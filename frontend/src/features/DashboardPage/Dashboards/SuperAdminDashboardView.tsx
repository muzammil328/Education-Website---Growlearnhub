'use client';

import React from 'react';
import { Users, UserCog, GraduationCap, BookOpen, Book, ListOrdered, Layers, LayoutDashboard, Puzzle, ClipboardList } from 'lucide-react';
import StatCard from '@/components/card/StatCard';
import { useDashboardStats } from '@/hooks/use-dashboard';
import { Card, CardContent } from '@muzammil328/ui';

function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-6 w-16 rounded bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SuperAdminDashboardView() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the super admin dashboard.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : stats ? (
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard title="Total Users" count={stats.users.total} icon={<Users className="h-5 w-5" />} />
          <StatCard title="Super Admins" count={stats.users.superAdmins} icon={<UserCog className="h-5 w-5" />} />
          <StatCard title="Admins" count={stats.users.admins} icon={<UserCog className="h-5 w-5" />} />
          <StatCard title="Teachers" count={stats.users.teachers} icon={<GraduationCap className="h-5 w-5" />} />
          <StatCard title="Students" count={stats.users.students} icon={<Users className="h-5 w-5" />} />
          <StatCard title="Classes" count={stats.content.classes} icon={<BookOpen className="h-5 w-5" />} />
          <StatCard title="Books" count={stats.content.books} icon={<Book className="h-5 w-5" />} />
          <StatCard title="Chapters" count={stats.content.chapters} icon={<ListOrdered className="h-5 w-5" />} />
          <StatCard title="Headings" count={stats.content.headings} icon={<Layers className="h-5 w-5" />} />
          <StatCard title="Sub Headings" count={stats.content.subHeadings} icon={<LayoutDashboard className="h-5 w-5" />} />
          <StatCard title="Boards" count={stats.content.boards} icon={<LayoutDashboard className="h-5 w-5" />} />
          <StatCard title="Services" count={stats.content.services} icon={<Puzzle className="h-5 w-5" />} />
          <StatCard title="MCQs" count={stats.content.mcqs} icon={<ClipboardList className="h-5 w-5" />} />
        </div>
      ) : (
        <div className="text-muted-foreground">Failed to load stats.</div>
      )}
    </div>
  );
}
