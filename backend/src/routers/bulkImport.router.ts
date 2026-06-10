import { Types } from 'mongoose';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, superAdminProcedure, teacherProcedure } from '@/trpc/trpc';
import Mcqs from '@/models/mcqs.model';
import SubHeading from '@/models/subHeading.model';
import { DifficultyEnum, McqScopeEnum, StatusEnum } from '@muzammil328/education-packages/enums';

const mcqRowSchema = z.object({
  question: z.string().min(5).max(2000),
  options: z.array(z.string().min(1)).min(2).max(6),
  correctOption: z.number().int().min(0),
  explanation: z.string().max(2000).optional(),
  examinersNote: z.string().max(1000).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium'),
});

const bulkImportSchema = z.object({
  subHeadingId: z.string(),
  rows: z.array(mcqRowSchema).min(1).max(500),
  /** If true, validate only — don't insert */
  dryRun: z.boolean().optional().default(false),
});

export const bulkImportRouter = createTRPCRouter({
  /**
   * Validate and insert MCQ rows in bulk.
   * Teachers can import up to 100; super-admins up to 500.
   * Each row must pass Zod validation; invalid rows are returned as errors
   * rather than aborting the entire batch.
   */
  importMcqs: superAdminProcedure
    .input(bulkImportSchema)
    .mutation(async ({ input }) => {
      if (!Types.ObjectId.isValid(input.subHeadingId)) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid subHeadingId' });
      }

      const subHeading = await SubHeading.findById(input.subHeadingId)
        .select('_id classId bookId chapterId headingId')
        .lean() as null | Record<string, unknown>;

      if (!subHeading) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'SubHeading not found' });
      }

      const errors: Array<{ row: number; message: string }> = [];
      const valid: Array<Record<string, unknown>> = [];

      for (let i = 0; i < input.rows.length; i++) {
        const row = input.rows[i];
        if (row.correctOption >= row.options.length) {
          errors.push({ row: i + 1, message: `correctOption ${row.correctOption} out of range (${row.options.length} options)` });
          continue;
        }
        valid.push({
          subHeadingId: new Types.ObjectId(input.subHeadingId),
          classId: subHeading.classId,
          bookId: subHeading.bookId,
          chapterId: subHeading.chapterId,
          headingId: subHeading.headingId,
          question: row.question,
          options: row.options,
          correctOption: row.correctOption,
          explanation: row.explanation,
          examinersNote: row.examinersNote,
          difficulty: row.difficulty ?? DifficultyEnum.Medium,
          scope: McqScopeEnum.GLOBAL,
          status: StatusEnum.Active,
        });
      }

      if (input.dryRun) {
        return {
          dryRun: true,
          validCount: valid.length,
          errorCount: errors.length,
          errors,
          inserted: 0,
        };
      }

      let inserted = 0;
      if (valid.length > 0) {
        const result = await Mcqs.insertMany(valid, { ordered: false });
        inserted = result.length;
      }

      return {
        dryRun: false,
        validCount: valid.length,
        errorCount: errors.length,
        errors,
        inserted,
      };
    }),

  /** Teacher-scoped import — same logic but limited to 100 rows */
  importMcqsTeacher: teacherProcedure
    .input(bulkImportSchema.extend({ rows: z.array(mcqRowSchema).min(1).max(100) }))
    .mutation(async ({ input }) => {
      if (!Types.ObjectId.isValid(input.subHeadingId)) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid subHeadingId' });
      }

      const subHeading = await SubHeading.findById(input.subHeadingId)
        .select('_id classId bookId chapterId headingId')
        .lean() as null | Record<string, unknown>;

      if (!subHeading) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'SubHeading not found' });
      }

      const errors: Array<{ row: number; message: string }> = [];
      const valid: Array<Record<string, unknown>> = [];

      for (let i = 0; i < input.rows.length; i++) {
        const row = input.rows[i];
        if (row.correctOption >= row.options.length) {
          errors.push({ row: i + 1, message: `correctOption ${row.correctOption} out of range` });
          continue;
        }
        valid.push({
          subHeadingId: new Types.ObjectId(input.subHeadingId),
          classId: subHeading.classId,
          bookId: subHeading.bookId,
          chapterId: subHeading.chapterId,
          headingId: subHeading.headingId,
          question: row.question,
          options: row.options,
          correctOption: row.correctOption,
          explanation: row.explanation,
          examinersNote: row.examinersNote,
          difficulty: row.difficulty ?? DifficultyEnum.Medium,
          scope: McqScopeEnum.GLOBAL,
          status: StatusEnum.Active,
        });
      }

      if (input.dryRun) {
        return { dryRun: true, validCount: valid.length, errorCount: errors.length, errors, inserted: 0 };
      }

      let inserted = 0;
      if (valid.length > 0) {
        const result = await Mcqs.insertMany(valid, { ordered: false });
        inserted = result.length;
      }

      return { dryRun: false, validCount: valid.length, errorCount: errors.length, errors, inserted };
    }),
});
