import { z } from 'zod';
import { EntityStatus, entityStatusSchema, StatusEnum } from '../enums';

const componentSchema = z.object({
  title: z.string().trim().min(1),
  weight: z.number(),
  description: z.string().trim().optional(),
});

export const BookSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  code: z.string().trim().min(1),
  classId: z.union([z.string().trim().min(1), z.array(z.string().trim().min(1))]).default(''),
  description: z.string().trim().optional().default(''),
  status: entityStatusSchema.default(EntityStatus.ACTIVE),
  creditHours: z.number().optional(),
  fileId: z.string().trim().optional(),
  pages: z.number().optional(),
  image: z.string().trim().optional(),
  order: z.number().optional(),
  totalWeight: z.number().optional(),
  components: z.array(componentSchema).default([]),
});

export const getBooksInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt', 'className']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  className: z.string().optional(),
});

export const getBookDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
  classId: z.string().optional(),
});

export const getBookByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateBookInputSchema = z.object({
  id: z.string().min(1),
  updates: BookSchema,
});

export const deleteBookInputSchema = z.object({
  id: z.string().min(1),
});

export const getBookByNameInputSchema = z.object({
  name: z.string().min(1),
});

export const getBookByClassNameInputSchema = z.object({
  className: z.string().min(1),
});

export const getBookBySlugInputSchema = z.object({
  slug: z.string().min(1),
});

export const getBookByClassSlugInputSchema = z.object({
  classSlug: z.string().min(1),
});

export type BookFormValues = z.infer<typeof BookSchema>;
export type GetBooksInputSchema = z.infer<typeof getBooksInputSchema>;
