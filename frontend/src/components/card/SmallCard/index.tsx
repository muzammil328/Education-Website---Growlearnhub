import { SmallCardProps } from '@/types';
import Link from 'next/link';

export default function CardSmall(props: SmallCardProps) {
  return (
    <Link
      href={`/${props.link}/`}
      className={`group flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 transition-colors duration-150 hover:bg-muted/50 ${props.className ?? ''}`}
    >
      <span className="text-sm font-medium text-foreground">
        {props.title}
      </span>

      <svg
        className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}