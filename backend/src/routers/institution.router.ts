import { Types } from 'mongoose';
import { toTrpcError } from '@muzammil328/core';
import { AppError } from '@muzammil328/core';
import {
  InstitutionSchema,
  getInstitutionsInputSchema,
  getInstitutionByIdInputSchema,
  updateInstitutionInputSchema,
  updateInstitutionSubscriptionSchema,
  deleteInstitutionInputSchema,
} from '@muzammil328/education-packages';
import InstitutionModel from '../models/institution.model';
import { createTRPCRouter, superAdminProcedure, protectedProcedure } from '@/trpc/trpc';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const institutionRouter = createTRPCRouter({
  getAll: superAdminProcedure.input(getInstitutionsInputSchema).query(async ({ input }) => {
    const filter: Record<string, unknown> = {};
    if (input.status !== 'all') filter.status = input.status;
    if (input.search) {
      const re = escapeRegex(input.search);
      filter.$or = [
        { name: { $regex: re, $options: 'i' } },
        { code: { $regex: re, $options: 'i' } },
      ];
    }

    const offset = (input.page - 1) * input.limit;
    const sortOrder: 1 | -1 = input.sortDirection === 'desc' ? -1 : 1;

    const [data, totalRecords] = await Promise.all([
      InstitutionModel.find(filter)
        .sort({ [input.sort]: sortOrder })
        .skip(offset)
        .limit(input.limit)
        .lean(),
      InstitutionModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalRecords / input.limit);

    return {
      success: true,
      message: 'Institutions fetched successfully',
      data: (data as any[]).map(item => ({
        institutionId: String(item._id),
        name: item.name,
        slug: item.slug,
        code: item.code,
        contactEmail: item.contactEmail,
        address: item.address,
        status: item.status,
      })),
      pagination: { totalRecords, totalPages, currentPage: input.page, pageSize: input.limit },
    };
  }),

  getDropdown: protectedProcedure
    .input(getInstitutionsInputSchema.pick({ search: true }).optional())
    .query(async ({ input }) => {
      const filter: Record<string, unknown> = { status: 'active' };
      if (input?.search) {
        filter.name = { $regex: escapeRegex(input.search), $options: 'i' };
      }
      const result = await InstitutionModel.find(filter).select('_id name code').limit(50).lean();
      return (result as any[]).map(item => ({
        value: String(item._id),
        label: `${item.name} (${item.code})`,
      }));
    }),

  getById: superAdminProcedure.input(getInstitutionByIdInputSchema).query(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid institution ID'));
    }

    const institution = (await InstitutionModel.findById(input.id)
      .populate('classes', 'name slug')
      .lean()) as any;

    if (!institution) {
      throw toTrpcError(AppError.notFound('Institution not found'));
    }

    return {
      institutionId: String(institution._id),
      name: institution.name,
      slug: institution.slug,
      code: institution.code,
      contactEmail: institution.contactEmail,
      address: institution.address,
      status: institution.status,
      ownerUserId: institution.ownerUserId ? String(institution.ownerUserId) : undefined,
    };
  }),

  create: superAdminProcedure.input(InstitutionSchema).mutation(async ({ input }) => {
    const exists = await InstitutionModel.findOne({ contactEmail: input.contactEmail });
    if (exists) {
      throw toTrpcError(AppError.conflict('Institution with this email already exists'));
    }

    const institution = (await InstitutionModel.create({ ...input })) as any;

    return {
      success: true,
      message: 'Institution created successfully',
      data: { id: String(institution._id) },
    };
  }),

  update: superAdminProcedure.input(updateInstitutionInputSchema).mutation(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid institution ID'));
    }

    const updated = (await InstitutionModel.findByIdAndUpdate(input.id, input.updates, {
      new: true,
    }).lean()) as any;

    if (!updated) {
      throw toTrpcError(AppError.notFound('Institution not found'));
    }

    return { success: true, message: 'Institution updated successfully' };
  }),

  updateSubscription: superAdminProcedure
    .input(updateInstitutionSubscriptionSchema)
    .mutation(async ({ input }) => {
      if (!Types.ObjectId.isValid(input.id)) {
        throw toTrpcError(AppError.badRequest('Invalid institution ID'));
      }

      const updated = (await InstitutionModel.findByIdAndUpdate(
        input.id,
        { ...input.updates },
        { new: true }
      ).lean()) as any;

      if (!updated) {
        throw toTrpcError(AppError.notFound('Institution not found'));
      }

      return {
        success: true,
        message: 'Institution updated successfully',
        data: { institutionId: String(updated._id) },
      };
    }),

  delete: superAdminProcedure.input(deleteInstitutionInputSchema).mutation(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid institution ID'));
    }

    const deleted = await InstitutionModel.findByIdAndDelete(input.id).lean();

    if (!deleted) {
      throw toTrpcError(AppError.notFound('Institution not found'));
    }

    return { success: true, message: 'Institution deleted successfully' };
  }),
});
