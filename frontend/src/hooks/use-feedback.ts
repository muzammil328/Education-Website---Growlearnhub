import { trpc } from '@/trpc/trpc';

export const useFeedback = (params?: {
  type?: 'contact' | 'bug-report' | 'feature-request';
  status?: 'pending' | 'resolved' | 'rejected';
  page?: number;
  limit?: number;
}) => {
  return trpc.feedback.getAll.useQuery(
    {
      type: params?.type,
      status: params?.status,
      page: params?.page || 1,
      limit: params?.limit || 10,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useFeedbackById = (id?: string) => {
  return trpc.feedback.getById.useQuery(
    { id: id || '' },
    {
      enabled: Boolean(id),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateFeedback = () => {
  const utils = trpc.useUtils();
  return trpc.feedback.create.useMutation({
    onSuccess: () => {
      utils.feedback.getAll.invalidate();
    },
  });
};

export const useUpdateFeedbackStatus = () => {
  const utils = trpc.useUtils();
  return trpc.feedback.updateStatus.useMutation({
    onSuccess: () => {
      utils.feedback.getAll.invalidate();
    },
  });
};
