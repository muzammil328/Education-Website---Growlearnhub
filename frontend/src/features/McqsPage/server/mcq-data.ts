import 'server-only';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import type { PaginationTypes } from '@/types';
import type { DashboardBookTableProps } from '@/types/book.types';
import type { DashboardClassTableProps } from '@/types/class.types';
import type { DashboardHeadingTableProps } from '@/types/heading.types';
import type { DashboardSubHeadingTableProps } from '@/types/subHeading.types';
import type { McqItem } from '@/types/mcqs.types';
import { config } from '@/config';

export const DEFAULT_PAGE_SIZE = 10;
export const REVALIDATE_5_DAYS = 432000;

interface ListResponse<T> {
  items: T[];
  pagination?: PaginationTypes;
}

export interface TaxonomyItem {
  name: string;
  slug?: string;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

async function getTRPCClient() {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${config.API_URL ?? 'http://localhost:3001'}/trpc`,
      }),
    ],
  });
}

export async function getClasses(): Promise<{ data: DashboardClassTableProps[] }> {
  try {
    const trpcClient = await getTRPCClient();
    const result = await trpcClient.class.getAll.query({ status: 'active' });
    return {
      data: (result?.data || []).map((item: any) => ({
        classId: item.classId,
        name: item.name,
        slug: item.slug,
        status: item.status,
      })),
    };
  } catch {
    return { data: [] };
  }
}

export async function getBooks(): Promise<ListResponse<DashboardBookTableProps>> {
  try {
    const trpcClient = await getTRPCClient();
    const result = await trpcClient.book.getAll.query({ status: 'active' });
    return {
      items: (result?.data || []).map((item: any) => ({
        bookId: item.bookId,
        name: item.name,
        slug: item.slug,
        status: item.status,
        className: item.className,
      })),
    };
  } catch {
    return { items: [] };
  }
}

export async function getBooksByClass(className: string): Promise<ListResponse<TaxonomyItem>> {
  try {
    const trpcClient = await getTRPCClient();
    const result = await trpcClient.book.getAll.query({ status: 'active' });
    const normalizedClassName = normalizeText(className);

    const items = (result?.data || [])
      .filter(item =>
        normalizedClassName.length === 0
          ? true
          : normalizeText(String(item.className || '')) === normalizedClassName
      )
      .map((item: any) => ({
        name: item.name,
        className: item.className,
      }));

    return { items };
  } catch {
    return { items: [] };
  }
}

export async function getChaptersByBook(
  className: string,
  bookName: string
): Promise<ListResponse<TaxonomyItem>> {
  try {
    const trpcClient = await getTRPCClient();
    const result = await trpcClient.chapter.getAll.query({ status: 'active' });
    const normalizedClassName = normalizeText(className);
    const normalizedBookName = normalizeText(bookName);

    return {
      items: (result?.data || [])
        .filter((item: any) => {
          const classMatches =
            normalizedClassName.length === 0
              ? true
              : normalizeText(String(item.className || '')) === normalizedClassName;
          const bookMatches =
            normalizedBookName.length === 0
              ? true
              : normalizeText(String(item.bookName || '')) === normalizedBookName;

          return classMatches && bookMatches;
        })
        .map((item: any) => ({
          name: item.name,
          className: item.className,
          bookName: item.bookName,
        })),
    };
  } catch {
    return { items: [] };
  }
}

export async function getHeadingsByBook(params: {
  className?: string;
  bookName?: string;
  chapterName?: string;
}): Promise<ListResponse<DashboardHeadingTableProps | TaxonomyItem>> {
  const { className = '', bookName = '', chapterName } = params;
  try {
    const trpcClient = await getTRPCClient();
    const [classesResult, booksResult, chaptersResult, headingsResult] =
      await Promise.all([
        trpcClient.class.getAll.query({ status: 'active' }),
        trpcClient.book.getAll.query({ status: 'active' }),
        trpcClient.chapter.getAll.query({ status: 'active' }),
        trpcClient.heading.getAll.query({ status: 'active' }),
      ]);

    const normalizedClassName = normalizeText(className);
    const normalizedBookName = normalizeText(bookName);
    const normalizedChapterName = normalizeText(chapterName || '');

    const classIds = new Set(
      (classesResult?.data || [])
        .filter(item =>
          normalizedClassName.length === 0 ? true : normalizeText(item.name) === normalizedClassName
        )
        .map((item: any) => String(item.classId))
    );

    const bookIds = new Set(
      (booksResult?.data || [])
        .filter(item => {
          const classMatches =
            normalizedClassName.length === 0
              ? true
              : normalizeText(String(item.className || '')) === normalizedClassName;
          const bookMatches =
            normalizedBookName.length === 0 ? true : normalizeText(item.name) === normalizedBookName;

          return classMatches && bookMatches;
        })
        .map((item: any) => String(item.bookId))
    );

    const chapterIds = new Set(
      (chaptersResult?.data || [])
        .filter((item: any) => {
          const classMatches =
            normalizedClassName.length === 0
              ? true
              : normalizeText(String(item.className || '')) === normalizedClassName;
          const bookMatches =
            normalizedBookName.length === 0
              ? true
              : normalizeText(String(item.bookName || '')) === normalizedBookName;
          const chapterMatches =
            normalizedChapterName.length === 0
              ? true
              : normalizeText(String(item.name || '')) === normalizedChapterName;

          return classMatches && bookMatches && chapterMatches;
        })
        .map((item: any) => String(item.chapterId || ''))
        .filter(Boolean)
    );

    if (normalizedClassName.length > 0 && classIds.size === 0) {
      return { items: [] };
    }

    if (normalizedBookName.length > 0 && bookIds.size === 0) {
      return { items: [] };
    }

    if (normalizedChapterName.length > 0 && chapterIds.size === 0) {
      return { items: [] };
    }

    const filteredHeadings = (headingsResult?.data || []).filter((item: any) => {
      const classMatches =
        classIds.size === 0 || !item.classId
          ? normalizedClassName.length === 0
          : classIds.has(String(item.classId));
      const bookMatches =
        bookIds.size === 0 || !item.bookId
          ? normalizedBookName.length === 0
          : bookIds.has(String(item.bookId));
      const chapterMatches =
        chapterIds.size === 0 || !item.chapterId
          ? normalizedChapterName.length === 0
          : chapterIds.has(String(item.chapterId));

      return classMatches && bookMatches && chapterMatches;
    });

    return {
      items: toUniqueTaxonomyItems(filteredHeadings),
    };
  } catch {
    return { items: [] };
  }
}

export async function getSubHeadingsByHeading(params: {
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
}): Promise<ListResponse<DashboardSubHeadingTableProps | TaxonomyItem>> {
  const { className = '', bookName = '', chapterName = '', headingName = '' } = params;
  try {
    const trpcClient = await getTRPCClient();
    const [classesResult, booksResult, chaptersResult, headingsResult, subHeadingsResult] =
      await Promise.all([
        trpcClient.class.getAll.query({ status: 'active' }),
        trpcClient.book.getAll.query({ status: 'active' }),
        trpcClient.chapter.getAll.query({ status: 'active' }),
        trpcClient.heading.getAll.query({ status: 'active' }),
        trpcClient.subHeading.getAll.query({ status: 'active' }),
      ]);

    const normalizedClassName = normalizeText(className);
    const normalizedBookName = normalizeText(bookName);
    const normalizedChapterName = normalizeText(chapterName);
    const normalizedHeadingName = normalizeText(headingName);

    const classIds = new Set(
      (classesResult?.data || [])
        .filter(item =>
          normalizedClassName.length === 0 ? true : normalizeText(item.name) === normalizedClassName
        )
        .map((item: any) => String(item.classId))
    );

    const bookIds = new Set(
      (booksResult?.data || [])
        .filter(item => {
          const classMatches =
            normalizedClassName.length === 0
              ? true
              : normalizeText(String(item.className || '')) === normalizedClassName;
          const bookMatches =
            normalizedBookName.length === 0 ? true : normalizeText(item.name) === normalizedBookName;

          return classMatches && bookMatches;
        })
        .map((item: any) => String(item.bookId))
    );

    const chapterIds = new Set(
      (chaptersResult?.data || [])
        .filter((item: any) => {
          const classMatches =
            normalizedClassName.length === 0
              ? true
              : normalizeText(String(item.className || '')) === normalizedClassName;
          const bookMatches =
            normalizedBookName.length === 0
              ? true
              : normalizeText(String(item.bookName || '')) === normalizedBookName;
          const chapterMatches =
            normalizedChapterName.length === 0
              ? true
              : normalizeText(String(item.name || '')) === normalizedChapterName;

          return classMatches && bookMatches && chapterMatches;
        })
        .map((item: any) => String(item.chapterId || ''))
        .filter(Boolean)
    );

    const headingIds = new Set(
      (headingsResult?.data || [])
        .filter((item: any) => {
          const headingMatches =
            normalizedHeadingName.length === 0
              ? true
              : normalizeText(String(item.name || '')) === normalizedHeadingName;
          const classMatches =
            classIds.size === 0 || !item.classId
              ? normalizedClassName.length === 0
              : classIds.has(String(item.classId));
          return headingMatches && classMatches;
        })
        .map((item: any) => String(item.headingId))
        .filter(Boolean)
    );

    if (normalizedHeadingName.length > 0 && headingIds.size === 0) {
      return { items: [] };
    }

    const filteredSubHeadings = (subHeadingsResult?.data || []).filter((item: any) => {
      const classMatches =
        classIds.size === 0 || !item.classId
          ? normalizedClassName.length === 0
          : classIds.has(String(item.classId));
      const bookMatches =
        bookIds.size === 0 || !item.bookId
          ? normalizedBookName.length === 0
          : bookIds.has(String(item.bookId));
      const chapterMatches =
        chapterIds.size === 0 || !item.chapterId
          ? normalizedChapterName.length === 0
          : chapterIds.has(String(item.chapterId));
      const headingMatches =
        headingIds.size === 0 || !item.headingId
          ? normalizedHeadingName.length === 0
          : headingIds.has(String(item.headingId));
      return classMatches && bookMatches && chapterMatches && headingMatches;
    });

    return {
      items: toUniqueTaxonomyItems(filteredSubHeadings),
    };
  } catch {
    return { items: [] };
  }
}

export async function getMcqsByNames(params: {
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
  question?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<ListResponse<McqItem>> {
  try {
    const trpcClient = await getTRPCClient();
    const result = await trpcClient.mcqs.getByNames.query({
      className: params.className,
      bookName: params.bookName,
      chapterName: params.chapterName,
      headingName: params.headingName,
      subHeadingName: params.subHeadingName,
      question: params.question,
      status: params.status || 'active',
      page: params.page || 1,
      limit: params.limit || DEFAULT_PAGE_SIZE,
    });

    return {
      items: (result?.data || []).map((item: any) => ({
        mcqId: item.mcqId,
        question: item.question,
        options: item.options,
        correctOption: item.correctOption,
        explanation: item.explanation,
        difficulty: item.difficulty,
        status: item.status,
      })),
      pagination: result?.pagination,
    };
  } catch {
    return { items: [] };
  }
}

export function slugifyPathSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildListLink(basePath: string, slug?: string): string {
  const cleanBasePath = basePath.replace(/\/+$/, '');
  const cleanSlug = slug?.replace(/^\/+|\/+$/g, '') || '';
  return cleanSlug ? `${cleanBasePath}/${cleanSlug}` : cleanBasePath;
}

export function buildPaginationHref(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>,
  page: number
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === 'page') {
      continue;
    }

    if (Array.isArray(value)) {
      if (value[0]) {
        params.set(key, value[0]);
      }

      continue;
    }

    if (typeof value === 'string' && value.length > 0) {
      params.set(key, value);
    }
  }

  params.set('page', String(page));
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

function toUniqueTaxonomyItems(items: Array<{ name?: string }>): TaxonomyItem[] {
  const uniqueNames = new Set<string>();

  for (const item of items) {
    if (typeof item.name !== 'string' || item.name.trim().length === 0) {
      continue;
    }

    uniqueNames.add(item.name.trim());
  }

  return Array.from(uniqueNames)
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({ name }));
}

export type McqCardItem = McqItem;
