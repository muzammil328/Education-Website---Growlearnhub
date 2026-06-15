import Link from 'next/link';
import { Heading3 } from '@muzammil328/ui';

interface SubjectCardProps {
  title: string;
  link: string;
  className?: string;
}

export function SubjectCard({ title, link, className }: SubjectCardProps) {
  return (
    <Link
      href={`/${link.replace(/^\/+/, '')}`}
      className={`block rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent ${className || ''}`}
    >
      <Heading3 className="text-base font-semibold text-foreground">{title}</Heading3>
    </Link>
  );
}
