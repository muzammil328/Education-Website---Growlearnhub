import { trpc } from '@/trpc/trpc';

// dashboard
export const useBoards = (
  params: {
    status?: 'active' | 'inactive';
    page?: number;
    limit?: number;
    sort?: 'name' | 'status' | 'createdAt' | 'updatedAt';
    sortDirection?: 'asc' | 'desc';
    search?: string;
  } = {}
) => {
  return trpc.board.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort as 'name' | 'status' | 'createdAt' | 'updatedAt' | undefined,
      sortDirection: params.sortDirection,
      search: params.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useBoardBySlug = (slug?: string) => {
  return trpc.board.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: Boolean(slug), retry: false, refetchOnWindowFocus: false }
  );
};

export const useBoardById = (id?: string) => {
  return trpc.board.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownBoards = (enabled = true) => {
  return trpc.board.getDropdown.useQuery(
    {},
    {
      enabled,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useCreateBoard = () => {
  const utils = trpc.useUtils();
  return trpc.board.create.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
    },
  });
};

export const useUpdateBoard = () => {
  const utils = trpc.useUtils();
  return trpc.board.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.board.getAll.invalidate();
      utils.board.getById.invalidate({ id });
    },
  });
};

export const useDeleteBoard = () => {
  const utils = trpc.useUtils();
  return trpc.board.delete.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
    },
  });
};

// user
export const useBoardsByIds = (serviceId?: string, status?: string, page?: number) => {
  return trpc.board.getAll.useQuery(
    {
      status: status as 'active' | 'inactive' | undefined,
      page,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useBoardsByNames = (boardName?: string, serviceName?: string) => {
  return trpc.board.getAll.useQuery(
    {},
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
