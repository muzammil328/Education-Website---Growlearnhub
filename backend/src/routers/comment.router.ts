import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import {
  createCommentSchema,
  getCommentsSchema,
  getCommentByIdSchema,
  deleteCommentSchema,
} from '@muzammil328/education-packages';
import { createTRPCRouter, publicProcedure } from '@/trpc/trpc';
import { commentRepository } from '../repository/comment.repository';

export const commentRouter = createTRPCRouter({
  create: publicProcedure.input(createCommentSchema).mutation(async ({ input }) => {
    const created = (await commentRepository.create(input)) as any;
    return {
      success: true,
      message: 'Comment submitted successfully',
      data: { commentId: String(created._id) },
    };
  }),

  getAll: publicProcedure.input(getCommentsSchema).query(async ({ input }) => {
    const sortOrder: 1 | -1 = input.sortDirection === 'desc' ? -1 : 1;
    const result = await commentRepository.aggregatePaginate<{
      commentId: Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      pageUrl?: string;
      message: string;
      createdAt: Date;
    }>({
      pipeline: [
        { $sort: { [input.sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            commentId: '$_id',
            firstName: 1,
            lastName: 1,
            email: 1,
            pageUrl: 1,
            message: 1,
            createdAt: 1,
          },
        },
      ],
      page: input.page,
      limit: input.limit,
    });

    return {
      success: true,
      message: 'Comments fetched successfully',
      data: (result.data || []).map(item => ({
        commentId: String(item.commentId),
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        pageUrl: item.pageUrl,
        message: item.message,
        createdAt: item.createdAt,
      })),
      pagination: result.pagination,
    };
  }),

  getById: publicProcedure.input(getCommentByIdSchema).query(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid comment ID'));
    }
    const result = (await commentRepository.findById(input.id)) as any;
    if (!result) throw toTrpcError(AppError.notFound('Comment not found'));
    return {
      commentId: String(result._id),
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      pageUrl: result.pageUrl,
      message: result.message,
      createdAt: result.createdAt,
    };
  }),

  delete: publicProcedure.input(deleteCommentSchema).mutation(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid comment ID'));
    }
    await commentRepository.findByIdAndDelete(input.id);
    return { success: true, message: 'Comment deleted successfully' };
  }),
});
