import { z } from 'zod';

export const feedbackTypeSchema = z.enum(['contact', 'bug-report', 'feature-request', 'share-story']);
export const feedbackStatusSchema = z.enum(['pending', 'resolved', 'rejected']);

export const createFeedbackSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  type: feedbackTypeSchema,
});

export const feedbackResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  type: feedbackTypeSchema,
  status: feedbackStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export const getFeedbackInputSchema = z.object({
  type: feedbackTypeSchema.optional(),
  status: feedbackStatusSchema.optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['createdAt', 'status']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const updateFeedbackStatusSchema = z.object({
  id: z.string().min(1),
  status: feedbackStatusSchema,
});

export const getFeedbackByIdInputSchema = z.object({
  id: z.string(),
});

export type FeedbackFormValues = z.infer<typeof createFeedbackSchema>;
export type FeedbackResponse = z.infer<typeof feedbackResponseSchema>;