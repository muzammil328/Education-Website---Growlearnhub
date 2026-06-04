import { z } from 'zod';

export const ClassGroupSchema = z.object({
  name: z.string().min(1),
  classIds: z.array(z.string()).optional(),
});

export const AddStudentsToClassGroupSchema = z.object({
  groupId: z.string(),
  studentIds: z.array(z.string()),
});

export const GetClassGroupDetailsSchema = z.object({
  groupId: z.string(),
});

export type ClassGroupFormValues = z.infer<typeof ClassGroupSchema>;
