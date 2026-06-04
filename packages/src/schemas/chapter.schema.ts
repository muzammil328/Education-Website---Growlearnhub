import { z } from 'zod';
import { EntityStatus, entityStatusSchema, StatusEnum } from '../enums';

export const ChapterSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  description: z.string().trim().optional().default(''),
  content: z.string().trim().optional().default(''),
  status: entityStatusSchema.default(EntityStatus.ACTIVE),
  order: z.number().optional(),
});

export const getChaptersInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z
    .enum(['name', 'status', 'createdAt', 'updatedAt', 'order', 'className', 'bookName'])
    .optional()
    .default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
});

export const getChapterDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
});

export const getChapterByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateChapterInputSchema = z.object({
  id: z.string().min(1),
  updates: ChapterSchema,
});

export const deleteChapterInputSchema = z.object({
  id: z.string().min(1),
});

export const getChapterByClassAndBookNameInputSchema = z.object({
  className: z.string().min(1),
  bookName: z.string().min(1),
});

export const getChapterBySlugOnlyInputSchema = z.object({
  slug: z.string().min(1),
});

export const getChapterBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  chapterSlug: z.string().min(1),
});

export type ChapterFormValues = z.infer<typeof ChapterSchema>;
