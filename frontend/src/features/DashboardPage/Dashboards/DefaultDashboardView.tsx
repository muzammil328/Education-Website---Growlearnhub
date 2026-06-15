'use client';

import React from 'react';
import { format } from 'date-fns';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

export function DefaultDashboardView() {
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Heading1 className="text-3xl font-bold capitalize tracking-tight">Welcome</Heading1>
        <Para>It&apos;s {currentDate}</Para>
      </div>

      <div>
        <Heading2 className="text-2xl font-semibold mb-4">Overview Statistics</Heading2>
      </div>
    </div>
  );
}
