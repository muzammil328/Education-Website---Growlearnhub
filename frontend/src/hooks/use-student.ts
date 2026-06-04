import { trpc } from '@/trpc/trpc';

export const useAddStudent = () => {
  const utils = trpc.useUtils();
  return trpc.student.addStudent.useMutation({
    onSuccess: () => {
      utils.student.getStudents.invalidate();
    },
  });
};

export const useAddStudents = () => {
  const utils = trpc.useUtils();
  return trpc.student.addStudents.useMutation({
    onSuccess: () => {
      utils.student.getStudents.invalidate();
    },
  });
};

export const useStudents = (params?: { page?: number; limit?: number; search?: string }) => {
  return trpc.student.getStudents.useQuery(
    {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useDeleteStudent = () => {
  const utils = trpc.useUtils();
  return trpc.student.deleteStudent.useMutation({
    onSuccess: () => {
      utils.student.getStudents.invalidate();
    },
  });
};

export const useCreateClassGroup = () => {
  const utils = trpc.useUtils();
  return trpc.student.createClassGroup.useMutation({
    onSuccess: () => {
      utils.student.getClassGroups.invalidate();
    },
  });
};

export const useAddStudentsToClassGroup = () => {
  const utils = trpc.useUtils();
  return trpc.student.addStudentsToClassGroup.useMutation({
    onSuccess: () => {
      utils.student.getClassGroups.invalidate();
      utils.student.getClassGroupDetails.invalidate();
    },
  });
};

export const useClassGroups = () => {
  return trpc.student.getClassGroups.useQuery(
    {},
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useClassGroupDetails = (groupId: string) => {
  return trpc.student.getClassGroupDetails.useQuery(
    { groupId },
    {
      enabled: !!groupId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
