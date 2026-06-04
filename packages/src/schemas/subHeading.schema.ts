import { z } from 'zod';
import { EntityStatus, entityStatusSchema, StatusEnum } from '../enums';

const statusSchema = entityStatusSchema.default(EntityStatus.ACTIVE);

export const SubHeadingSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
  headingId: z.string().trim().min(1),
  content: z.string().trim().optional().default(''),
  status: statusSchema,
  order: z.number().optional(),
});

export const getSubHeadingsInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt', 'order']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  headingId: z.string().optional(),
});

export const getSubHeadingDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  headingId: z.string().optional(),
});

export const getSubHeadingBySlugInputSchema = z.object({
  slug: z.string().min(1),
});

export const getSubHeadingByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateSubHeadingInputSchema = z.object({
  id: z.string().min(1),
  updates: SubHeadingSchema,
});

export const deleteSubHeadingInputSchema = z.object({
  id: z.string().min(1),
});

export type SubHeadingFormValues = z.infer<typeof SubHeadingSchema>;