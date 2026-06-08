'use client';

import React from 'react';
import { format } from 'date-fns';

export function DefaultDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize tracking-tight">Welcome</h1>
        <p>It&apos;s {currentDate}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Overview Statistics</h2>
      </div>
    </div>
  );
}
