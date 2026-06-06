import { z } from 'zod';

export const studentSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const addStudentsSchema = z.object({
  students: z.array(studentSchema).min(1).max(100),
});

export const getStudentsInputSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
});

export const deleteStudentInputSchema = z.object({
  id: z.string().min(1),
});

export const addStudentsToClassGroupSchema = z.object({
  groupId: z.string(),
  studentIds: z.array(z.string()),
});

export const getClassGroupDetailsSchema = z.object({
  groupId: z.string(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
