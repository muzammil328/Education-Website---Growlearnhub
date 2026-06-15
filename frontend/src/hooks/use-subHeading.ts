import { GetSubHeadingProps } from '../types';
import { trpc } from '@/trpc/trpc';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useSubheadings = (params: GetSubHeadingProps) => {
  return trpc.subHeading.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort as 'name' | 'status' | 'createdAt' | 'updatedAt' | 'order' | undefined,
      sortDirection: params.sortDirection,
      classId: params.classId,
      bookId: params.bookId,
      chapterId: params.chapterId,
      headingId: params.headingId,
      search: params.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownSubHeadings = (
  params?: {
    classId?: string;
    bookId?: string;
    chapterId?: string;
    headingId?: string;
  },
  options?: { enabled?: boolean }
) => {
  return trpc.subHeading.getDropdown.useQuery(
    {
      classId: params?.classId,
      bookId: params?.bookId,
      chapterId: params?.chapterId,
      headingId: params?.headingId,
    },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useSubHeadingById = (id?: string) => {
  return trpc.subHeading.getById.useQuery(
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

export const useCreateSubHeading = () => {
  const utils = trpc.useUtils();
  return trpc.subHeading.create.useMutation({
    onSuccess: () => {
      utils.subHeading.getAll.invalidate();
    },
  });
};

export const useUpdateSubHeading = () => {
  const utils = trpc.useUtils();
  return trpc.subHeading.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.subHeading.getAll.invalidate();
      utils.subHeading.getById.invalidate({ id });
    },
  });
};

export const useDeleteSubHeading = () => {
  const utils = trpc.useUtils();
  return trpc.subHeading.delete.useMutation({
    onSuccess: () => {
      utils.subHeading.getAll.invalidate();
    },
  });
};

export const useBulkCreateSubHeadings = () => {
  const utils = trpc.useUtils();
  return trpc.subHeading.bulkCreate.useMutation({
    onSuccess: () => {
      utils.subHeading.getAll.invalidate();
    },
  });
};
