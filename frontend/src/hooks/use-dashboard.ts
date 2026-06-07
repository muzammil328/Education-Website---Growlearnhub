'use client';
import { trpc } from '@/trpc/trpc';

export const useDashboardStats = () => {
  return trpc.user.getStats.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
