import React from 'react';
import { Metadata } from 'next';
import DashboardChapterPage from '@/features/DashboardChapterPage';
import { SortOrder, Status } from '@muzammil328/education-packages/types';

export const metadata: Metadata = {
  title: 'Chapter Management',
  description: 'Manage your chapters',
};

export default async function ChapterPage({
  searchParams,
}: {
  searchParams: {
    status?: string;
    sort?: string;
    order?: string;
  };
}) {
  const { status, sort, order } = await searchParams;

  return (
    <div className="space-y-6 py-3">
      <DashboardChapterPage
        status={status ? (status as Status) : undefined}
        sort={sort ? (sort as string) : undefined}
        order={order ? (order as SortOrder) : undefined}
      />
    </div>
  );
}
