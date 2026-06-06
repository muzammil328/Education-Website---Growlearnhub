import { z } from 'zod';
import { StatusEnum } from '../enums';

// Create Heading
export const headingCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z.number().optional(),
});
export type CreateHeadingInput = z.infer<typeof headingCreateSchema>;

// Get Headings
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
});

// Get Heading Dropdown
export const getHeadingDropdownInputSchema = z.object({
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
});
export type GetHeadingDropdownInput = z.infer<typeof getHeadingDropdownInputSchema>;

// Get Heading by ID
export const getHeadingByIdInputSchema = z.object({
  id: z.string().min(1),
});
export type GetHeadingByIdInput = z.infer<typeof getHeadingByIdInputSchema>;

// Get Heading by Slug
export const getHeadingBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  bookSlug: z.string().min(1),
  chapterSlug: z.string().min(1),
});
export type GetHeadingBySlugInput = z.infer<typeof getHeadingBySlugInputSchema>;

// Delete Heading
export const deleteHeadingInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteHeadingInput = z.infer<typeof deleteHeadingInputSchema>;

// Update Heading
export const updateHeadingInputSchema = z.object({
  id: z.string().min(1),
  updates: headingCreateSchema,
});
export type UpdateHeadingInput = z.infer<typeof updateHeadingInputSchema>;
