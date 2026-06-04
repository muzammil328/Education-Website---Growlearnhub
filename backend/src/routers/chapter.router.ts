import { toTrpcError } from '@muzammil328/core';
import {
  ChapterSchema,
  getChaptersInputSchema,
  getChapterDropdownInputSchema,
  getChapterByIdInputSchema,
  getChapterByClassAndBookNameInputSchema,
  getChapterBySlugOnlyInputSchema,
  getChapterBySlugInputSchema,
  updateChapterInputSchema,
  deleteChapterInputSchema,
} from '@muzammil328/education-packages';
import { chapterService } from '@/services/chapter.service';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';

export const chapterRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getChaptersInputSchema).query(async ({ input }) => {
    try {
      const result = (await chapterService.getAll(input)) as any;
      return {
        success: true,
        message: 'Chapters fetched successfully',
        data: (result.data || []).map((item: any) => ({
          chapterId: String(item.chapterId),
          name: item.name,
          status: item.status,
          className: item.className,
          bookName: item.bookName,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
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

  getDropdown: teacherProcedure.input(getChapterDropdownInputSchema).query(async ({ input }) => {
    try {
      const result = (await chapterService.getDropdown(input)) as any[];
      return result.map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getChapterBySlugOnlyInputSchema).query(async ({ input }) => {
    try {
      const data = await chapterService.getBySlug(input.slug);
      return data;
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getChapterByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await chapterService.getById(input.id)) as any;
      return {
        chapterId: String(data.chapterId),
        name: data.name,
        slug: data.slug,
        status: data.status,
        description: data.description,
        content: data.content,
        order: data.order,
        classId: String(data.classId),
        bookId: String(data.bookId),
        className: data.className,
        bookName: data.bookName,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getByClassAndBookName: teacherProcedure
    .input(getChapterByClassAndBookNameInputSchema)
    .query(async ({ input }) => {
      try {
        const result = (await chapterService.getByClassAndBookName(
          input.className,
          input.bookName
        )) as any[];
        return result.map(item => ({ name: item.name, slug: item.slug }));
      } catch (e) {
        throw toTrpcError(e);
      }
    }),

  getByClassSlugAndChapterSlug: teacherProcedure
    .input(getChapterBySlugInputSchema)
    .query(async ({ input }) => {
      try {
        const data = (await chapterService.getByClassSlugAndChapterSlug(
          input.classSlug,
          input.chapterSlug
        )) as any;
        return {
          chapterId: data.chapterId,
          name: data.name,
          slug: data.slug,
          status: data.status,
          description: data.description,
          content: data.content,
          order: data.order,
          classId: data.classId,
          bookId: data.bookId,
          className: data.className,
          bookName: data.bookName,
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    }),

  create: superAdminProcedure.input(ChapterSchema).mutation(async ({ input }) => {
    try {
      const created = (await chapterService.create({
        name: input.name,
        status: input.status,
        bookId: input.bookId,
        classId: input.classId,
        order: input.order,
        description: input.description,
        content: input.content,
      })) as any;
      return {
        success: true,
        message: 'Chapter created successfully',
        data: {
          chapterId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateChapterInputSchema).mutation(async ({ input }) => {
    try {
      const updated = (await chapterService.update({
        id: input.id,
        name: input.updates.name,
        status: input.updates.status,
        bookId: input.updates.bookId,
        classId: input.updates.classId,
        order: input.updates.order,
        description: input.updates.description,
        content: input.updates.content,
      })) as any;
      return {
        success: true,
        message: 'Chapter updated successfully',
        data: {
          chapterId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteChapterInputSchema).mutation(async ({ input }) => {
    try {
      await chapterService.delete(input.id);
      return { success: true, message: 'Chapter deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
