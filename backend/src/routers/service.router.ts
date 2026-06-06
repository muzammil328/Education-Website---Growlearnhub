import {
  ServiceSchema,
  getServicesInputSchema,
  getServiceBySlugInputSchema,
  getServiceByIdInputSchema,
  updateServiceInputSchema,
  deleteServiceInputSchema,
  UpdateServiceRequest,
} from '@muzammil328/education-packages';
import { serviceService } from '@/services/service.service';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import { toTrpcError } from '@muzammil328/trpc';
import type { PaginatedResult } from '@muzammil328/types';

interface ServiceListItem {
  serviceId: unknown;
  name: string;
  slug: string;
  status: string;
  className?: string[];
}

interface ServiceDropdownItem {
  _id: unknown;
  name: string;
}

interface ServiceClassItem {
  classId: unknown;
  className: string;
}

interface ServiceDetail {
  serviceId: unknown;
  name: string;
  slug: string;
  status: string;
  description?: string;
  image?: string;
  keywords?: string[];
  classId?: Array<string | object>;
  classes?: ServiceClassItem[];
}

export const serviceRouter = createTRPCRouter({
  getByName: publicProcedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    try {
      const data = await serviceService.getByName(input.name);
      return data;
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  getAll: teacherProcedure.input(getServicesInputSchema).query(async ({ input }) => {
    try {
      const result = (await serviceService.getAll(input)) as PaginatedResult<ServiceListItem>;
      return {
        success: true,
        message: 'Services fetched successfully',
        data: (result.data || []).map(item => ({
          serviceId: String(item.serviceId),
          name: item.name,
          slug: item.slug,
          status: item.status,
          className: item.className || [],
        })),
        pagination: {
          totalRecords: result.pagination.totalRecords,
          totalPages: result.pagination.totalPages,
          currentPage: result.pagination.page,
          pageSize: result.pagination.pageSize,
        },
      };
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  getDropdown: teacherProcedure.query(async () => {
    try {
      const result = (await serviceService.getDropdown({})) as ServiceDropdownItem[];
      return result.map(item => ({
        value: String(item._id),
        label: item.name,
      }));
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  getBySlug: teacherProcedure.input(getServiceBySlugInputSchema).query(async ({ input }) => {
    try {
      const data = await serviceService.getBySlug(input.slug);
      return data;
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  getById: teacherProcedure.input(getServiceByIdInputSchema).query(async ({ input }) => {
    try {
      const data = (await serviceService.getById(input.id)) as ServiceDetail;
      return {
        serviceId: String(data.serviceId),
        name: data.name,
        slug: data.slug,
        status: data.status,
        description: data.description,
        image: data.image,
        keywords: data.keywords || [],
        classId: (data.classId || []).map(id => String(id)),
        classes: (data.classes || []).map(cls => ({
          classId: String(cls.classId),
          className: cls.className,
        })),
      };
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  create: superAdminProcedure.input(ServiceSchema).mutation(async ({ input }) => {
    try {
      const created = await serviceService.create({
        name: input.name,
        status: input.status,
        classId: input.classId,
        description: input.description,
        image: input.image,
        keywords: input.keywords,
      });
      return {
        success: true,
        message: 'Service created successfully',
        data: {
          serviceId: String(created._id),
          name: created.name,
          slug: created.slug,
          status: created.status,
        },
      };
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  update: superAdminProcedure.input(updateServiceInputSchema).mutation(async ({ input }) => {
    try {
      const typedInput = input as { id: string; updates: UpdateServiceRequest };
      const updated = await serviceService.update({
        id: typedInput.id,
        name: typedInput.updates.name,
        status: typedInput.updates.status,
        classId: typedInput.updates.classId,
        description: typedInput.updates.description,
        image: typedInput.updates.image,
        keywords: typedInput.updates.keywords,
      });
      return {
        success: true,
        message: 'Service updated successfully',
        data: {
          serviceId: String(updated._id),
          name: updated.name,
          slug: updated.slug,
          status: updated.status,
        },
      };
    } catch (e) {
      return toTrpcError(e);
    }
  }),

  delete: superAdminProcedure.input(deleteServiceInputSchema).mutation(async ({ input }) => {
    try {
      await serviceService.delete(input.id);
      return { success: true, message: 'Service deleted successfully' };
    } catch (e) {
      return toTrpcError(e);
    }
  }),
});
