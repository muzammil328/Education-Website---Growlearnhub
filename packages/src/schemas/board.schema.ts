import { z } from 'zod';
import { StatusEnum } from '../enums';

// Create Board
export const boardCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  classId: z.array(z.string().trim().min(1)).default([]),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.Active),
});
export type BoardCreateInput = z.infer<typeof boardCreateSchema>;

// Get Boards
export const getBoardsInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().trim().optional(),
});
export type GetBoardsInput = z.infer<typeof getBoardsInputSchema>;

// Get Board Dropdown
export const getBoardDropdownInputSchema = z.object({
  classId: z.string().trim().optional(),
});
export const dropdownInputSchema = getBoardDropdownInputSchema;

// Get Board by ID
export const getBoardByIdInputSchema = z.object({
  id: z.string().min(1),
});
export type GetBoardByIdInput = z.infer<typeof getBoardByIdInputSchema>;

// Get Board by Slug
export const getBoardBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
});
export type GetBoardBySlugInput = z.infer<typeof getBoardBySlugInputSchema>;

// Delete Board
export const deleteBoardInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteBoardInput = z.infer<typeof deleteBoardInputSchema>;

// Update Board
export const updateBoardInputSchema = z.object({
  id: z.string().min(1),
  updates: boardCreateSchema.partial(),
});
export type UpdateBoardInput = z.infer<typeof updateBoardInputSchema>;


