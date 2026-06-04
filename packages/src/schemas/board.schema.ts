import { z } from 'zod';
import { StatusEnum } from '../enums';

export const BoardSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.string().trim().optional().or(z.literal('')).default(''),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
});

export const getBoardsInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});

export const getBoardDropdownInputSchema = z.object({
  search: z.string().trim().optional(),
});

/** @deprecated use getBoardDropdownInputSchema */
export const dropdownInputSchema = getBoardDropdownInputSchema;

export const getBoardBySlugInputSchema = z.object({
  slug: z.string().min(1),
});

export const getBoardByIdInputSchema = z.object({
  id: z.string().min(1),
});

export const updateBoardInputSchema = z.object({
  id: z.string().min(1),
  updates: BoardSchema,
});

export const deleteBoardInputSchema = z.object({
  id: z.string().min(1),
});


export type BoardFormValues = z.infer<typeof BoardSchema>;
export type GetBoardsInput = z.infer<typeof getBoardsInputSchema>;