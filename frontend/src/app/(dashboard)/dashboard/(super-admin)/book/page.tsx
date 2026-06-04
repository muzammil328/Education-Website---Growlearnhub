import React from 'react';
import { Metadata } from 'next';
import DashboardBookPage from '@/features/DashboardBookPage';

export const metadata: Metadata = {
  title: 'Book Management',
  description: 'Manage your books',
};

export default async function Page() {
  return (
    <div className="space-y-6 py-3">
      <DashboardBookPage />
    </div>
  );
}
