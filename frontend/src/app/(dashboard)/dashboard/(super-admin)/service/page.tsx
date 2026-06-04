import React from 'react';
import { Metadata } from 'next';
import { SortOrder, Status } from '@muzammil328/education-packages/types';
import DashboardServicePage from '@/features/DashboardServicePage';

export const metadata: Metadata = {
  title: 'Service Management',
  description: 'Manage your services',
};

export default async function Page({
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
      <DashboardServicePage
        status={status ? (status as Status) : undefined}
        sort={sort ? (sort as string) : undefined}
        order={order ? (order as SortOrder) : undefined}
      />
    </div>
  );
}
