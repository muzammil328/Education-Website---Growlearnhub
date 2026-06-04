import { trpc } from '@/trpc/trpc';
import type { InstitutionType } from '../types';

type InstitutionParams = {
  status?: 'active' | 'inactive' | 'pending' | 'all';
  page?: number;
  limit?: number;
  sort?: 'name' | 'code' | 'status' | 'createdAt' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
  search?: string;
};

export const useInstitutions = (params: InstitutionParams = {}) => {
  return trpc.institution.getAll.useQuery(
    {
      status: params.status,
      page: params.page,
      limit: params.limit,
      sort: params.sort,
      sortDirection: params.sortDirection,
      search: params.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useInstitutionById = (id?: string) => {
  return trpc.institution.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDropdownInstitutions = (
  params?: { search?: string },
  options?: { enabled?: boolean }
) => {
  return trpc.institution.getDropdown.useQuery(
    { search: params?.search },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useCreateInstitution = () => {
  const utils = trpc.useUtils();
  return trpc.institution.create.useMutation({
    onSuccess: () => {
      utils.institution.getAll.invalidate();
    },
  });
};

export const useUpdateInstitution = () => {
  const utils = trpc.useUtils();
  return trpc.institution.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.institution.getAll.invalidate();
      utils.institution.getById.invalidate({ id });
    },
  });
};

export const useUpdateInstitutionSubscription = () => {
  const utils = trpc.useUtils();
  return trpc.institution.updateSubscription.useMutation({
    onSuccess: () => {
      utils.institution.getAll.invalidate();
    },
  });
};

export const useDeleteInstitution = () => {
  const utils = trpc.useUtils();
  return trpc.institution.delete.useMutation({
    onSuccess: () => {
      utils.institution.getAll.invalidate();
    },
  });
};
