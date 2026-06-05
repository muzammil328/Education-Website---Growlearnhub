import { Types } from 'mongoose';
import { toTrpcError } from '@muzammil328/trpc';
import {
  classPayloadSchema,
  getClassesInputSchema,
  getClassBySlugInputSchema,
  getClassByIdInputSchema,
  getClassByServiceSlugInputSchema,
  dropdownClassInputSchema,
  updateClassInputSchema,
  deleteClassInputSchema,
} from '@muzammil328/education-packages';
import { createTRPCRouter, publicProcedure, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import { classService } from '@/services/class.service';

export const classRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getClassesInputSchema).query(async ({ input }) => {
    try {
      const result = (await classService.getAll(input)) as any;
      return {
        success: true,
        message: 'Classes fetched successfully',
        data: (result.data ?? []).map((item: any) => ({
          classId: String(item.classId),
          name: item.name,
          status: item.status,
          serviceName: item.serviceName ?? [],
        })),
        pagination: result.pagination,
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getClassBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = await classService.getBySlug(input.slug);
      return data;
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getClassByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await classService.getById(input.id)) as any;
      return {
        classId: String(data.classId),
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        status: data.status,
        keywords: data.keywords ?? [],
        serviceId: (data.serviceId ?? []).map((id: Types.ObjectId) => String(id)),
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getDropdown: teacherProcedure.input(dropdownClassInputSchema).query(async ({ input }) => {
    try {
      const result = (await classService.getDropdown(input)) as any[];
      return result.map(item => ({ value: String(item.value), label: item.label }));
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(classPayloadSchema).mutation(async ({ input }) => {
    try {
      const created = (await classService.create(input)) as any;
      return {
        success: true,
        message: 'Class created successfully',
        data: {
          classId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
          description: created.description,
          serviceId: (created.serviceId ?? []).map((id: Types.ObjectId | string) => String(id)),
          image: created.image,
          keywords: created.keywords ?? [],
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateClassInputSchema).mutation(async ({ input }) => {
    try {
      const updated = (await classService.update({ id: input.id, ...input.updates })) as any;
      return {
        success: true,
        message: 'Class updated successfully',
        data: {
          classId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
          description: updated.description,
          serviceId: (updated.serviceId ?? []).map((id: Types.ObjectId | string) => String(id)),
          image: updated.image,
          keywords: updated.keywords ?? [],
        },
      };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteClassInputSchema).mutation(async ({ input }) => {
    try {
      await classService.delete(input.id);
      return { success: true, message: 'Class deleted successfully' };
    } catch (e) {
      throw toTrpcError(e);
    }
  }),

  getByServiceSlug: publicProcedure
    .input(getClassByServiceSlugInputSchema)
    .query(async ({ input }) => {
      try {
        const result = (await classService.getByServiceSlug(input.serviceSlug)) as any[];
        return result.map(item => ({ name: item.name, slug: item.slug }));
      } catch (e) {
        throw toTrpcError(e);
      }
    }),
});
