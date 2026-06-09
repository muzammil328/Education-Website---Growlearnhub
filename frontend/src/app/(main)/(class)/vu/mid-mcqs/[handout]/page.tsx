'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';

const DUMMY_PDF = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';

export default function Page({ params }: { params: Promise<{ handout: string }> }) {
  const [handoutSlug, setHandoutSlug] = React.useState('');

  React.useEffect(() => {
    params.then(p => setHandoutSlug(p.handout));
  }, [params]);

  const { data, isLoading, error } = useBookDetail('vu', handoutSlug);
  const book = data?.data?.book;
  const pdfs = data?.data?.fullBookPdfs ?? [];
  const pdfUrl = (pdfs[0] as any)?.fileUrl || DUMMY_PDF;
  const externalLinks: { name: string; slug: string; url: string }[] = (book as any)?.externalLinks ?? [];
  const handoutName = book?.name ?? handoutSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <UserLayout
      title={`${handoutName} | VU Mid Exam Handouts – GrowLearnHub`}
      canonical={`/vu/mid-mcqs/${handoutSlug}/`}
      url={`https://growlearnhub.com/vu/mid-mcqs/${handoutSlug}/`}
    >
      <article className="max-w-none">
        <header>
          <h2 className="text-2xl font-semibold text-primary">{handoutName}</h2>
          {book?.description && (
            <p className="text-muted-foreground mt-1">{book.description}</p>
          )}
        </header>

        <section className="mt-6">
          {isLoading ? (
            <div className="h-96 rounded-lg bg-muted animate-pulse" />
          ) : error ? (
            <div>
              <p className="text-red-500 mb-4">Failed to load handout. Showing sample PDF.</p>
              <HandoutPdfViewer pdfUrl={DUMMY_PDF} name={handoutName} />
            </div>
          ) : (
            <HandoutPdfViewer pdfUrl={pdfUrl} name={handoutName} />
          )}
        </section>

        {externalLinks.length > 0 && (
          <section className="mt-10">
            <h3 className="text-lg font-semibold text-foreground mb-4">Official Website Sources</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {externalLinks.map(link => (
                <Link
                  key={link.slug}
                  href={`/vu/mid-mcqs/${handoutSlug}/${link.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 hover:bg-muted/60 hover:border-primary/40 transition-colors group"
                >
                  <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">{link.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </UserLayout>
  );
}

function HandoutPdfViewer({ pdfUrl, name }: { pdfUrl: string; name: string }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Download PDF
        </a>
      </div>
      <iframe
        src={pdfUrl}
        className="w-full"
        style={{ height: '75vh', minHeight: 480 }}
        title={name}
      />
    </div>
  );
}
