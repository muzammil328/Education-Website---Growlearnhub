import Link from 'next/link';

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
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </Link>
  );
}
