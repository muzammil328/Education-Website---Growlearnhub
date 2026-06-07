import { trpc } from '@/trpc/trpc';
import { GetChapterProps } from '../types';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useChapters = (params: GetChapterProps) => {
  return trpc.chapter.getAll.useQuery(
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
        | 'bookName',
      sortDirection: params.sortDirection,
      classId: params.classId,
      bookId: params.bookId,
      search: params.search,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownChapters = (
  params?: { bookId?: string; classId?: string },
  options?: { enabled?: boolean }
) => {
  return trpc.chapter.getDropdown.useQuery(
    { bookId: params?.bookId, classId: params?.classId },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useChapterById = (chapterId?: string) => {
  return trpc.chapter.getById.useQuery(
    { id: chapterId || '' },
    {
      enabled: Boolean(chapterId),
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      refetchOnMount: 'always',
    }
  );
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateChapter = () => {
  const utils = trpc.useUtils();
  return trpc.chapter.create.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.chapter.getAll.invalidate(),
        utils.chapter.getDropdown.invalidate(),
      ]);
    },
  });
};

export const useUpdateChapter = () => {
  const utils = trpc.useUtils();
  return trpc.chapter.update.useMutation({
    onSuccess: async (_data, variables) => {
      await Promise.all([
        utils.chapter.getAll.invalidate(),
        utils.chapter.getDropdown.invalidate(),
        utils.chapter.getById.invalidate({ id: variables.id }),
      ]);
    },
  });
};

export const useDeleteChapter = () => {
  const utils = trpc.useUtils();
  return trpc.chapter.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.chapter.getAll.invalidate(),
        utils.chapter.getDropdown.invalidate(),
      ]);
    },
  });
};
