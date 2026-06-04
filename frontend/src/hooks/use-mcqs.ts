import { trpc } from '@/trpc/trpc';

type McqsParams = {
  status?: 'active' | 'inactive' | 'all';
  page?: number;
  limit?: number;
  sort?: 'question' | 'status' | 'createdAt' | 'updatedAt' | 'difficulty';
  sortDirection?: 'asc' | 'desc';
  search?: string;
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
  subHeadingId?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

export const useMcqs = (params: McqsParams = {}) => {
  return trpc.mcqs.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort,
      sortDirection: params.sortDirection,
      search: params.search,
      classId: params.classId,
      bookId: params.bookId,
      chapterId: params.chapterId,
      headingId: params.headingId,
      subHeadingId: params.subHeadingId,
      difficulty: params.difficulty,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMcqsById = (id?: string) => {
  return trpc.mcqs.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownMcqs = (params?: { search?: string }) => {
  return trpc.mcqs.getDropdown.useQuery(
    {
      search: params?.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateMcqs = () => {
  const utils = trpc.useUtils();
  return trpc.mcqs.create.useMutation({
    onSuccess: () => {
      utils.mcqs.getAll.invalidate();
    },
  });
};

export const useUpdateMcqs = () => {
  const utils = trpc.useUtils();
  return trpc.mcqs.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.mcqs.getAll.invalidate();
      utils.mcqs.getById.invalidate({ id });
    },
  });
};

export const useDeleteMcqs = () => {
  const utils = trpc.useUtils();
  return trpc.mcqs.delete.useMutation({
    onSuccess: () => {
      utils.mcqs.getAll.invalidate();
    },
  });
};

export const useMcqsByIds = (
  classId?: string,
  bookId?: string,
  chapterId?: string,
  headingId?: string,
  subHeadingId?: string,
  status?: string
) => {
  return trpc.mcqs.getAll.useQuery(
    {
      status: status as 'active' | 'inactive' | 'all' | undefined,
      classId,
      bookId,
      chapterId,
      headingId,
      subHeadingId,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMcqsByNames = (
  className?: string,
  bookName?: string,
  chapterName?: string,
  headingName?: string,
  subHeadingName?: string,
  question?: string,
  status?: string
) => {
  return trpc.mcqs.getAll.useQuery(
    {
      status: status as 'active' | 'inactive' | 'all' | undefined,
      search: question,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
