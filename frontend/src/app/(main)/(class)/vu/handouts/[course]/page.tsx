'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Download, ExternalLink, FileText, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import UserLayout from '@/components/layout/UserLayout';
import { useBookDetail } from '@/hooks/use-public';
import { Heading1, Para } from '@muzammil328/ui';

const DUMMY_PDF = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';

export default function Page({ params }: { params: Promise<{ course: string }> }) {
  const [courseSlug, setCourseSlug] = React.useState('');

  React.useEffect(() => {
    params.then(p => setCourseSlug(p.course));
  }, [params]);

  const { data, isLoading, error } = useBookDetail('vu', courseSlug);
  const book = data?.data?.book;
  const fullBookPdfsRaw: Pdf[] = (data?.data?.fullBookPdfs ?? []) as Pdf[];
  // Fall back to dummy PDF so users always see a viewer while real PDFs are being added
  const fullBookPdfs: Pdf[] = fullBookPdfsRaw.length > 0
    ? fullBookPdfsRaw
    : (data && !isLoading ? [{ fileUrl: DUMMY_PDF, medium: 'Sample Handout (placeholder)' }] : []);
  const chapters: Chapter[] = (data?.data?.chapters ?? []) as Chapter[];
  const externalLinks: ExternalLinkItem[] = (book as any)?.externalLinks ?? [];
  const courseName = book?.name ?? courseSlug.toUpperCase().replace(/-/g, ' ');

  return (
    <UserLayout
      title={`${courseName} | VU Handouts – GrowLearnHub`}
      canonical={`/vu/handouts/${courseSlug}/`}
      url={`https://growlearnhub.com/vu/handouts/${courseSlug}/`}
    >
      <article className="max-w-none space-y-8">

        {/* Header */}
        <header className="flex flex-col gap-2 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/vu/handouts" className="hover:text-primary transition-colors">VU Handouts</Link>
            <span>/</span>
            <span className="text-foreground">{courseName}</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <Heading1 className="text-2xl font-bold text-foreground">{courseName}</Heading1>
              {book?.description && (
                <Para className="text-muted-foreground mt-1 text-sm leading-relaxed">{book.description}</Para>
              )}
              {book?.pages && (
                <Para className="text-xs text-muted-foreground mt-1">{book.pages} pages</Para>
              )}
            </div>
          </div>
        </header>

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 p-6 text-center">
            <Para className="text-red-600 font-medium">Failed to load handout data.</Para>
            <Para className="text-sm text-red-500 mt-1">Please try again later.</Para>
          </div>
        ) : (
          <>
            {/* Full Book PDFs */}
            {fullBookPdfs.length > 0 && (
              <section>
                <SectionTitle icon={<FileText className="w-4 h-4" />} title="Full Book PDF" />
                <div className="mt-4 space-y-3">
                  {fullBookPdfs.map((pdf, i) => (
                    <PdfCard key={i} pdf={pdf} label={pdf.medium || `Full Book PDF ${i + 1}`} courseName={courseName} defaultOpen={i === 0} />
                  ))}
                </div>
              </section>
            )}

            {/* Chapters */}
            {chapters.length > 0 && (
              <section>
                <SectionTitle icon={<BookOpen className="w-4 h-4" />} title={`Chapters (${chapters.length})`} />
                <div className="mt-4 space-y-2">
                  {chapters
                    .slice()
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((ch, i) => (
                      <ChapterRow key={ch.slug} chapter={ch} index={i + 1} />
                    ))}
                </div>
              </section>
            )}

            {/* External Links */}
            {externalLinks.length > 0 && (
              <section>
                <SectionTitle icon={<ExternalLink className="w-4 h-4" />} title="Official Sources" />
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {externalLinks.map(link => (
                    <a
                      key={link.slug}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 hover:bg-muted/60 hover:border-primary/40 transition-colors group"
                    >
                      <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground group-hover:text-primary">{link.name}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}

          </>
        )}
      </article>
    </UserLayout>
  );
}

/* ── Types ── */
interface Pdf {
  fileUrl: string;
  medium?: string;
  pages?: number;
  fileSize?: number;
}
interface Chapter {
  name: string;
  slug: string;
  order?: number;
  pdfs: Pdf[];
}
interface ExternalLinkItem {
  name: string;
  slug: string;
  url: string;
}

/* ── Sub-components ── */

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-base font-semibold text-foreground border-b border-border pb-2">
      <span className="text-primary">{icon}</span>
      {title}
    </div>
  );
}

function PdfCard({ pdf, label, courseName, defaultOpen }: { pdf: Pdf; label: string; courseName: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/40">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">{label}</span>
          {pdf.pages && <span className="text-xs text-muted-foreground shrink-0">· {pdf.pages} pages</span>}
          {pdf.fileSize && <span className="text-xs text-muted-foreground shrink-0">· {(pdf.fileSize / 1024 / 1024).toFixed(1)} MB</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {open ? 'Hide' : 'View'}
          </button>
          <a
            href={pdf.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>
      {open && (
        <iframe
          src={pdf.fileUrl}
          className="w-full border-t border-border"
          style={{ height: '75vh', minHeight: 480 }}
          title={`${courseName} – ${label}`}
        />
      )}
    </div>
  );
}

function ChapterRow({ chapter, index }: { chapter: Chapter; index: number }) {
  const [open, setOpen] = useState(false);
  const hasPdfs = chapter.pdfs.length > 0;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => hasPdfs && setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
        disabled={!hasPdfs}
      >
        <span className="shrink-0 w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
          {index}
        </span>
        <span className="flex-1 text-sm font-medium text-foreground">{chapter.name}</span>
        <div className="flex items-center gap-2 shrink-0">
          {hasPdfs ? (
            <>
              <span className="text-xs text-muted-foreground">{chapter.pdfs.length} PDF{chapter.pdfs.length > 1 ? 's' : ''}</span>
              {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </>
          ) : (
            <span className="text-xs text-muted-foreground/50">No PDF</span>
          )}
        </div>
      </button>

      {open && hasPdfs && (
        <div className="border-t border-border bg-muted/20 px-4 py-3 space-y-2">
          {chapter.pdfs.map((pdf, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground truncate">{pdf.medium || `PDF ${i + 1}`}</span>
                {pdf.pages && <span className="text-xs text-muted-foreground">· {pdf.pages} pg</span>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdf.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Eye className="w-3 h-3" /> View
                </a>
                <a
                  href={pdf.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="h-12 bg-muted/60" />
          <div className="h-96 bg-muted/30" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 w-40 bg-muted rounded" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-12 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
