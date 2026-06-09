import { trpc } from '@/trpc/trpc';

export const useCreateComment = () => {
  const utils = trpc.useUtils();
  return trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.getAll.invalidate();
    },
  });
};

export const useComments = (params?: { page?: number; limit?: number }) => {
  return trpc.comment.getAll.useQuery(
    { page: params?.page || 1, limit: params?.limit || 10 },
    { retry: false, refetchOnWindowFocus: false }
  );
};

export const useDeleteComment = () => {
  const utils = trpc.useUtils();
  return trpc.comment.delete.useMutation({
    onSuccess: () => {
      utils.comment.getAll.invalidate();
    },
  });
};
