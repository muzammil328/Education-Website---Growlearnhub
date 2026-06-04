import { GetSubHeadingProps } from '../types';
import { trpc } from '@/trpc/trpc';

// dashboard
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

export const useSubHeadingBySlug = (slug?: string) => {
  return trpc.subHeading.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: Boolean(slug), retry: false, refetchOnWindowFocus: false }
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

// user

// export const useSubheadingByIds = (
//   classId?: string,
//   bookId?: string,
//   chapterId?: string,
//   headingId?: string,
//   subHeadingId?: string,
//   status?: string
// ) => {
//   return useQuery<GetSubHeadingByIdsResponse, Error>({
//     queryKey: ['subHeading', 'byIds', classId, bookId, chapterId, headingId, subHeadingId, status],
//     queryFn: () =>
//       subHeadingService.getSubHeadingByIds(
//         classId,
//         bookId,
//         chapterId,
//         headingId,
//         subHeadingId,
//         status
//       ),
//     enabled: Boolean(classId || bookId || chapterId || headingId || subHeadingId),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

// export const useSubheadingByNames = (
//   className?: string,
//   bookName?: string,
//   chapterName?: string,
//   headingName?: string,
//   subHeadingName?: string,
//   status?: string
// ) => {
//   return useQuery<GetSubHeadingByNamesResponse, Error>({
//     queryKey: [
//       'subHeading',
//       'byNames',
//       className,
//       bookName,
//       chapterName,
//       headingName,
//       subHeadingName,
//       status,
//     ],
//     queryFn: () =>
//       subHeadingService.getSubHeadingByNames(
//         className,
//         bookName,
//         chapterName,
//         headingName,
//         subHeadingName,
//         status
//       ),
//     enabled: Boolean(className || bookName || chapterName || headingName || subHeadingName),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };
