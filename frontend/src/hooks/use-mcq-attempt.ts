import { trpc } from '@/trpc/trpc';

export const useSubmitMcqAttempt = () => {
  const utils = trpc.useUtils();
  return trpc.mcqAttempt.submit.useMutation({
    onSuccess: () => {
      utils.mcqAttempt.myHistory.invalidate();
      utils.mcqAttempt.myStats.invalidate();
    },
  });
};

export const useMyMcqHistory = (params?: { page?: number; limit?: number }) => {
  return trpc.mcqAttempt.myHistory.useQuery(
    {
      page: params?.page,
      limit: params?.limit,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMyMcqStats = () => {
  return trpc.mcqAttempt.myStats.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useInstitutionLeaderboard = (limit = 20) => {
  return trpc.mcqAttempt.institutionLeaderboard.useQuery(
    { limit },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
