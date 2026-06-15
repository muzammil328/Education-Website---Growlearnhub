import React from 'react';
import { Heading1, Para } from '@muzammil328/ui';

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function DashboardPageHeader({ title, description, action }: DashboardPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4">
      <div className="space-y-0.5">
        <Heading1 className="text-3xl font-bold tracking-tight text-foreground">{title}</Heading1>
        <Para className="text-sm text-muted-foreground">{description}</Para>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
