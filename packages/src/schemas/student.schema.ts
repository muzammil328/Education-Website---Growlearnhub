import { z } from 'zod';
import { emailSchema, passwordSchema } from '@muzammil328/types';

export const studentSchema = z.object({
  username: z.string().min(3),
  email: emailSchema,
  password: passwordSchema,
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
