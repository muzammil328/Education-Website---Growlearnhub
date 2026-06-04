import { GetClassProps } from '@/types/class.types';
import { trpc } from '@/trpc/trpc';

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useClasses = (params: GetClassProps) => {
  return trpc.class.getAll.useQuery(
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

export const useDropdownClasses = (enabled = true) => {
  return trpc.class.getDropdown.useQuery(
    {},
    {
      enabled,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useClassById = (id?: string) => {
  return trpc.class.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateClass = () => {
  const utils = trpc.useUtils();
  return trpc.class.create.useMutation({
    onSuccess: () => {
      utils.class.getAll.invalidate();
    },
  });
};

export const useUpdateClass = () => {
  const utils = trpc.useUtils();
  return trpc.class.update.useMutation({
    onSuccess: (_data: unknown, variables: { id?: unknown }) => {
      utils.class.getAll.invalidate();

      if (typeof variables.id === 'string') {
        utils.class.getById.invalidate({ id: variables.id });
      }
    },
  });
};

export const useDeleteClass = () => {
  const utils = trpc.useUtils();
  return trpc.class.delete.useMutation({
    onSuccess: () => {
      utils.class.getAll.invalidate();
    },
  });
};

// ─── Deprecated wrappers (kept for backward compatibility) ────────────────────

/** @deprecated Use `useDropdownClasses` instead */
export const useClassByNames = (search?: string) => {
  return trpc.class.getDropdown.useQuery(
    { search: search || '' },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};