import { z } from 'zod';
import { StatusEnum } from '../enums';

// Entity Status Schema
export const serviceCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional().default(''),
  icon: z.string().trim().optional(),
  keywords: z.array(z.string().trim().min(1)).default([]),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z.number().optional(),
  classId: z.array(z.string()).optional(),
  image: z.string().trim().optional(),
});
export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;

export const getServicesInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
  className: z.string().trim().optional(),
});
export type GetServicesInput = z.infer<typeof getServicesInputSchema>;

export const getServiceDropdownInputSchema = z
  .object({
    search: z.string().trim().optional(),
    classId: z.string().optional(),
  })
  .optional()
  .default({});
export type GetServiceDropdownInput = z.infer<typeof getServiceDropdownInputSchema>;

export const getServiceBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
});
export type GetServiceBySlugInput = z.infer<typeof getServiceBySlugInputSchema>;

export const getServiceByIdInputSchema = z.object({
  id: z.string().min(1),
});
export type GetServiceByIdInput = z.infer<typeof getServiceByIdInputSchema>;

export const updateServiceInputSchema = z.object({
  id: z.string().min(1),
  updates: serviceCreateSchema,
});
export type UpdateServiceInput = z.infer<typeof updateServiceInputSchema>;

export const deleteServiceInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteServiceInput = z.infer<typeof deleteServiceInputSchema>;