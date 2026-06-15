'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';
import { Heading2, Para } from '@muzammil328/ui';

export default function Page({ params }: { params: Promise<{ handout: string; name: string }> }) {
  const [handoutSlug, setHandoutSlug] = React.useState('');
  const [nameSlug, setNameSlug] = React.useState('');

  React.useEffect(() => {
    params.then(p => {
      setHandoutSlug(p.handout);
      setNameSlug(p.name);
    });
  }, [params]);

  const { data, isLoading } = useBookDetail('vu', handoutSlug);
  const book = data?.data?.book;
  const externalLinks: { name: string; slug: string; url: string }[] = (book as any)?.externalLinks ?? [];
  const currentLink = externalLinks.find(l => l.slug === nameSlug);

  const handoutName = book?.name ?? handoutSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const sourceName = currentLink?.name ?? nameSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`${handoutName} – ${sourceName} | VU Final Exam Handouts – GrowLearnHub`}
      canonical={`/vu/final-mcqs/${handoutSlug}/${nameSlug}/`}
      url={`https://growlearnhub.com/vu/final-mcqs/${handoutSlug}/${nameSlug}/`}
    >
      <article className="max-w-none">
        <header className="mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/vu/final-mcqs/${handoutSlug}`}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {handoutName}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium text-foreground">{sourceName}</span>
          </div>
          <Heading2 className="text-xl font-semibold text-primary mt-2">
            {handoutName} – {sourceName}
          </Heading2>
        </header>

        <section>
          {isLoading ? (
            <div className="h-screen rounded-lg bg-muted animate-pulse" />
          ) : !currentLink ? (
            <div className="rounded-lg border border-border p-8 text-center">
              <Para className="text-muted-foreground">Source not found.</Para>
              <Link href={`/vu/final-mcqs/${handoutSlug}`} className="mt-4 inline-block text-primary hover:underline text-sm">
                Back to {handoutName}
              </Link>
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                <span className="text-sm font-medium text-foreground">{sourceName}</span>
                <a
                  href={currentLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in new tab
                </a>
              </div>
              <iframe
                src={currentLink.url}
                className="w-full"
                style={{ height: '85vh', minHeight: 500 }}
                title={`${handoutName} – ${sourceName}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          )}
        </section>
      </article>
    </UserLayout>
  );
}
