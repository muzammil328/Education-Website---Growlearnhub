import { trpc } from '@/trpc/trpc';
import { GetBooksInput } from '@muzammil328/education-packages';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useBooks = (params: GetBooksInput) => {
  return trpc.book.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort as 'name' | 'status' | 'createdAt' | 'updatedAt' | 'className',
      sortDirection: params.sortDirection,
      classId: params.classId,
      className: params.className,
      search: params.search,
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      queryKey: [
        'book.getAll',
        {
          status: params.status,
          page: params.page,
          limit: params.limit,
          sort: params.sort,
          sortDirection: params.sortDirection,
          classId: params.classId,
          className: params.className,
          search: params.search,
        },
      ],
    }
  );
};

export const useDropdownBooks = (
  params?: { classId?: string },
  options?: { enabled?: boolean }
) => {
  return trpc.book.getDropdown.useQuery(
    { classId: params?.classId },
    {
      enabled: Boolean(params?.classId),
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useBookById = (bookId?: string) => {
  return trpc.book.getById.useQuery(
    { id: bookId || '' },
    {
      enabled: Boolean(bookId),
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      refetchOnMount: 'always',
    }
  );
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateBook = () => {
  const utils = trpc.useUtils();
  return trpc.book.create.useMutation({
    onSuccess: async () => {
      await Promise.all([utils.book.getAll.invalidate(), utils.book.getDropdown.invalidate()]);
    },
  });
};

export const useUpdateBook = () => {
  const utils = trpc.useUtils();
  return trpc.book.update.useMutation({
    onSuccess: async (_data, variables) => {
      await Promise.all([
        utils.book.getAll.invalidate(),
        utils.book.getDropdown.invalidate(),
        utils.book.getById.invalidate({ id: variables.id }),
      ]);
    },
  });
};

export const useDeleteBook = () => {
  const utils = trpc.useUtils();
  return trpc.book.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([utils.book.getAll.invalidate(), utils.book.getDropdown.invalidate()]);
    },
  });
};
