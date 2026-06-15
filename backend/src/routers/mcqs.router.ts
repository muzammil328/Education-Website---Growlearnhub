import { z } from 'zod';
import { Types } from 'mongoose';
import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import {
  McqPayloadSchema,
  getMcqsInputSchema,
  getMcqDropdownInputSchema,
  getMcqByIdInputSchema,
  updateMcqInputSchema,
  deleteMcqInputSchema,
  mcqScopeSchema,
} from '@muzammil328/education-packages';
import { RoleEnum, McqScopeEnum } from '@muzammil328/education-packages/enums';
import Mcqs from '../models/mcqs.model';
import { createTRPCRouter, teacherProcedure, protectedProcedure } from '@/trpc/trpc';
import { resolveUserInstitutionId } from '@/trpc/lib/resolveInstitution';
import { getSearchWords } from '@/utils';

const SUPER_ADMIN_ROLES = new Set<string>([RoleEnum.SuperAdmin]);

// Match docs whose scope is 'global' OR is missing entirely (legacy data without
// the field). Mongoose default values apply only at write time, so existing
// documents created before the schema change still need to be visible.
const GLOBAL_SCOPE_MATCH = {
  $or: [{ scope: McqScopeEnum.GLOBAL }, { scope: { $exists: false } }],
};

async function institutionVisibilityFilter(ctx: {
  user: { userId: string; role: string } | null;
}): Promise<Record<string, unknown> | null> {
  if (!ctx.user) {
    return GLOBAL_SCOPE_MATCH;
  }
  if (SUPER_ADMIN_ROLES.has(ctx.user.role)) return null;
  const institutionId = await resolveUserInstitutionId(ctx.user.userId);
  if (!institutionId) return GLOBAL_SCOPE_MATCH;
  return {
    $or: [
      { scope: McqScopeEnum.GLOBAL },
      { scope: { $exists: false } },
      { scope: McqScopeEnum.INSTITUTION, institutionId: new Types.ObjectId(institutionId) },
    ],
  };
}

type UpdateMcqMutationInput = z.infer<typeof updateMcqInputSchema>;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) {
    return undefined;
  }
  return new Types.ObjectId(value);
}

export const mcqsRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getMcqsInputSchema).query(async ({ input, ctx }) => {
    const sortOrder: 1 | -1 = input.sortDirection === 'desc' ? -1 : 1;
    const match: Record<string, unknown> = {};

    const visibility = await institutionVisibilityFilter(ctx);
    if (visibility) Object.assign(match, visibility);

    if (input.status !== 'all') {
      match.status = input.status;
    }

    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);
    const headingId = parseObjectId(input.headingId);
    const subHeadingId = parseObjectId(input.subHeadingId);

    if (classId) match.classId = classId;
    if (bookId) match.bookId = bookId;
    if (chapterId) match.chapterId = chapterId;
    if (headingId) match.headingId = headingId;
    if (subHeadingId) match.subHeadingId = subHeadingId;
    if (input.difficulty) match.difficulty = input.difficulty;

    // Access control: Free users can't see premium MCQs
    const user = ctx.user;
    if (user?.subscriptionPlan === 'free' || !user?.subscriptionPlan) {
      match.isPremium = { $ne: true };
    }

    const offset = (input.page - 1) * input.limit;

    const data = await Mcqs.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classInfo',
        },
      },
      { $unwind: { path: '$classInfo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: { path: '$bookInfo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'chapters',
          localField: 'chapterId',
          foreignField: '_id',
          as: 'chapterInfo',
        },
      },
      { $unwind: { path: '$chapterInfo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'headings',
          localField: 'headingId',
          foreignField: '_id',
          as: 'headingInfo',
        },
      },
      { $unwind: { path: '$headingInfo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'subheadings',
          localField: 'subHeadingId',
          foreignField: '_id',
          as: 'subHeadingInfo',
        },
      },
      { $unwind: { path: '$subHeadingInfo', preserveNullAndEmptyArrays: true } },
      ...(input.search
        ? [
            {
              $match: {
                $and: getSearchWords(input.search).map(word => ({
                  $or: [
                    { question: { $regex: escapeRegex(word), $options: 'i' } },
                    { 'classInfo.name': { $regex: escapeRegex(word), $options: 'i' } },
                    { 'bookInfo.name': { $regex: escapeRegex(word), $options: 'i' } },
                    { 'chapterInfo.name': { $regex: escapeRegex(word), $options: 'i' } },
                    { 'headingInfo.name': { $regex: escapeRegex(word), $options: 'i' } },
                    { 'subHeadingInfo.name': { $regex: escapeRegex(word), $options: 'i' } },
                    { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$chapterInfo.order', ''] } }, regex: escapeRegex(word), options: 'i' } } },
                    { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$headingInfo.order', ''] } }, regex: escapeRegex(word), options: 'i' } } },
                    { $expr: { $regexMatch: { input: { $toString: { $ifNull: ['$subHeadingInfo.order', ''] } }, regex: escapeRegex(word), options: 'i' } } },
                  ],
                })),
              },
            },
          ]
        : []),
      {
        $facet: {
          data: [
            {
              $project: {
                _id: 0,
                mcqId: '$_id',
                question: 1,
                options: 1,
                correctOption: 1,
                explanation: 1,
                difficulty: 1,
                isPremium: 1,
                status: 1,
                classId: '$classInfo._id',
                className: '$classInfo.name',
                classSlug: '$classInfo.slug',
                bookId: '$bookInfo._id',
                bookName: '$bookInfo.name',
                bookSlug: '$bookInfo.slug',
                chapterId: '$chapterInfo._id',
                chapterName: '$chapterInfo.name',
                chapterSlug: '$chapterInfo.slug',
                headingId: '$headingInfo._id',
                headingName: '$headingInfo.name',
                headingSlug: '$headingInfo.slug',
                subHeadingId: '$subHeadingInfo._id',
                subHeadingName: '$subHeadingInfo.name',
                subHeadingSlug: '$subHeadingInfo.slug',
              },
            },
            { $sort: { [input.sort]: sortOrder } as Record<string, 1 | -1> },
            { $skip: offset },
            { $limit: input.limit },
          ],
          total: [{ $count: 'count' }],
        },
      },
    ]);

    const mcqs = data[0].data || [];
    const totalRecords = data[0].total[0]?.count || 0;
    const totalPages = Math.ceil(totalRecords / input.limit);

    return {
      success: true,
      message: 'Mcqs fetched successfully',
      data: mcqs.map((item: Record<string, unknown>) => ({
        mcqId: String(item.mcqId),
        question: item.question,
        options: item.options,
        correctOption: item.correctOption,
        explanation: item.explanation,
        difficulty: item.difficulty,
        isPremium: item.isPremium,
        status: item.status,
        classId: item.classId ? String(item.classId) : undefined,
        className: item.className,
        bookId: item.bookId ? String(item.bookId) : undefined,
        bookName: item.bookName,
        chapterId: item.chapterId ? String(item.chapterId) : undefined,
        chapterName: item.chapterName,
        headingId: item.headingId ? String(item.headingId) : undefined,
        headingName: item.headingName,
        subHeadingId: item.subHeadingId ? String(item.subHeadingId) : undefined,
        subHeadingName: item.subHeadingName,
      })),
      pagination: { totalRecords, totalPages, currentPage: input.page, pageSize: input.limit },
    };
  }),

  getDropdown: teacherProcedure.input(getMcqDropdownInputSchema).query(async ({ input, ctx }) => {
    const filter: Record<string, unknown> = {
      question: { $regex: escapeRegex(input.search || ''), $options: 'i' },
      status: 'active',
    };
    const visibility = await institutionVisibilityFilter(ctx);
    if (visibility) Object.assign(filter, visibility);

    const result = await Mcqs.find(filter).select('_id question').limit(10).lean();

    return (result as any[]).map(item => ({
      value: String(item._id),
      label: (item.question as string).substring(0, 50) + (item.question.length > 50 ? '...' : ''),
    }));
  }),

  getById: teacherProcedure.input(getMcqByIdInputSchema).query(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid MCQ ID format'));
    }

    const result = await Mcqs.findById(input.id).lean();

    if (!result) {
      throw toTrpcError(AppError.notFound('MCQ not found'));
    }

    return {
      mcqId: String(result._id),
      question: result.question,
      options: result.options,
      correctOption: result.correctOption,
      explanation: result.explanation,
      difficulty: result.difficulty,
      isPremium: result.isPremium,
      status: result.status,
      classId: result.classId ? String(result.classId) : undefined,
      bookId: result.bookId ? String(result.bookId) : undefined,
      chapterId: result.chapterId ? String(result.chapterId) : undefined,
      headingId: result.headingId ? String(result.headingId) : undefined,
      subHeadingId: result.subHeadingId ? String(result.subHeadingId) : undefined,
    };
  }),

  create: protectedProcedure
    .input(
      z.object({
        questions: z.array(McqPayloadSchema).min(1),
        classId: z.string().min(1),
        bookId: z.string().min(1),
        chapterId: z.string().min(1),
        headingId: z.string().optional(),
        subHeadingId: z.string().optional(),
        scope: mcqScopeSchema.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) {
        throw toTrpcError(AppError.unauthorized('Not authenticated'));
      }

      const classId = parseObjectId(input.classId);
      const bookId = parseObjectId(input.bookId);
      const chapterId = parseObjectId(input.chapterId);
      const headingId = parseObjectId(input.headingId);
      const subHeadingId = parseObjectId(input.subHeadingId);

      if (!classId || !bookId || !chapterId) {
        throw toTrpcError(AppError.badRequest('Class, book and chapter are required'));
      }

      const isSuperAdmin = SUPER_ADMIN_ROLES.has(user.role);
      const userInstitutionId = await resolveUserInstitutionId(user.userId);

      // Super-admin may pick scope; everyone else is forced to institution scope
      // and may only create MCQs for their own institution.
      let scope: string;
      let institutionId: Types.ObjectId | undefined;

      if (isSuperAdmin) {
        scope = input.scope ?? McqScopeEnum.GLOBAL;
        institutionId =
          scope === McqScopeEnum.INSTITUTION && userInstitutionId
            ? new Types.ObjectId(userInstitutionId)
            : undefined;
        if (scope === McqScopeEnum.INSTITUTION && !institutionId) {
          throw toTrpcError(AppError.badRequest('Institution-scoped MCQ requires an institution'));
        }
      } else {
        if (!userInstitutionId) {
          throw toTrpcError(AppError.forbidden('Account is not linked to an institution'));
        }
        scope = McqScopeEnum.INSTITUTION;
        institutionId = new Types.ObjectId(userInstitutionId);
      }

      // Find existing MCQs in the same scope (class, book, chapter, heading, subheading)
      // so we don't create duplicates with the same question text.
      const scopeFilter: Record<string, unknown> = { classId, bookId, chapterId };
      if (headingId) scopeFilter.headingId = headingId;
      if (subHeadingId) scopeFilter.subHeadingId = subHeadingId;

      const existing = await Mcqs.find(scopeFilter).select('question').lean();
      const existingQuestions = new Set(
        existing.map(e => (e.question as string).trim().toLowerCase())
      );

      const seen = new Set<string>();
      const mcqData = input.questions
        .filter(q => {
          const key = q.question.trim().toLowerCase();
          if (existingQuestions.has(key) || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map(q => ({
          name: q.question,
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation,
          difficulty: q.difficulty,
          status: q.status,
          isPremium: q.isPremium,
          classId,
          bookId,
          chapterId,
          headingId,
          subHeadingId,
          scope,
          institutionId,
        }));

      if (mcqData.length === 0) {
        throw toTrpcError(AppError.badRequest('All MCQs already exist in this scope'));
      }

      const created = await Mcqs.insertMany(mcqData, { ordered: false });

      return {
        success: true,
        message: 'MCQs created successfully',
        data: created.map((c: typeof Mcqs.prototype) => ({
          mcqId: String(c._id),
          question: c.question,
          status: c.status,
        })),
      };
    }),

  update: protectedProcedure.input(updateMcqInputSchema).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw toTrpcError(AppError.unauthorized('Not authenticated'));
    }

    const parsedInput = input as UpdateMcqMutationInput;
    if (!Types.ObjectId.isValid(parsedInput.id)) {
      throw toTrpcError(AppError.badRequest('Invalid MCQ ID format'));
    }

    const existing = await Mcqs.findById(parsedInput.id).select('scope institutionId').lean();
    if (!existing) throw toTrpcError(AppError.notFound('MCQ not found'));

    if (!SUPER_ADMIN_ROLES.has(user.role)) {
      const userInstitutionId = await resolveUserInstitutionId(user.userId);
      const mcqInstId = existing.institutionId ? String(existing.institutionId) : undefined;
      if (
        existing.scope !== McqScopeEnum.INSTITUTION ||
        !mcqInstId ||
        mcqInstId !== userInstitutionId
      ) {
        throw toTrpcError(AppError.forbidden('Cannot modify MCQs outside your institution'));
      }
    }

    const updateData: Record<string, unknown> = {};

    if (parsedInput.updates.question) updateData.question = parsedInput.updates.question;
    if (parsedInput.updates.options) updateData.options = parsedInput.updates.options;
    if (parsedInput.updates.correctOption !== undefined)
      updateData.correctOption = parsedInput.updates.correctOption;
    if (parsedInput.updates.explanation !== undefined)
      updateData.explanation = parsedInput.updates.explanation;
    if (parsedInput.updates.difficulty) updateData.difficulty = parsedInput.updates.difficulty;
    if (parsedInput.updates.status) updateData.status = parsedInput.updates.status;
    if (parsedInput.updates.isPremium !== undefined)
      updateData.isPremium = parsedInput.updates.isPremium;
    if (parsedInput.updates.classId)
      updateData.classId = parseObjectId(parsedInput.updates.classId);
    if (parsedInput.updates.bookId) updateData.bookId = parseObjectId(parsedInput.updates.bookId);
    if (parsedInput.updates.chapterId)
      updateData.chapterId = parseObjectId(parsedInput.updates.chapterId);
    if (parsedInput.updates.headingId)
      updateData.headingId = parseObjectId(parsedInput.updates.headingId);
    if (parsedInput.updates.subHeadingId)
      updateData.subHeadingId = parseObjectId(parsedInput.updates.subHeadingId);

    const updated = await Mcqs.findByIdAndUpdate(parsedInput.id, updateData, {
      new: true,
    }).lean();

    if (!updated) {
      throw toTrpcError(AppError.notFound('MCQ not found'));
    }

    return {
      success: true,
      message: 'MCQ updated successfully',
      data: {
        mcqId: String(updated._id),
        question: updated.question,
        status: updated.status,
      },
    };
  }),

  delete: protectedProcedure.input(deleteMcqInputSchema).mutation(async ({ input }) => {
    if (!Types.ObjectId.isValid(input.id)) {
      throw toTrpcError(AppError.badRequest('Invalid MCQ ID format'));
    }

    const deleted = await Mcqs.findByIdAndDelete(input.id).lean();

    if (!deleted) {
      throw toTrpcError(AppError.notFound('MCQ not found'));
    }

    return {
      success: true,
      message: 'MCQ deleted successfully',
    };
  }),
});
