import { z } from 'zod';
import { StatusEnum } from '../enums';
import { emailSchema } from '@muzammil328/types';

export const InstitutionSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2).max(32),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  contactEmail: emailSchema.optional(),
  address: z.string().optional(),
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  ownerUserId: z.string().optional(),
});

export const getInstitutionsInputSchema = z.object({
  status: z
    .union([z.nativeEnum(StatusEnum), z.literal('all')])
    .optional()
    .default('active'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z
    .enum(['name', 'code', 'status', 'createdAt', 'updatedAt'])
    .optional()
    .default('name'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().trim().optional(),
});

export const getInstitutionByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateInstitutionInputSchema = z.object({
  id: z.string().min(1),
  updates: InstitutionSchema.partial(),
});

export const updateInstitutionSubscriptionSchema = z.object({
  id: z.string().min(1),
  updates: InstitutionSchema.partial(),
});

export const deleteInstitutionInputSchema = z.object({
  id: z.string().min(1),
});

export type InstitutionFormValues = z.infer<typeof InstitutionSchema>;
