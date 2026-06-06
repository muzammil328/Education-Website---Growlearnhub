import { z } from 'zod';
import { DifficultyEnum, StatusEnum } from '../enums';

const statusSchema = z.nativeEnum(StatusEnum).default(StatusEnum.Active);

export const mcqOptionSchema = z.string().trim().min(1);

export const mcqQuestionSchema = z.object({
  question: z.string().trim().min(1),
  options: z.array(mcqOptionSchema).min(2),
  correctOption: z.number().int().nonnegative(),
  explanation: z.string().trim().optional().default(''),
  difficulty: z.nativeEnum(DifficultyEnum).default(DifficultyEnum.Medium),
  status: statusSchema,
  classId: z.string().trim().optional(),
  bookId: z.string().trim().optional(),
  chapterId: z.string().trim().optional(),
  headingId: z.string().trim().optional(),
  subHeadingId: z.string().trim().optional(),
  isPremium: z.boolean().default(false),
});

export const mcqsSchema = z.object({
  questions: z.array(mcqQuestionSchema).min(1),
});

export const McqPayloadSchema = mcqQuestionSchema;

export const getMcqsInputSchema = z.object({
  status: z.union([z.nativeEnum(StatusEnum), z.literal('all')]).optional().default('active'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z
    .enum(['question', 'status', 'createdAt', 'updatedAt', 'difficulty'])
    .optional()
    .default('question'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  headingId: z.string().optional(),
  subHeadingId: z.string().optional(),
  difficulty: z.nativeEnum(DifficultyEnum).optional(),
});

export const getMcqDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
});

export const getMcqByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateMcqInputSchema = z.object({
  id: z.string().min(1),
  updates: McqPayloadSchema.partial(),
});

export const deleteMcqInputSchema = z.object({
  id: z.string().min(1),
});

export const mcqScopeSchema = z.enum(['global', 'institution']);

export const createMcqsSchema = z.object({
  questions: z.array(mcqQuestionSchema).min(1),
  classId: z.string().min(1),
  bookId: z.string().min(1),
  chapterId: z.string().min(1),
  headingId: z.string().optional(),
  subHeadingId: z.string().optional(),
  scope: mcqScopeSchema.optional(),
});

export type McqsFormValues = z.infer<typeof mcqsSchema>;
export type UpdateMcqInput = z.infer<typeof updateMcqInputSchema>;