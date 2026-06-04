import { z } from 'zod';
import { EntityStatus, entityStatusSchema } from '../enums';

export const ClassSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional().default(''),
  serviceId: z.array(z.string().trim().min(1)).default([]),
  image: z.string().trim().optional().default(''),
  keywords: z.array(z.string().trim().min(1)).default([]),
  status: entityStatusSchema.default(EntityStatus.ACTIVE),
});
export type CreateClassInput = z.infer<typeof ClassSchema>;


export const getClassesInputSchema = z.object({
  status: entityStatusSchema.optional().default(EntityStatus.ACTIVE),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});
export type GetClassesInput = z.infer<typeof getClassesInputSchema>;


export const getClassBySlugInputSchema = z.object({ slug: z.string().min(1) });

export const getClassByIdInputSchema = z.object({ id: z.string().min(1) });

export const dropdownClassInputSchema = z.object({
  search: z.string().trim().optional(),
  serviceId: z.string().optional(),
});
export type GetClassDropdownInput = z.infer<typeof dropdownClassInputSchema>;


export const updateClassInputSchema = z.object({
  id: z.string().min(1),
  updates: ClassSchema,
});

export const deleteClassInputSchema = z.object({ id: z.string().min(1) });


export const getClassByServiceSlugInputSchema = z.object({
  serviceSlug: z.string().min(1),
});

// Alias for backwards compatibility with code that uses classPayloadSchema
export const classPayloadSchema = ClassSchema;

export type ClassFormValues = z.infer<typeof ClassSchema>;