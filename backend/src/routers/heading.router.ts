import { toTrpcError } from '@muzammil328/utils';
import {
  HeadingSchema,
  getHeadingsInputSchema,
  getHeadingDropdownInputSchema,
  getHeadingBySlugInputSchema,
  getHeadingByIdInputSchema,
  updateHeadingInputSchema,
  deleteHeadingInputSchema,
} from '@muzammil328/education-packages';
import { headingService } from '@/services/heading.service';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import type { PaginatedResult } from '@muzammil328/education-packages/types';

interface HeadingListItem {
  headingId: unknown;
  name: string;
  status: string;
  className: string;
  bookName: string;
  chapterName: string;
}

interface HeadingDropdownItem {
  _id: unknown;
  name: string;
}

interface HeadingDetail {
  headingId: unknown;
  name: string;
  slug: string;
  status: string;
  order?: number;
  classId: unknown;
  bookId: unknown;
  chapterId: unknown;
  className: string;
  bookName: string;
  chapterName: string;
}

export const headingRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getHeadingsInputSchema).query(async ({ input }) => {
    try {
      const result = (await headingService.getAll(input)) as PaginatedResult<HeadingListItem>;
      return {
        success: true,
        message: 'Headings fetched successfully',
        data: (result.data || []).map(item => ({
          headingId: String(item.headingId),
          name: item.name,
          status: item.status,
          className: item.className,
          bookName: item.bookName,
          chapterName: item.chapterName,
        })),
        pagination: {
          totalRecords: result.pagination.totalRecords,
          totalPages: result.pagination.totalPages,
          currentPage: result.pagination.page,
          pageSize: result.pagination.pageSize,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getDropdown: teacherProcedure.input(getHeadingDropdownInputSchema).query(async ({ input }) => {
    try {
      const result = (await headingService.getDropdown(input)) as HeadingDropdownItem[];
      return result.map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getHeadingBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = await headingService.getBySlug(input.slug);
      return data;
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getHeadingByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await headingService.getById(input.id)) as HeadingDetail;
      return {
        headingId: String(data.headingId),
        name: data.name,
        slug: data.slug,
        status: data.status,
        order: data.order,
        classId: String(data.classId),
        bookId: String(data.bookId),
        chapterId: String(data.chapterId),
        class: { classId: String(data.classId), className: data.className },
        book: { bookId: String(data.bookId), bookName: data.bookName },
        chapter: { chapterId: String(data.chapterId), chapterName: data.chapterName },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(HeadingSchema).mutation(async ({ input }) => {
    try {
      const created = await headingService.create({
        name: input.name,
        status: input.status,
        classId: input.classId,
        bookId: input.bookId,
        chapterId: input.chapterId,
        order: input.order,
      });
      return {
        success: true,
        message: 'Heading created successfully',
        data: {
          headingId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateHeadingInputSchema).mutation(async ({ input }) => {
    try {
      const updated = await headingService.update({
        id: input.id,
        name: input.updates.name,
        status: input.updates.status,
        classId: input.updates.classId,
        bookId: input.updates.bookId,
        chapterId: input.updates.chapterId,
        order: input.updates.order,
      });
      return {
        success: true,
        message: 'Heading updated successfully',
        data: {
          headingId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteHeadingInputSchema).mutation(async ({ input }) => {
    try {
      await headingService.delete(input.id);
      return { success: true, message: 'Heading deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
