import { z } from 'zod';
import { StatusEnum } from '../enums';

// Create Class
export const classCreateSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().default(''),
  serviceIds: z.array(z.string().trim().min(1)).default([]),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  image: z.string().trim().default(''),
  keywords: z.array(z.string().trim().min(1)).default([]),
});
export type ClassCreateInput = z.infer<typeof classCreateSchema>;

// Get Classes
export const getClassesInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});
export type GetClassesInput = z.infer<typeof getClassesInputSchema>;

// Get Class Dropdown
export const dropdownClassInputSchema = z
  .object({
    serviceId: z.string().min(1).optional(),
  })
  .default({});

export type GetClassDropdownInput = z.infer<typeof dropdownClassInputSchema>;

// Get Class by ID
export const getClassByIdInputSchema = z.object({ 
  id: z.string().min(1),
});
export type GetClassByIdInput = z.infer<typeof getClassByIdInputSchema>;

// Get Class by Service Slug
export const getClassByServiceSlugInputSchema = z.object({
  serviceSlug: z.string().min(1),
});
export type GetClassByServiceSlugInput = z.infer<typeof getClassByServiceSlugInputSchema>;

// Delete Class
export const deleteClassInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteClassInput = z.infer<typeof deleteClassInputSchema>;

// Update Class
export const updateClassInputSchema = z.object({
  id: z.string().min(1),
  updates: classCreateSchema,
});
export type UpdateClassInput = z.infer<typeof updateClassInputSchema>;
