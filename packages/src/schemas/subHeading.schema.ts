import { z } from 'zod';
import { StatusEnum } from '../enums';

const statusSchema = z.nativeEnum(StatusEnum).default(StatusEnum.Active);

// Create SubHeading
export const subHeadingCreateSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  code: z.string().optional(),
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
  headingId: z.string().trim().min(1),
  serviceId: z.array(z.string()).optional(),
  description: z.string().trim().optional().default(''),
  creditHours: z.number().optional(),
  fileId: z.string().trim().optional(),
  pages: z.number().optional(),
  image: z.string().trim().optional(),
  content: z.string().trim().optional().default(''),
  totalWeight: z.number().optional(),
  components: z.array(z.any()).optional(),
  status: statusSchema,
  order: z.number().optional(),
});
export type SubHeadingCreateInput = z.infer<typeof subHeadingCreateSchema>;

// Get SubHeadings
export const getSubHeadingsInputSchema = z.object({
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sort: z.enum(['name', 'status', 'createdAt', 'updatedAt', 'order']).optional().default('order'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().trim().optional(),
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  headingId: z.string().optional(),
});
export type GetSubHeadingsInput = z.infer<typeof getSubHeadingsInputSchema>;

// Get SubHeading Dropdown
export const getSubHeadingDropdownInputSchema = z.object({
  classId: z.string().optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  headingId: z.string().optional(),
});
export type GetSubHeadingDropdownInput = z.infer<typeof getSubHeadingDropdownInputSchema>;

// Get SubHeading by ID
export const getSubHeadingBySlugInputSchema = z.object({
  classSlug: z.string().min(1),
  bookSlug: z.string().min(1),
  chapterSlug: z.string().min(1),
  headingSlug: z.string().min(1),
});
export type GetSubHeadingBySlugInput = z.infer<typeof getSubHeadingBySlugInputSchema>;

// Get SubHeading by Slug
export const getSubHeadingByIdInputSchema = z.object({
  id: z.string().min(1),
});
export type GetSubHeadingByIdInput = z.infer<typeof getSubHeadingByIdInputSchema>;

// Delete SubHeading
export const deleteSubHeadingInputSchema = z.object({
  id: z.string().min(1),
});
export type DeleteSubHeadingInput = z.infer<typeof deleteSubHeadingInputSchema>;

// Update SubHeading
export const updateSubHeadingInputSchema = z.object({
  id: z.string().min(1),
  updates: subHeadingCreateSchema,
});
export type UpdateSubHeadingInput = z.infer<typeof updateSubHeadingInputSchema>;

// Bulk Create SubHeadings
export const bulkCreateSubHeadingsInputSchema = z.object({
  classId: z.string().trim().min(1),
  bookId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
  headingId: z.string().trim().min(1),
  items: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        order: z.number().optional(),
        status: statusSchema,
      })
    )
    .min(1)
    .max(100),
});
export type BulkCreateSubHeadingsInput = z.infer<typeof bulkCreateSubHeadingsInputSchema>;
