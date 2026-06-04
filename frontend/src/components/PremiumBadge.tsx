import { Crown } from 'lucide-react';

interface PremiumBadgeProps {
  className?: string;
}

export function PremiumBadge({ className = '' }: PremiumBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium ${className}`}
    >
      <Crown className="h-3 w-3" />
      Premium
    </span>
  );
}
