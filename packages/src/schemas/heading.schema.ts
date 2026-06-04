import { z } from 'zod';
import { EntityStatus, entityStatusSchema, StatusEnum } from '../enums';

export const HeadingSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
  status: entityStatusSchema.default(EntityStatus.ACTIVE),
  order: z.number().optional(),
});

export const getHeadingsInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z
    .enum(['name', 'status', 'createdAt', 'updatedAt', 'order', 'className', 'bookName', 'chapterName'])
    .optional()
    .default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
});

export const getHeadingDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
});

export const getHeadingBySlugInputSchema = z.object({
  slug: z.string().min(1),
});

export const getHeadingByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateHeadingInputSchema = z.object({
  id: z.string().min(1),
  updates: HeadingSchema,
});

export const deleteHeadingInputSchema = z.object({
  id: z.string().min(1),
});

export type HeadingFormValues = z.infer<typeof HeadingSchema>;