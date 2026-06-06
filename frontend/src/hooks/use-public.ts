import { trpc } from '@/trpc/trpc';

export const useServiceBySlug = (classSlug?: string) => {
  return trpc.service.getBySlug.useQuery(
    { classSlug: classSlug || '' },
    { enabled: Boolean(classSlug), retry: false, refetchOnWindowFocus: false }
  );
};

export const useBooksBySlug = (classSlug: string, serviceSlug?: string) => {
  const { data, isLoading, error } = trpc.book.getBySlug.useQuery({
    classSlug,
    serviceSlug,
  });

  return {
    books: data?.data ?? [],
    isLoading,
    error,
  };
};

export const useClassesBySlug = (serviceSlug: string) => {
  const { data, isLoading, error } = trpc.class.getByServiceSlug.useQuery({
    serviceSlug,
  });

  return {
    classes: data?.data ?? [],
    isLoading,
    error,
  };
};

export const useChapterBySlug = (classSlug?: string, bookSlug?: string) => {
  return trpc.chapter.getBySlug.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '' },
    {
      enabled: Boolean(classSlug && bookSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useHeadingBySlug = (classSlug?: string, bookSlug?: string, chapterSlug?: string) => {
  return trpc.heading.getBySlug.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '', chapterSlug: chapterSlug || '' },
    {
      enabled: Boolean(classSlug && bookSlug && chapterSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};