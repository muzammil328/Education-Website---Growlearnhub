import { trpc } from '@/trpc/trpc';

export const useSitemapClasses = () => {
  return trpc.sitemap.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSitemapBooks = () => {
  return trpc.sitemap.getBooks.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSitemapChapters = () => {
  return trpc.sitemap.getChapters.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSitemapHeadings = () => {
  return trpc.sitemap.getHeadings.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSitemapSubHeadings = () => {
  return trpc.sitemap.getSubHeadings.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSitemapMcqs = () => {
  return trpc.sitemap.getMcqs.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};
