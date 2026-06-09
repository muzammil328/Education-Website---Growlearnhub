import { z } from 'zod';

export const createCommentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  pageUrl: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export const getCommentsSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['createdAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const getCommentByIdSchema = z.object({
  id: z.string().min(1),
});

export const deleteCommentSchema = z.object({
  id: z.string().min(1),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
