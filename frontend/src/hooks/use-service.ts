import { GetServiceProps } from '../types';
import { trpc } from '@/trpc/trpc';

// dashboard
export const useServices = (params: GetServiceProps = {}) => {
  return trpc.service.getAll.useQuery(
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

export const useDropdownServices = (
  params?: { classId?: string },
  options?: { enabled?: boolean }
) => {
  return trpc.service.getDropdown.useQuery(
    {
      classId: params?.classId,
    },
    {
      enabled: options?.enabled ?? true,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  );
};

export const useServiceBySlug = (slug?: string) => {
  return trpc.service.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: Boolean(slug), retry: false, refetchOnWindowFocus: false }
  );
};

export const useServiceByName = (name?: string) => {
  return trpc.service.getByName.useQuery(
    { name: name || '' },
    { enabled: Boolean(name), retry: false, refetchOnWindowFocus: false }
  );
};

export const useServiceById = (id?: string) => {
  return trpc.service.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateService = () => {
  const utils = trpc.useUtils();
  return trpc.service.create.useMutation({
    onSuccess: () => {
      utils.service.getAll.invalidate();
    },
  });
};

export const useUpdateService = () => {
  const utils = trpc.useUtils();
  return trpc.service.update.useMutation({
    onSuccess: (_, { id }) => {
      utils.service.getAll.invalidate();
      utils.service.getById.invalidate({ id });
    },
  });
};

export const useDeleteService = () => {
  const utils = trpc.useUtils();
  return trpc.service.delete.useMutation({
    onSuccess: () => {
      utils.service.getAll.invalidate();
    },
  });
};

// user
export const useServicesByIds = (
  serviceId?: string,
  classId?: string,
  bookId?: string,
  status?: string
) => {
  return trpc.service.getAll.useQuery(
    {
      status: status as 'active' | 'inactive' | undefined,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useServicesByNames = (
  serviceName?: string,
  className?: string,
  bookName?: string,
  status?: string
) => {
  return trpc.service.getAll.useQuery(
    {
      status: status as 'active' | 'inactive' | undefined,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
