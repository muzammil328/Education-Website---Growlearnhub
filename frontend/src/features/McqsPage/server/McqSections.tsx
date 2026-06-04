import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@muzammil328/ui';
import { SmallCard as CardSmall } from '@/components/cards/index';
import { Heading2 } from '@muzammil328/ui';
import type { PaginationTypes } from '@/types';
import type { McqCardItem } from './mcq-data';
import { buildPaginationHref } from './mcq-data';

interface LinkCardItem {
  title: string;
  link: string;
}

interface SectionGridProps {
  title: string;
  emptyMessage: string;
  items: LinkCardItem[];
}

interface McqSectionProps {
  title: string;
  emptyMessage: string;
  items: McqCardItem[];
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
  pagination?: PaginationTypes;
}

function resolvePageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const adjustedStart = Math.max(1, endPage - 4);

  return Array.from({ length: endPage - adjustedStart + 1 }, (_, index) => adjustedStart + index);
}

export function SectionGrid({ title, emptyMessage, items }: SectionGridProps) {
  return (
    <section className="space-y-4">
      <Heading2>{title}</Heading2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map(item => (
            <CardSmall key={`${item.link}-${item.title}`} title={item.title} link={item.link} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </section>
  );
}

function McqCard({ item, index }: { item: McqCardItem; index: number }) {
  const options: string[] = item.options ?? [];

  return (
    <article className="rounded-xl border border-border bg-background p-4 shadow-sm">
      <h3 className="text-lg font-semibold leading-7 text-foreground">
        {index + 1}. {item.question}
      </h3>
      <div className="mt-4 grid gap-2">
        {options.map((option: string, optionIndex: number) => (
          <div
            key={`${item.mcqId}-${optionIndex}`}
            className={`rounded-lg border px-3 py-2 text-sm ${
              optionIndex === item.correctOption
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-border bg-muted/30 text-muted-foreground'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      {item.explanation ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">Explanation:</strong> {item.explanation}
        </p>
      ) : null}
    </article>
  );
}

function PaginationSection({
  pathname,
  pagination,
  searchParams,
}: Pick<McqSectionProps, 'pathname' | 'pagination' | 'searchParams'>) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;
  const pageNumbers = resolvePageNumbers(currentPage, totalPages);

  return (
    <Pagination className="justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildPaginationHref(pathname, searchParams, Math.max(1, currentPage - 1))}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {pageNumbers[0] > 1 ? (
          <>
            <PaginationItem>
              <PaginationLink href={buildPaginationHref(pathname, searchParams, 1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
          </>
        ) : null}

        {pageNumbers.map(pageNumber => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={buildPaginationHref(pathname, searchParams, pageNumber)}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages ? (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink href={buildPaginationHref(pathname, searchParams, totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}

        <PaginationItem>
          <PaginationNext
            href={buildPaginationHref(
              pathname,
              searchParams,
              Math.min(totalPages, currentPage + 1)
            )}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function McqSection({
  title,
  emptyMessage,
  items,
  pathname,
  searchParams,
  pagination,
}: McqSectionProps) {
  return (
    <section className="space-y-4">
      <Heading2>{title}</Heading2>
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <McqCard key={item.mcqId} item={item} index={index} />
          ))}
          <PaginationSection
            pathname={pathname}
            searchParams={searchParams}
            pagination={pagination}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </section>
  );
}
