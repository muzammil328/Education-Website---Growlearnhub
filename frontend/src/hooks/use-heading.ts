import { GetHeadingProps } from '../types';
import { trpc } from '@/trpc/trpc';

// dashboard
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

export const useHeadingBySlug = (slug?: string) => {
  return trpc.heading.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: Boolean(slug), retry: false, refetchOnWindowFocus: false }
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

// user
// export const useHeadingByIds = (
//   classId?: string,
//   bookId?: string,
//   chapterId?: string,
//   headingId?: string,
//   status?: string
// ) => {
//   return useQuery<GetHeadingByIdsResponse, Error>({
//     queryKey: ['headings', 'byIds', classId, bookId, chapterId, headingId, status],
//     queryFn: () => headingService.getHeadingByIds(classId, bookId, chapterId, headingId, status),
//     enabled: Boolean(classId || bookId || chapterId || headingId || status),
//     retry: false,
//     refetchOnWindowFocus: false,
//     staleTime: 0,
//   });
// };

// export const useHeadingByNames = (
//   className?: string,
//   bookName?: string,
//   chapterName?: string,
//   headingName?: string,
//   status?: string
// ) => {
//   return useQuery<GetHeadingByNamesResponse, Error>({
//     queryKey: ['headings', 'byNames', className, bookName, chapterName, headingName, status],
//     queryFn: () =>
//       headingService.getHeadingByNames(className, bookName, chapterName, headingName, status),
//     enabled: Boolean(className || bookName || chapterName || headingName || status),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

// export const useSubAndHeadingsByClassBookChapterHeading = (
//   params: UseSubAndHeadingsByClassBookChapterHeadingParams
// ) => {
//   return useQuery<UseSubAndHeadingsByClassBookChapterHeadingResponse, Error>({
//     queryKey: ['headings-subheadings', params.className, params.bookName, params.chapterName],
//     queryFn: () => headingService.getHeadingAndSubheadings(params),
//     enabled: Boolean(params.className && params.bookName && params.chapterName),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };
