import { z } from 'zod';
import { StatusEnum } from '../enums';

// Create Chapter
export const chapterCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  description: z.string().trim().optional().default(''),
  content: z.string().trim().optional().default(''),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z.number().optional(),
});
export type ChapterCreateInput = z.infer<typeof chapterCreateSchema>;

// Get Chapters
export const getChaptersInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z
    .enum(['name', 'status', 'createdAt', 'order', 'className', 'bookName'])
    .optional()
    .default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});
export type GetChaptersInput = z.infer<typeof getChaptersInputSchema>;

// Get Chapter Dropdown
export const getChapterDropdownInputSchema = z.object({
  classId: z.string().optional(),
  bookId: z.string().optional(),
});
export type GetChapterDropdownInput = z.infer<typeof getChapterDropdownInputSchema>;

// Get Chapter by ID
export const getChapterByIdInputSchema = z.object({
  id: z.string().min(1),
});
export type GetChapterByIdInput = z.infer<typeof getChapterByIdInputSchema>;

// Get Chapter by Slug
export const getChapterBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  bookSlug: z.string().min(1).optional(),
});
export type GetChapterBySlugInput = z.infer<typeof getChapterBySlugInputSchema>;

// Delete Chapter
export const deleteChapterInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteChapterInput = z.infer<typeof deleteChapterInputSchema>;

// Update Chapter
export const updateChapterInputSchema = z.object({
  id: z.string().min(1),
  updates: chapterCreateSchema,
});
export type UpdateChapterInput = z.infer<typeof updateChapterInputSchema>;
