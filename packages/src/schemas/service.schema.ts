import { z } from 'zod';
import { EntityStatus, entityStatusSchema } from '../enums';

export const ServiceSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional().default(''),
  icon: z.string().trim().optional(),
  keywords: z.array(z.string().trim().min(1)).default([]),
  status: entityStatusSchema.default(EntityStatus.ACTIVE),
  order: z.number().optional(),
  classId: z.array(z.string()).optional(),
  image: z.string().trim().optional(),
});

export const getServicesInputSchema = z.object({
  status: entityStatusSchema.optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  className: z.string().trim().optional(),
});

export const getServiceDropdownInputSchema = z
  .object({
    search: z.string().trim().optional(),
    classId: z.string().optional(),
  })
  .optional()
  .default({});

export const getServiceBySlugInputSchema = z.object({
  slug: z.string().min(1),
});

export const getServiceByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateServiceInputSchema = z.object({
  id: z.string().min(1),
  updates: ServiceSchema.strict(),
});

export const deleteServiceInputSchema = z.object({
  id: z.string().min(1),
});

export type ServiceFormValues = z.infer<typeof ServiceSchema>;
export type CreateServiceRequest = z.infer<typeof ServiceSchema>;
export type UpdateServiceRequest = Partial<z.infer<typeof ServiceSchema>>;