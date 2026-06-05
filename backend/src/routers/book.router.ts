import { toTrpcError } from '@muzammil328/utils';
import {
  BookSchema,
  getBooksInputSchema,
  getBookDropdownInputSchema,
  getBookByIdInputSchema,
  getBookByNameInputSchema,
  getBookByClassNameInputSchema,
  getBookBySlugInputSchema,
  getBookByClassSlugInputSchema,
  updateBookInputSchema,
  deleteBookInputSchema,
} from '@muzammil328/education-packages';
import { bookService } from '@/services/book.service';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';

export const bookRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getBooksInputSchema).query(async ({ input }) => {
    try {
      const result = await bookService.getAll(input);
      return {
        success: true,
        message: 'Books fetched successfully',
        data: (result.data || []).map((item: any) => ({
          bookId: String(item.bookId),
          name: item.name,
          status: item.status,
          className: item.className,
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

  getDropdown: teacherProcedure.input(getBookDropdownInputSchema).query(async ({ input }) => {
    try {
      const result = await bookService.getDropdown(input);
      return (result as any[]).map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getBookByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await bookService.getById(input.id)) as any;
      const resolvedClassId = data.class?.classId
        ? String(data.class.classId)
        : data.classId
          ? String(data.classId)
          : undefined;
      return {
        bookId: String(data.bookId),
        name: data.name,
        slug: data.slug,
        code: data.code,
        status: data.status,
        description: data.description,
        creditHours: data.creditHours,
        fileId: data.fileId,
        pages: data.pages,
        image: data.image,
        order: data.order,
        totalWeight: data.totalWeight,
        components: data.components || [],
        classId: resolvedClassId,
        class: resolvedClassId
          ? { classId: resolvedClassId, className: data.class?.className }
          : undefined,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getByName: teacherProcedure.input(getBookByNameInputSchema).query(async ({ input }) => {
    try {
      const data = (await bookService.getByName(input.name)) as any;
      return {
        bookId: String(data.bookId),
        name: data.name,
        slug: data.slug,
        code: data.code,
        status: data.status,
        description: data.description,
        creditHours: data.creditHours,
        totalWeight: data.totalWeight,
        pages: data.pages,
        components: data.components || [],
        class: { classId: String(data.class?.classId), className: data.class?.className },
        image: data.image,
        keywords: data.keywords || [],
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getByClassName: teacherProcedure.input(getBookByClassNameInputSchema).query(async ({ input }) => {
    try {
      const result = (await bookService.getByClassName(input.className)) as any[];
      return result.map(item => ({ name: item.name, slug: item.slug }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getBookBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = (await bookService.getBySlug(input.slug)) as any;
      return {
        bookId: data.bookId,
        name: data.name,
        slug: data.slug,
        code: data.code,
        status: data.status,
        description: data.description,
        creditHours: data.creditHours,
        fileId: data.fileId,
        pages: data.pages,
        image: data.image,
        order: data.order,
        totalWeight: data.totalWeight,
        components: data.components,
        classId: data.classId,
        class: data.class,
        keywords: data.keywords,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getByClassSlug: teacherProcedure.input(getBookByClassSlugInputSchema).query(async ({ input }) => {
    try {
      const result = (await bookService.getByClassSlug(input.classSlug)) as any[];
      return result.map(item => ({ name: item.name, slug: item.slug }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(BookSchema).mutation(async ({ input }) => {
    try {
      const created = (await bookService.create({
        name: input.name,
        code: input.code,
        status: input.status,
        classId: input.classId,
        description: input.description,
        creditHours: input.creditHours,
        fileId: input.fileId,
        pages: input.pages,
        image: input.image,
        order: input.order,
        totalWeight: input.totalWeight,
        components: input.components,
      })) as any;
      return {
        success: true,
        message: 'Book created successfully',
        data: {
          bookId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateBookInputSchema).mutation(async ({ input }) => {
    try {
      const updated = (await bookService.update({
        id: input.id,
        name: input.updates.name,
        code: input.updates.code,
        status: input.updates.status,
        classId: input.updates.classId,
        description: input.updates.description,
        creditHours: input.updates.creditHours,
        fileId: input.updates.fileId,
        pages: input.updates.pages,
        image: input.updates.image,
        order: input.updates.order,
        totalWeight: input.updates.totalWeight,
        components: input.updates.components,
      })) as any;
      return {
        success: true,
        message: 'Book updated successfully',
        data: {
          bookId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteBookInputSchema).mutation(async ({ input }) => {
    try {
      await bookService.delete(input.id);
      return { success: true, message: 'Book deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
