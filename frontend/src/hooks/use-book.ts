import { trpc } from '@/trpc/trpc';
import { GetBookProps } from '../types';

// dashboard
export const useBooks = (params: GetBookProps) => {
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

export const useBookBySlug = (slug?: string) => {
  return trpc.book.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: Boolean(slug), retry: false, refetchOnWindowFocus: false }
  );
};

export const useBookByName = (name?: string) => {
  return trpc.book.getByName.useQuery(
    { name: name || '' },
    { enabled: Boolean(name), retry: false, refetchOnWindowFocus: false }
  );
};

export const useBookByClassName = (className?: string) => {
  return trpc.book.getByClassName.useQuery(
    { className: className || '' },
    { enabled: Boolean(className), retry: false, refetchOnWindowFocus: false }
  );
};

export const useBookByClassSlug = (classSlug?: string) => {
  return trpc.book.getByClassSlug.useQuery(
    { classSlug: classSlug || '' },
    { enabled: Boolean(classSlug), retry: false, refetchOnWindowFocus: false }
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

export const useBookByBookId = (bookId?: string) => {
  return useBookById(bookId);
};

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

// user
// export const useBooksByIds = (classId?: string, bookId?: string, status?: string) => {
//   return useQuery<GetClassByIdsResponse, Error>({
//     queryKey: ['classes', 'classId', classId, 'bookId', bookId, 'status', status],
//     queryFn: () => bookService.getBookByIds(classId, bookId, status),
//     enabled: Boolean(classId),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

// export const useBookByNames = (className?: string, bookName?: string, status?: string) => {
//   return useQuery<GetClassByNamesResponse, Error>({
//     queryKey: ['classes', 'className', className, 'bookName', bookName, 'status', status],
//     queryFn: () => bookService.getBookByNames(className, bookName, status),
//     enabled: Boolean(className || bookName || status),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };
