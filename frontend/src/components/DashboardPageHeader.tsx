import React from 'react';

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function DashboardPageHeader({ title, description, action }: DashboardPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4">
      <div className="space-y-0.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
