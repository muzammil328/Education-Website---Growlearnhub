import {
  BoardSchema,
  getBoardsInputSchema,
  getBoardDropdownInputSchema,
  getBoardBySlugInputSchema,
  getBoardByIdInputSchema,
  updateBoardInputSchema,
  deleteBoardInputSchema,
} from '@muzammil328/education-packages';
import { boardService } from '@/services/board.service';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import { toTrpcError } from '@muzammil328/core';
import type { PaginatedResult } from '@muzammil328/education-packages/types';

const boardPayloadSchema = BoardSchema;

interface BoardListItem {
  boardId: unknown;
  name: string;
  slug: string;
  status: string;
  description?: string;
  className?: string;
}

interface BoardDropdownItem {
  _id: unknown;
  name: string;
}

interface BoardDetail {
  boardId: unknown;
  name: string;
  slug: string;
  status: string;
  description?: string;
  classId?: unknown;
}

export const boardRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getBoardsInputSchema).query(async ({ input }) => {
    try {
      const result = (await boardService.getAll(input)) as PaginatedResult<BoardListItem>;
      return {
        success: true,
        message: 'Boards fetched successfully',
        data: (result.data || []).map(item => ({
          boardId: String(item.boardId),
          name: item.name,
          slug: item.slug,
          status: item.status,
          description: item.description,
          className: item.className || '',
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

  getDropdown: teacherProcedure.input(getBoardDropdownInputSchema).query(async ({ input }) => {
    try {
      const result = (await boardService.getDropdown(input)) as BoardDropdownItem[];
      return result.map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getBoardBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = await boardService.getBySlug(input.slug);
      return data;
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getBoardByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await boardService.getById(input.id)) as BoardDetail;
      return {
        boardId: String(data.boardId),
        name: data.name,
        slug: data.slug,
        status: data.status,
        description: data.description,
        classId: data.classId ? String(data.classId) : undefined,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(boardPayloadSchema).mutation(async ({ input }) => {
    try {
      const created = await boardService.create({
        name: input.name,
        status: input.status,
        classId: input.classId,
        description: input.description,
      });
      return {
        success: true,
        message: 'Board created successfully',
        data: {
          boardId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateBoardInputSchema).mutation(async ({ input }) => {
    try {
      const updated = await boardService.update({
        id: input.id,
        name: input.updates.name,
        status: input.updates.status,
        classId: input.updates.classId,
        description: input.updates.description,
      });
      return {
        success: true,
        message: 'Board updated successfully',
        data: {
          boardId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteBoardInputSchema).mutation(async ({ input }) => {
    try {
      await boardService.delete(input.id);
      return { success: true, message: 'Board deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
