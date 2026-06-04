import type { Status, SortOrder } from '@muzammil328/education-packages/types';

type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];

interface QueryParams {
  [key: string]: QueryValue;
}

interface CleanQueryResult {
  limit?: number;
  page?: number;
  status?: Status;
  sort?: string;
  sortDirection?: SortOrder;
  search?: string;
  serviceId?: string;
  classId?: string;
  className?: string;
  bookId?: string;
  bookName?: string;
  chapterId?: string;
  chapterName?: string;
  headingId?: string;
  headingName?: string;
  subHeadingId?: string;
  subHeadingName?: string;
  question?: string;
  mcqId?: string;
  [key: string]: QueryValue | number | string | undefined;
}

export function cleanQuery(query: QueryParams): CleanQueryResult {
  const cleanedQuery: CleanQueryResult = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '' || value === 'undefined') {
      continue;
    }

    if (key === 'page' || key === 'limit') {
      const numericValue = typeof value === 'string' ? Number(value) : Number(value);

      if (!Number.isNaN(numericValue)) {
        cleanedQuery[key] = numericValue;
      }

      continue;
    }

    cleanedQuery[key] = value;
  }

  return cleanedQuery;
}
