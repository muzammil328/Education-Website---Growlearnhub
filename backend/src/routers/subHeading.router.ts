import { toTrpcError } from '@muzammil328/trpc';
import {
  SubHeadingSchema,
  getSubHeadingsInputSchema,
  getSubHeadingDropdownInputSchema,
  getSubHeadingBySlugInputSchema,
  getSubHeadingByIdInputSchema,
  updateSubHeadingInputSchema,
  deleteSubHeadingInputSchema,
} from '@muzammil328/education-packages';
import { subHeadingService } from '@/services/subHeading.service';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import type { PaginatedResult } from '@muzammil328/types';

interface SubHeadingListItem {
  subHeadingId: unknown;
  name: string;
  status: string;
  className: string;
  bookName: string;
  chapterName: string;
  headingName: string;
}

interface SubHeadingDropdownItem {
  _id: unknown;
  name: string;
}

interface SubHeadingDetail {
  subHeadingId: unknown;
  name: string;
  slug: string;
  status: string;
  order?: number;
  classId: unknown;
  bookId: unknown;
  chapterId: unknown;
  headingId: unknown;
  className: string;
  bookName: string;
  chapterName: string;
  headingName: string;
}

export const subHeadingRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getSubHeadingsInputSchema).query(async ({ input }) => {
    try {
      const result = (await subHeadingService.getAll(input)) as PaginatedResult<SubHeadingListItem>;
      return {
        success: true,
        message: 'SubHeadings fetched successfully',
        data: (result.data || []).map(item => ({
          subHeadingId: String(item.subHeadingId),
          name: item.name,
          status: item.status,
          className: item.className,
          bookName: item.bookName,
          chapterName: item.chapterName,
          headingName: item.headingName,
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

  getDropdown: teacherProcedure.input(getSubHeadingDropdownInputSchema).query(async ({ input }) => {
    try {
      const result = (await subHeadingService.getDropdown(input)) as SubHeadingDropdownItem[];
      return result.map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getSubHeadingBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = await subHeadingService.getBySlug(input.slug);
      return data;
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getSubHeadingByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await subHeadingService.getById(input.id)) as SubHeadingDetail;
      return {
        subHeadingId: String(data.subHeadingId),
        name: data.name,
        slug: data.slug,
        status: data.status,
        order: data.order,
        classId: String(data.classId),
        bookId: String(data.bookId),
        chapterId: String(data.chapterId),
        headingId: String(data.headingId),
        class: { classId: String(data.classId), className: data.className },
        book: { bookId: String(data.bookId), bookName: data.bookName },
        chapter: { chapterId: String(data.chapterId), chapterName: data.chapterName },
        heading: { headingId: String(data.headingId), headingName: data.headingName },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(SubHeadingSchema).mutation(async ({ input }) => {
    try {
      const created = await subHeadingService.create({
        name: input.name,
        status: input.status,
        classId: input.classId,
        bookId: input.bookId,
        chapterId: input.chapterId,
        headingId: input.headingId,
        order: input.order,
      });
      return {
        success: true,
        message: 'SubHeading created successfully',
        data: {
          subHeadingId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateSubHeadingInputSchema).mutation(async ({ input }) => {
    try {
      const updated = await subHeadingService.update({
        id: input.id,
        name: input.updates.name,
        status: input.updates.status,
        classId: input.updates.classId,
        bookId: input.updates.bookId,
        chapterId: input.updates.chapterId,
        headingId: input.updates.headingId,
        order: input.updates.order,
      });
      return {
        success: true,
        message: 'SubHeading updated successfully',
        data: {
          subHeadingId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteSubHeadingInputSchema).mutation(async ({ input }) => {
    try {
      await subHeadingService.delete(input.id);
      return { success: true, message: 'SubHeading deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
