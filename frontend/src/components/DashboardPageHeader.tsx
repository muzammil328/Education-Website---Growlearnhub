import React from 'react';

interface DashboardPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export function DashboardPageHeader({
  title,
  description,
  action,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  children,
}: DashboardPageHeaderProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {(searchValue !== undefined || children) && (
        <div className="flex items-center justify-between gap-4">
          {searchValue !== undefined && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="py-2 px-3 focus:outline-none h-10 w-64 border rounded-md"
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
            />
          )}
          {children && <div className="flex items-center gap-3 ml-auto">{children}</div>}
        </div>
      )}
    </div>
  );
}
