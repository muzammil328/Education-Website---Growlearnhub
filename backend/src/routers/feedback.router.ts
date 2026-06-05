import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/utils';
import {
  createFeedbackSchema,
  getFeedbackInputSchema,
  getFeedbackByIdInputSchema,
  updateFeedbackStatusSchema,
} from '@muzammil328/education-packages';
import { createTRPCRouter, publicProcedure } from '@/trpc/trpc';
import { feedbackRepository } from '../repository/feedback.repository';

export const feedbackRouter = createTRPCRouter({
  create: publicProcedure.input(createFeedbackSchema).mutation(async ({ input }) => {
    const created = (await feedbackRepository.create({ ...input, status: 'pending' })) as any;
    return {
      success: true,
      message: 'Feedback submitted successfully',
      data: {
        feedbackId: String(created._id),
        name: created.name,
        email: created.email,
        type: created.type,
        status: created.status,
      },
    };
  }),

  getAll: publicProcedure.input(getFeedbackInputSchema).query(async ({ input }) => {
    const sortOrder: 1 | -1 = input.sortDirection === 'desc' ? -1 : 1;
    const match: Record<string, unknown> = {};

    if (input.type) match.type = input.type;
    if (input.status) match.status = input.status;

    const result = await feedbackRepository.aggregatePaginate<{
      feedbackId: Types.ObjectId;
      name: string;
      email: string;
      phone?: string;
      message: string;
      type: 'contact' | 'bug-report' | 'feature-request';
      status: 'pending' | 'resolved' | 'rejected';
      createdAt: Date;
    }>({
      pipeline: [
        { $match: match },
        { $sort: { [input.sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            feedbackId: '$_id',
            name: 1,
            email: 1,
            phone: 1,
            message: 1,
            type: 1,
            status: 1,
            createdAt: 1,
          },
        },
      ],
      page: input.page,
      limit: input.limit,
    });

    return {
      success: true,
      message: 'Feedback fetched successfully',
      data: (result.data || []).map(item => ({
        feedbackId: String(item.feedbackId),
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
        type: item.type,
        status: item.status,
        createdAt: item.createdAt,
      })),
      pagination: result.pagination,
    };
  }),

  getById: publicProcedure.input(getFeedbackByIdInputSchema).query(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid feedback ID format'));
    }

    const result = (await feedbackRepository.findById(input.id)) as any;

    if (!result) {
      throw toTrpcError(AppError.notFound('Feedback not found'));
    }

    return {
      feedbackId: String(result._id),
      name: result.name,
      email: result.email,
      phone: result.phone,
      message: result.message,
      type: result.type,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }),

  updateStatus: publicProcedure.input(updateFeedbackStatusSchema).mutation(async ({ input }) => {
    const updated = (await feedbackRepository.findByIdAndUpdate(
      input.id,
      { status: input.status },
      { new: true }
    )) as any;

    if (!updated) {
      throw toTrpcError(AppError.notFound('Feedback not found'));
    }

    return {
      success: true,
      message: 'Feedback status updated successfully',
      data: { feedbackId: String(updated._id), status: updated.status },
    };
  }),
});
