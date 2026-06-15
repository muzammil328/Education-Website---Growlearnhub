import { GetHeadingProps } from '../types';
import { trpc } from '@/trpc/trpc';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useHeadings = (params: GetHeadingProps) => {
  return trpc.heading.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort as
        | 'name'
        | 'status'
        | 'createdAt'
        | 'updatedAt'
        | 'order'
        | 'className'
        | 'bookName'
        | 'chapterName'
        | undefined,
      sortDirection: params.sortDirection,
      classId: params.classId,
      bookId: params.bookId,
      chapterId: params.chapterId,
      search: params.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownHeadings = (
  params?: {
    classId?: string;
    bookId?: string;
    chapterId?: string;
  },
  options?: { enabled?: boolean }
) => {
  return trpc.heading.getDropdown.useQuery(
    {
      classId: params?.classId,
      bookId: params?.bookId,
      chapterId: params?.chapterId,
    },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useHeadingById = (id?: string) => {
  return trpc.heading.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      refetchOnMount: 'always',
    }
  );
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateHeading = () => {
  const utils = trpc.useUtils();
  return trpc.heading.create.useMutation({
    onSuccess: () => {
      utils.heading.getAll.invalidate();
    },
  });
};

export const useUpdateHeading = () => {
  const utils = trpc.useUtils();
  return trpc.heading.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.heading.getAll.invalidate();
      utils.heading.getById.invalidate({ id });
    },
  });
};

export const useDeleteHeading = () => {
  const utils = trpc.useUtils();
  return trpc.heading.delete.useMutation({
    onSuccess: () => {
      utils.heading.getAll.invalidate();
    },
  });
};

export const useBulkCreateHeadings = () => {
  const utils = trpc.useUtils();
  return trpc.heading.bulkCreate.useMutation({
    onSuccess: () => {
      utils.heading.getAll.invalidate();
    },
  });
};
