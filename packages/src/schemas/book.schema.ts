import { z } from 'zod';
import { StatusEnum } from '../enums';
import { objectIdSchema } from '@muzammil328/types';

// Create Book
const componentSchema = z.object({
  title: z.string().trim().min(1),
  weight: z.number(),
  description: z.string().trim().optional(),
});

export const bookCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  code: z.string().trim().min(1),
  classId: z.string().trim().optional(),
  serviceId: z.array(objectIdSchema).optional(),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  creditHours: z.number().optional(),
  fileId: z.string().trim().optional(),
  pages: z.number().optional(),
  image: z.string().trim().optional(),
  order: z.number().optional(),
  totalWeight: z.number().optional(),
  components: z.array(componentSchema).default([]),
});
export type BookCreateInput = z.infer<typeof bookCreateSchema>;

// Get Books
export const getBooksInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'className']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});
export type GetBooksInput = z.infer<typeof getBooksInputSchema>;

// Delete Book
export const deleteBookInputSchema = z.object({
  id: objectIdSchema
});
export type DeleteBookInput = z.infer<typeof deleteBookInputSchema>;

// Get Book by ID
export const getBookByIdInputSchema = z.object({
  id: objectIdSchema,
});
export type GetBookByIdInput = z.infer<typeof getBookByIdInputSchema>;

// Update Book
export const updateBookInputSchema = z.object({
  id: objectIdSchema,
  updates: bookCreateSchema,
});
export type UpdateBookInput = z.infer<typeof updateBookInputSchema>;

// Get Book Dropdown
export const getBookDropdownInputSchema = z
.object({
    classId: objectIdSchema.optional(),
    noClass: z.boolean().optional(),
  })
  .default({});
export type GetBookDropdownInput = z.infer<typeof getBookDropdownInputSchema>;
  
// Get Book by Slug
export const getBookBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  serviceSlug: z.string().trim().optional(),
});
export type GetBooksInputSchema = z.infer<typeof getBooksInputSchema>;
