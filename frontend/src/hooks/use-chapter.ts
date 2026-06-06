import { trpc } from '@/trpc/trpc';
import { GetChapterProps } from '../types';

// public
export const useChaptersBySlug = (classSlug?: string, bookSlug?: string) => {
  return trpc.chapter.getBySlug.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '' },
    {
      enabled: Boolean(classSlug && bookSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// dashboard
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
  params?: { bookId?: string },
  options?: { enabled?: boolean }
) => {
  return trpc.chapter.getDropdown.useQuery(
    { bookId: params?.bookId },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useChapterByClassAndBookName = (className?: string, bookName?: string) => {
  return trpc.chapter.getByClassAndBookName.useQuery(
    { className: className || '', bookName: bookName || '' },
    { enabled: Boolean(className && bookName), retry: false, refetchOnWindowFocus: false }
  );
};

export const useChapterByClassSlugAndChapterSlug = (classSlug?: string, chapterSlug?: string) => {
  return trpc.chapter.getByClassSlugAndChapterSlug.useQuery(
    { classSlug: classSlug || '', chapterSlug: chapterSlug || '' },
    { enabled: Boolean(classSlug && chapterSlug), retry: false, refetchOnWindowFocus: false }
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

// user

// export const useChaptersByIds = (
//   classId?: string,
//   bookId?: string,
//   chapterId?: string,
//   status?: string
// ) => {
//   return useQuery<GetChapterByIdsResponse, Error>({
//     queryKey: [
//       'classes',
//       'classId',
//       classId,
//       'bookId',
//       bookId,
//       'chapterId',
//       chapterId,
//       'status',
//       status,
//     ],
//     queryFn: () => chapterService.getChapterByIds(classId, bookId, chapterId, status),
//     enabled: Boolean(classId || bookId || chapterId || status),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

// export const useChaptersByNames = (
//   className?: string,
//   bookName?: string,
//   chapterName?: string,
//   status?: string
// ) => {
//   return useQuery<GetChapterByNamesResponse, Error>({
//     queryKey: [
//       'classes',
//       'className',
//       className,
//       'bookName',
//       bookName,
//       'chapterName',
//       chapterName,
//       'status',
//       status,
//     ],
//     queryFn: () => chapterService.getChapterByNames(className, bookName, chapterName, status),
//     enabled: Boolean(className || bookName || chapterName || status),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };
