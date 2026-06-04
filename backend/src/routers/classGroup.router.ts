import { toTrpcError } from '@muzammil328/core';
import {
  ClassGroupSchema,
  AddStudentsToClassGroupSchema,
  GetClassGroupDetailsSchema,
} from '@muzammil328/education-packages';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import { classGroupService } from '@/services/classGroup.service';

export const classGroupRouter = createTRPCRouter({
  create: protectedProcedure.input(ClassGroupSchema).mutation(async ({ ctx, input }) => {
    try {
      const user = ctx.user;
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
      }

      const result = (await classGroupService.create(user.userId, input)) as any;
      return {
        success: true,
        message: 'Class group created successfully',
        data: { groupId: result.groupId, name: result.name },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  addStudents: protectedProcedure
    .input(AddStudentsToClassGroupSchema)
    .mutation(async ({ input }) => {
      try {
        const result = (await classGroupService.addStudents(input)) as any;
        return {
          success: true,
          message: 'Students added to class group',
          data: { groupId: result.groupId, memberCount: result.memberCount },
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = ctx.user;
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
      }

      const result = await classGroupService.getAll(user.userId);
      return {
        success: true,
        message: 'Class groups fetched successfully',
        data: result,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: protectedProcedure.input(GetClassGroupDetailsSchema).query(async ({ input }) => {
    try {
      const result = await classGroupService.getById(input.groupId);
      return { success: true, data: result };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),
});
