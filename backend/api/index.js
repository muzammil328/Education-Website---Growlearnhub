var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/models/userProgress.model.ts
var userProgress_model_exports = {};
__export(userProgress_model_exports, {
  default: () => userProgress_model_default
});
import mongoose15, { Schema as Schema14 } from "mongoose";
var UserProgressSchema, userProgress_model_default;
var init_userProgress_model = __esm({
  "src/models/userProgress.model.ts"() {
    "use strict";
    UserProgressSchema = new Schema14(
      {
        user: { type: Schema14.Types.ObjectId, ref: "User", required: true },
        classId: { type: Schema14.Types.ObjectId, ref: "Class" },
        bookId: { type: Schema14.Types.ObjectId, ref: "Book" },
        chapterId: { type: Schema14.Types.ObjectId, ref: "Chapter", required: true },
        headingId: { type: Schema14.Types.ObjectId, ref: "Heading" },
        subHeadingId: { type: Schema14.Types.ObjectId, ref: "SubHeading" },
        correct: { type: Number, default: 0 },
        incorrect: { type: Number, default: 0 },
        masteryScore: { type: Number, default: 0 },
        lastAttempt: { type: Date },
        masteryBand: { type: String, enum: ["weak", "developing", "strong"], default: "weak" },
        currentDifficultyBand: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
        nextReviewAt: { type: Date },
        spacedRepetitionInterval: { type: Number, default: 1 },
        retryCount: { type: Number, default: 0 },
        confidentMistakeCount: { type: Number, default: 0 },
        openLoopCount: { type: Number, default: 0 },
        totalAttempts: { type: Number, default: 0 }
      },
      { timestamps: true }
    );
    UserProgressSchema.index({ user: 1, chapterId: 1 });
    UserProgressSchema.index({ user: 1, headingId: 1 });
    UserProgressSchema.index({ user: 1, subHeadingId: 1 });
    UserProgressSchema.index({ user: 1, bookId: 1, masteryBand: 1 });
    userProgress_model_default = mongoose15.model("UserProgress", UserProgressSchema);
  }
});

// src/core/servers/express.ts
import cookieParser from "cookie-parser";
import cors from "cors";

// src/core/servers/routes.ts
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { StatusCode as StatusCode3 } from "@muzammil328/types";

// src/trpc/trpc.ts
import { initTRPC } from "@trpc/server";
import { TRPCError, loggerMiddleware, toTrpcError, mergeRouters } from "@muzammil328/trpc";

// ../packages/src/enums/index.ts
var RoleEnum = {
  Student: "student",
  Teacher: "teacher",
  SuperAdmin: "super_admin",
  Guest: "guest"
};
var InstitutionTypeEnum = {
  SCHOOL: "school",
  COLLEGE: "college",
  COACHING_CENTER: "coaching_center"
};
var OtpPurposeEnum = {
  EMAIL_VERIFICATION: "email_verification",
  PASSWORD_RESET: "password_reset"
};
var McqScopeEnum = {
  GLOBAL: "global",
  INSTITUTION: "institution"
};
var DifficultyEnum = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard"
};
var StatusEnum = {
  Active: "active",
  Inactive: "inactive"
};
var SubscriptionPlanEnum = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise"
};
var PaymentTypeEnum = {
  Subscription: "subscription",
  OneTime: "one-time",
  Institution: "institution"
};
var PaymentStatusEnum = {
  Pending: "pending",
  Completed: "completed",
  Failed: "failed",
  Refunded: "refunded"
};
var FeedbackTypeEnum = {
  Contact: "contact",
  BugReport: "bug-report",
  FeatureRequest: "feature-request",
  ShareStory: "share-story"
};
var FeedbackStatusEnum = {
  Pending: "pending",
  Resolved: "resolved",
  Rejected: "rejected"
};

// src/trpc/trpc.ts
var t = initTRPC.context().create();
var createTRPCRouter = t.router;
var publicProcedure = t.procedure.use(loggerMiddleware);
var isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(isAuthed).use(loggerMiddleware);
var hasRole = (allowedRoles) => t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  if (!allowedRoles.includes(ctx.user.role)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Insufficient permissions"
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var SUPER_ADMIN_ROLES = [RoleEnum.SuperAdmin];
var TEACHER_ROLES = [RoleEnum.Teacher, RoleEnum.SuperAdmin];
var STUDENT_ROLES = [RoleEnum.Student, RoleEnum.Guest];
var superAdminProcedure = protectedProcedure.use(
  hasRole(SUPER_ADMIN_ROLES)
);
var teacherProcedure = protectedProcedure.use(hasRole(TEACHER_ROLES));
var studentProcedure = protectedProcedure.use(hasRole(STUDENT_ROLES));

// src/routers/auth.router.ts
import { AppError as AppError3 } from "@muzammil328/server";
import { toTrpcError as toTrpcError2 } from "@muzammil328/trpc";
import { StatusCode } from "@muzammil328/types";
import { Types as Types5 } from "mongoose";
import { z as z18 } from "zod";

// ../packages/src/schemas/auth.schema.ts
import { z } from "zod";
var registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});
var loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});
var otpVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(4).max(8)
});
var forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address")
});
var forgotPasswordOtpVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(4).max(8)
});
var resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});
var updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional()
});

// ../packages/src/schemas/comment.schema.ts
import { z as z2 } from "zod";
var createCommentSchema = z2.object({
  firstName: z2.string().min(1, "First name is required"),
  lastName: z2.string().min(1, "Last name is required"),
  email: z2.string().email("Invalid email address"),
  pageUrl: z2.string().optional(),
  message: z2.string().min(1, "Message is required")
});
var getCommentsSchema = z2.object({
  page: z2.number().int().positive().optional().default(1),
  limit: z2.number().int().positive().max(100).optional().default(10),
  sort: z2.enum(["createdAt"]).optional().default("createdAt"),
  sortDirection: z2.enum(["asc", "desc"]).optional().default("desc")
});
var getCommentByIdSchema = z2.object({
  id: z2.string().min(1)
});
var deleteCommentSchema = z2.object({
  id: z2.string().min(1)
});

// ../packages/src/schemas/board.schema.ts
import { z as z3 } from "zod";
var boardCreateSchema = z3.object({
  name: z3.string().trim().min(1),
  slug: z3.string().trim().optional(),
  classId: z3.array(z3.string().trim().min(1)).default([]),
  description: z3.string().trim().optional().default(""),
  status: z3.nativeEnum(StatusEnum).default(StatusEnum.Active)
});
var getBoardsInputSchema = z3.object({
  status: z3.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z3.number().int().positive().optional().default(1),
  limit: z3.number().int().positive().max(100).optional().default(10),
  sort: z3.enum(["name", "status", "createdAt", "updatedAt"]).optional().default("createdAt"),
  sortDirection: z3.enum(["asc", "desc"]).optional().default("desc"),
  search: z3.string().trim().optional()
});
var getBoardDropdownInputSchema = z3.object({
  classId: z3.string().trim().optional()
});
var getBoardByIdInputSchema = z3.object({
  id: z3.string().min(1)
});
var getBoardBySlugInputSchema = z3.object({
  classSlug: z3.string().min(1)
});
var deleteBoardInputSchema = z3.object({
  id: z3.string().min(1)
});
var updateBoardInputSchema = z3.object({
  id: z3.string().min(1),
  updates: boardCreateSchema.partial()
});

// ../packages/src/schemas/classGroup.schema.ts
import { z as z4 } from "zod";
var ClassGroupSchema = z4.object({
  name: z4.string().min(1),
  classIds: z4.array(z4.string()).optional()
});
var AddStudentsToClassGroupSchema = z4.object({
  groupId: z4.string(),
  studentIds: z4.array(z4.string())
});
var GetClassGroupDetailsSchema = z4.object({
  groupId: z4.string()
});

// ../packages/src/schemas/book.schema.ts
import { z as z5 } from "zod";
import { objectIdSchema } from "@muzammil328/types";
var componentSchema = z5.object({
  title: z5.string().trim().min(1),
  weight: z5.number(),
  description: z5.string().trim().optional()
});
var bookCreateSchema = z5.object({
  name: z5.string().trim().min(1),
  slug: z5.string().trim().optional(),
  code: z5.string().trim().min(1),
  classId: z5.string().trim().min(1),
  serviceId: z5.array(objectIdSchema).optional(),
  description: z5.string().trim().optional().default(""),
  status: z5.nativeEnum(StatusEnum).default(StatusEnum.Active),
  creditHours: z5.number().optional(),
  fileId: z5.string().trim().optional(),
  pages: z5.number().optional(),
  image: z5.string().trim().optional(),
  order: z5.number().optional(),
  totalWeight: z5.number().optional(),
  components: z5.array(componentSchema).default([])
});
var getBooksInputSchema = z5.object({
  status: z5.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z5.number().int().positive().optional().default(1),
  limit: z5.number().int().positive().max(100).optional().default(10),
  sort: z5.enum(["name", "status", "createdAt", "className"]).optional().default("createdAt"),
  sortDirection: z5.enum(["asc", "desc"]).optional().default("desc"),
  search: z5.string().trim().optional()
});
var deleteBookInputSchema = z5.object({
  id: objectIdSchema
});
var getBookByIdInputSchema = z5.object({
  id: objectIdSchema
});
var updateBookInputSchema = z5.object({
  id: objectIdSchema,
  updates: bookCreateSchema
});
var getBookDropdownInputSchema = z5.object({
  classId: objectIdSchema.optional()
}).default({});
var getBookBySlugInputSchema = z5.object({
  classSlug: z5.string().min(1),
  serviceSlug: z5.string().trim().optional()
});

// ../packages/src/schemas/chapter.schema.ts
import { z as z6 } from "zod";
var chapterCreateSchema = z6.object({
  name: z6.string().trim().min(1),
  slug: z6.string().trim().optional(),
  classId: z6.string().trim().min(1),
  bookId: z6.string().trim().min(1),
  description: z6.string().trim().optional().default(""),
  content: z6.string().trim().optional().default(""),
  status: z6.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z6.number().optional()
});
var getChaptersInputSchema = z6.object({
  status: z6.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z6.number().int().positive().optional().default(1),
  limit: z6.number().int().positive().max(100).optional().default(10),
  sort: z6.enum(["name", "status", "createdAt", "order", "className", "bookName"]).optional().default("createdAt"),
  sortDirection: z6.enum(["asc", "desc"]).optional().default("desc"),
  search: z6.string().trim().optional()
});
var getChapterDropdownInputSchema = z6.object({
  classId: z6.string().optional(),
  bookId: z6.string().optional()
});
var getChapterByIdInputSchema = z6.object({
  id: z6.string().min(1)
});
var getChapterBySlugInputSchema = z6.object({
  classSlug: z6.string().min(1),
  bookSlug: z6.string().min(1).optional()
});
var deleteChapterInputSchema = z6.object({
  id: z6.string().min(1)
});
var updateChapterInputSchema = z6.object({
  id: z6.string().min(1),
  updates: chapterCreateSchema
});

// ../packages/src/schemas/class.schema.ts
import { z as z7 } from "zod";
var classCreateSchema = z7.object({
  name: z7.string().trim().min(1),
  description: z7.string().trim().default(""),
  serviceIds: z7.array(z7.string().trim().min(1)).default([]),
  status: z7.nativeEnum(StatusEnum).default(StatusEnum.Active),
  image: z7.string().trim().default(""),
  keywords: z7.array(z7.string().trim().min(1)).default([])
});
var getClassesInputSchema = z7.object({
  status: z7.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z7.number().int().positive().optional().default(1),
  limit: z7.number().int().positive().max(100).optional().default(10),
  sort: z7.enum(["name", "status", "createdAt"]).optional().default("createdAt"),
  sortDirection: z7.enum(["asc", "desc"]).optional().default("desc"),
  search: z7.string().trim().optional()
});
var dropdownClassInputSchema = z7.object({
  serviceId: z7.string().min(1).optional()
}).default({});
var getClassByIdInputSchema = z7.object({
  id: z7.string().min(1)
});
var getClassByServiceSlugInputSchema = z7.object({
  serviceSlug: z7.string().min(1)
});
var deleteClassInputSchema = z7.object({
  id: z7.string().min(1)
});
var updateClassInputSchema = z7.object({
  id: z7.string().min(1),
  updates: classCreateSchema
});

// ../packages/src/schemas/feedback.schema.ts
import { z as z8 } from "zod";
var feedbackTypeSchema = z8.enum(["contact", "bug-report", "feature-request", "share-story"]);
var feedbackStatusSchema = z8.enum(["pending", "resolved", "rejected"]);
var createFeedbackSchema = z8.object({
  name: z8.string().min(1),
  email: z8.string().email(),
  phone: z8.string().optional(),
  message: z8.string().min(1),
  type: feedbackTypeSchema
});
var feedbackResponseSchema = z8.object({
  id: z8.string(),
  name: z8.string(),
  email: z8.string().email(),
  phone: z8.string().optional(),
  message: z8.string(),
  type: feedbackTypeSchema,
  status: feedbackStatusSchema,
  createdAt: z8.date(),
  updatedAt: z8.date().optional()
});
var getFeedbackInputSchema = z8.object({
  type: feedbackTypeSchema.optional(),
  status: feedbackStatusSchema.optional(),
  page: z8.number().int().positive().optional().default(1),
  limit: z8.number().int().positive().max(100).optional().default(10),
  sort: z8.enum(["createdAt", "status"]).optional().default("createdAt"),
  sortDirection: z8.enum(["asc", "desc"]).optional().default("desc")
});
var updateFeedbackStatusSchema = z8.object({
  id: z8.string().min(1),
  status: feedbackStatusSchema
});
var getFeedbackByIdInputSchema = z8.object({
  id: z8.string()
});

// ../packages/src/schemas/heading.schema.ts
import { z as z9 } from "zod";
var headingCreateSchema = z9.object({
  name: z9.string().trim().min(1),
  slug: z9.string().trim().optional(),
  classId: z9.string().trim().min(1),
  bookId: z9.string().trim().min(1),
  chapterId: z9.string().trim().min(1),
  status: z9.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z9.number().optional()
});
var getHeadingsInputSchema = z9.object({
  status: z9.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z9.number().int().positive().optional().default(1),
  limit: z9.number().int().positive().max(100).optional().default(10),
  sort: z9.enum(["name", "status", "createdAt", "updatedAt", "order", "className", "bookName", "chapterName"]).optional().default("createdAt"),
  sortDirection: z9.enum(["asc", "desc"]).optional().default("desc"),
  search: z9.string().trim().optional()
});
var getHeadingDropdownInputSchema = z9.object({
  classId: z9.string().optional(),
  bookId: z9.string().optional(),
  chapterId: z9.string().optional()
});
var getHeadingByIdInputSchema = z9.object({
  id: z9.string().min(1)
});
var getHeadingBySlugInputSchema = z9.object({
  classSlug: z9.string().min(1),
  bookSlug: z9.string().min(1),
  chapterSlug: z9.string().min(1)
});
var deleteHeadingInputSchema = z9.object({
  id: z9.string().min(1)
});
var updateHeadingInputSchema = z9.object({
  id: z9.string().min(1),
  updates: headingCreateSchema
});

// ../packages/src/schemas/institution.schema.ts
import { z as z10 } from "zod";
var InstitutionSchema = z10.object({
  name: z10.string().min(2),
  code: z10.string().min(2).max(32),
  slug: z10.string().min(2).regex(/^[a-z0-9-]+$/).optional(),
  contactEmail: z10.string().email().optional(),
  address: z10.string().optional(),
  status: z10.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  ownerUserId: z10.string().optional()
});
var getInstitutionsInputSchema = z10.object({
  status: z10.union([z10.nativeEnum(StatusEnum), z10.literal("all")]).optional().default("active"),
  page: z10.number().int().positive().optional().default(1),
  limit: z10.number().int().positive().max(100).optional().default(10),
  sort: z10.enum(["name", "code", "status", "createdAt", "updatedAt"]).optional().default("name"),
  sortDirection: z10.enum(["asc", "desc"]).optional().default("asc"),
  search: z10.string().trim().optional()
});
var getInstitutionByIdInputSchema = z10.object({
  id: z10.string().min(1)
});
var updateInstitutionInputSchema = z10.object({
  id: z10.string().min(1),
  updates: InstitutionSchema.partial()
});
var updateInstitutionSubscriptionSchema = z10.object({
  id: z10.string().min(1),
  updates: InstitutionSchema.partial()
});
var deleteInstitutionInputSchema = z10.object({
  id: z10.string().min(1)
});

// ../packages/src/schemas/mcqs.schema.ts
import { z as z11 } from "zod";
var statusSchema = z11.nativeEnum(StatusEnum).default(StatusEnum.Active);
var mcqOptionSchema = z11.string().trim().min(1);
var mcqQuestionSchema = z11.object({
  question: z11.string().trim().min(1),
  options: z11.array(mcqOptionSchema).min(2),
  correctOption: z11.number().int().nonnegative(),
  explanation: z11.string().trim().optional().default(""),
  difficulty: z11.nativeEnum(DifficultyEnum).default(DifficultyEnum.Medium),
  status: statusSchema,
  classId: z11.string().trim().optional(),
  bookId: z11.string().trim().optional(),
  chapterId: z11.string().trim().optional(),
  headingId: z11.string().trim().optional(),
  subHeadingId: z11.string().trim().optional(),
  isPremium: z11.boolean().default(false)
});
var mcqsSchema = z11.object({
  questions: z11.array(mcqQuestionSchema).min(1)
});
var McqPayloadSchema = mcqQuestionSchema;
var getMcqsInputSchema = z11.object({
  status: z11.union([z11.nativeEnum(StatusEnum), z11.literal("all")]).optional().default("active"),
  page: z11.number().int().positive().optional().default(1),
  limit: z11.number().int().positive().max(100).optional().default(10),
  sort: z11.enum(["question", "status", "createdAt", "updatedAt", "difficulty"]).optional().default("question"),
  sortDirection: z11.enum(["asc", "desc"]).optional().default("asc"),
  search: z11.string().trim().optional(),
  classId: z11.string().optional(),
  bookId: z11.string().optional(),
  chapterId: z11.string().optional(),
  headingId: z11.string().optional(),
  subHeadingId: z11.string().optional(),
  difficulty: z11.nativeEnum(DifficultyEnum).optional()
});
var getMcqDropdownInputSchema = z11.object({
  search: z11.string().trim().optional()
});
var getMcqByIdInputSchema = z11.object({
  id: z11.string().min(1)
});
var updateMcqInputSchema = z11.object({
  id: z11.string().min(1),
  updates: McqPayloadSchema.partial()
});
var deleteMcqInputSchema = z11.object({
  id: z11.string().min(1)
});
var mcqScopeSchema = z11.enum(["global", "institution"]);
var createMcqsSchema = z11.object({
  questions: z11.array(mcqQuestionSchema).min(1),
  classId: z11.string().min(1),
  bookId: z11.string().min(1),
  chapterId: z11.string().min(1),
  headingId: z11.string().optional(),
  subHeadingId: z11.string().optional(),
  scope: mcqScopeSchema.optional()
});

// ../packages/src/schemas/payment.schema.ts
import { z as z12 } from "zod";
var paymentPayloadSchema = z12.object({
  amount: z12.number().positive(),
  currency: z12.string().length(3),
  type: z12.enum(["subscription", "one-time", "institution"]),
  status: z12.enum(["pending", "completed", "failed", "refunded"]),
  user: z12.string().optional(),
  // ObjectId as string
  classGroup: z12.string().optional(),
  // ObjectId as string
  startDate: z12.date().optional(),
  endDate: z12.date().optional(),
  transactionId: z12.string().optional(),
  provider: z12.string().optional()
});

// ../packages/src/schemas/service.schema.ts
import { z as z13 } from "zod";
var serviceCreateSchema = z13.object({
  name: z13.string().trim().min(1),
  slug: z13.string().trim().optional(),
  code: z13.string().trim().optional(),
  description: z13.string().trim().optional().default(""),
  icon: z13.string().trim().optional(),
  keywords: z13.array(z13.string().trim().min(1)).default([]),
  status: z13.nativeEnum(StatusEnum).default(StatusEnum.Active),
  order: z13.number().optional(),
  classId: z13.array(z13.string()).optional(),
  serviceId: z13.array(z13.string()).optional(),
  image: z13.string().trim().optional(),
  creditHours: z13.number().optional(),
  fileId: z13.string().trim().optional(),
  pages: z13.number().optional(),
  totalWeight: z13.number().optional(),
  components: z13.array(z13.any()).optional()
});
var getServicesInputSchema = z13.object({
  status: z13.nativeEnum(StatusEnum).default(StatusEnum.Active),
  page: z13.number().int().positive().optional().default(1),
  limit: z13.number().int().positive().max(100).optional().default(10),
  sort: z13.enum(["name", "status", "createdAt", "updatedAt"]).optional().default("createdAt"),
  sortDirection: z13.enum(["asc", "desc"]).optional().default("desc"),
  search: z13.string().trim().optional(),
  className: z13.string().trim().optional()
});
var getServiceDropdownInputSchema = z13.object({
  search: z13.string().trim().optional(),
  classId: z13.string().optional()
}).optional().default({});
var getServiceBySlugInputSchema = z13.object({
  classSlug: z13.string().min(1)
});
var getServiceByIdInputSchema = z13.object({
  id: z13.string().min(1)
});
var updateServiceInputSchema = z13.object({
  id: z13.string().min(1),
  updates: serviceCreateSchema
});
var deleteServiceInputSchema = z13.object({
  id: z13.string().min(1)
});

// ../packages/src/schemas/student.schema.ts
import { z as z14 } from "zod";
var studentSchema = z14.object({
  username: z14.string().min(3),
  email: z14.string().email(),
  password: z14.string().min(8)
});
var addStudentsSchema = z14.object({
  students: z14.array(studentSchema).min(1).max(100)
});
var getStudentsInputSchema = z14.object({
  page: z14.number().optional().default(1),
  limit: z14.number().optional().default(10),
  search: z14.string().optional()
});
var deleteStudentInputSchema = z14.object({
  id: z14.string().min(1)
});
var addStudentsToClassGroupSchema = z14.object({
  groupId: z14.string(),
  studentIds: z14.array(z14.string())
});
var getClassGroupDetailsSchema = z14.object({
  groupId: z14.string()
});

// ../packages/src/schemas/subHeading.schema.ts
import { z as z15 } from "zod";
var statusSchema2 = z15.nativeEnum(StatusEnum).default(StatusEnum.Active);
var subHeadingCreateSchema = z15.object({
  name: z15.string().trim().min(1),
  slug: z15.string().trim().optional(),
  code: z15.string().optional(),
  classId: z15.string().trim().min(1),
  bookId: z15.string().trim().min(1),
  chapterId: z15.string().trim().min(1),
  headingId: z15.string().trim().min(1),
  serviceId: z15.array(z15.string()).optional(),
  description: z15.string().trim().optional().default(""),
  creditHours: z15.number().optional(),
  fileId: z15.string().trim().optional(),
  pages: z15.number().optional(),
  image: z15.string().trim().optional(),
  content: z15.string().trim().optional().default(""),
  totalWeight: z15.number().optional(),
  components: z15.array(z15.any()).optional(),
  status: statusSchema2,
  order: z15.number().optional()
});
var getSubHeadingsInputSchema = z15.object({
  status: z15.nativeEnum(StatusEnum).optional().default(StatusEnum.Active),
  page: z15.number().int().positive().optional().default(1),
  limit: z15.number().int().positive().max(100).optional().default(10),
  sort: z15.enum(["name", "status", "createdAt", "updatedAt", "order"]).optional().default("createdAt"),
  sortDirection: z15.enum(["asc", "desc"]).optional().default("desc"),
  search: z15.string().trim().optional(),
  classId: z15.string().optional(),
  bookId: z15.string().optional(),
  chapterId: z15.string().optional(),
  headingId: z15.string().optional()
});
var getSubHeadingDropdownInputSchema = z15.object({
  classId: z15.string().optional(),
  bookId: z15.string().optional(),
  chapterId: z15.string().optional(),
  headingId: z15.string().optional()
});
var getSubHeadingBySlugInputSchema = z15.object({
  classSlug: z15.string().min(1),
  bookSlug: z15.string().min(1),
  chapterSlug: z15.string().min(1),
  headingSlug: z15.string().min(1)
});
var getSubHeadingByIdInputSchema = z15.object({
  id: z15.string().min(1)
});
var deleteSubHeadingInputSchema = z15.object({
  id: z15.string().min(1)
});
var updateSubHeadingInputSchema = z15.object({
  id: z15.string().min(1),
  updates: subHeadingCreateSchema
});

// ../packages/src/schemas/user.schema.ts
import { z as z16 } from "zod";
var loginFormSchema = z16.object({
  email: z16.string().trim().email(),
  password: z16.string().min(8)
});
var registerFormSchema = z16.object({
  username: z16.string().trim().min(1),
  email: z16.string().trim().email(),
  password: z16.string().min(8)
});
var otpVerificationFormSchema = z16.object({
  email: z16.string().trim().email(),
  otp: z16.string().trim().min(4).max(8)
});
var forgotPasswordFormSchema = z16.object({
  email: z16.string().trim().email()
});
var otpForgotPasswordFormSchema = z16.object({
  email: z16.string().trim().email(),
  otp: z16.string().trim().min(4).max(8)
});
var resetPasswordFormSchema = z16.object({
  password: z16.string().min(8),
  confirmPassword: z16.string().min(8)
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// ../packages/src/constants/languages.ts
var LANGUAGES = [
  { label: "English", value: "en", flag: "\u{1F1FA}\u{1F1F8}", direction: "ltr" },
  { label: "Spanish", value: "es", flag: "\u{1F1EA}\u{1F1F8}", direction: "ltr" },
  { label: "French", value: "fr", flag: "\u{1F1EB}\u{1F1F7}", direction: "ltr" },
  { label: "German", value: "de", flag: "\u{1F1E9}\u{1F1EA}", direction: "ltr" },
  { label: "Italian", value: "it", flag: "\u{1F1EE}\u{1F1F9}", direction: "ltr" },
  { label: "Portuguese", value: "pt", flag: "\u{1F1F5}\u{1F1F9}", direction: "ltr" },
  { label: "Japanese", value: "ja", flag: "\u{1F1EF}\u{1F1F5}", direction: "ltr" },
  { label: "Korean", value: "ko", flag: "\u{1F1F0}\u{1F1F7}", direction: "ltr" },
  { label: "Chinese (Simplified)", value: "zh", flag: "\u{1F1E8}\u{1F1F3}", direction: "ltr" },
  { label: "Arabic", value: "ar", flag: "\u{1F1F8}\u{1F1E6}", direction: "rtl" }
];
var languageOptions = LANGUAGES.map(({ label, value }) => ({
  label,
  value
}));

// ../packages/src/constants/time.ts
var THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1e3;
var THIRTY_DAYS_S = 60 * 60 * 24 * 30;
var NINETY_DAYS_S = 60 * 60 * 24 * 90;
var ONE_HOUR_MS = 60 * 60 * 1e3;

// ../packages/src/helpers/pricing.helper.ts
var FREE_PLAN = {
  id: "free",
  variantId: "1701464",
  billingModel: "flat",
  tier: "free",
  name: "Freemium",
  price: 0,
  yearlyPrice: 0,
  responses: 100,
  users: 1,
  popular: false,
  features: [
    "Free forever",
    "100 responses/month",
    "1 form",
    "Basic features",
    "Upgrade anytime"
  ]
};
var FLAT_PLANS = [
  {
    id: "flat-basic",
    variantId: "",
    billingModel: "flat",
    tier: "basic",
    name: "Basic",
    price: 15,
    yearlyPrice: 12,
    responses: 250,
    users: 5,
    popular: false,
    features: [
      "Up to 5 forms",
      "250 responses/month",
      "Basic analytics",
      "Email support",
      "5 team members"
    ]
  },
  {
    id: "flat-pro",
    variantId: "",
    billingModel: "flat",
    tier: "pro",
    name: "Pro",
    price: 29,
    yearlyPrice: 23,
    responses: 1e3,
    users: 10,
    popular: true,
    features: [
      "Up to 30 forms",
      "1,000 responses/month",
      "Advanced analytics",
      "Email support",
      "10 team members"
    ]
  },
  {
    id: "flat-business",
    variantId: "",
    billingModel: "flat",
    tier: "business",
    name: "Business",
    price: 99,
    yearlyPrice: 79,
    responses: 1e4,
    users: Infinity,
    popular: false,
    features: [
      "Unlimited forms",
      "10,000 responses/month",
      "Integrations",
      "Priority support",
      "Unlimited team members"
    ]
  },
  {
    id: "flat-enterprise",
    variantId: "",
    billingModel: "flat",
    tier: "enterprise",
    name: "Enterprise",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      "Unlimited everything",
      "Custom SLAs",
      "Priority support",
      "Dedicated account manager",
      "Custom integrations"
    ]
  }
];
var USAGE_PLANS = [
  {
    id: "usage-basic",
    variantId: "1701464",
    billingModel: "usage",
    tier: "basic",
    name: "Basic",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 5,
    popular: false,
    features: [
      "Pay only for what you use",
      "$0.10 per response",
      "Up to 5 forms",
      "Email support",
      "5 team members"
    ]
  },
  {
    id: "usage-pro",
    variantId: "",
    billingModel: "usage",
    tier: "pro",
    name: "Pro",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 10,
    popular: true,
    features: [
      "Pay only for what you use",
      "$0.08 per response",
      "Up to 30 forms",
      "Advanced analytics",
      "10 team members"
    ]
  },
  {
    id: "usage-business",
    variantId: "",
    billingModel: "usage",
    tier: "business",
    name: "Business",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      "Pay only for what you use",
      "$0.05 per response",
      "Unlimited forms",
      "Priority support",
      "Unlimited team members"
    ]
  },
  {
    id: "usage-enterprise",
    variantId: "",
    billingModel: "usage",
    tier: "enterprise",
    name: "Enterprise",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      "Custom per-response rate",
      "Unlimited forms",
      "Dedicated account manager",
      "Custom SLAs",
      "Custom integrations"
    ]
  }
];
var DYNAMIC_PLANS = [
  {
    id: "dynamic-basic",
    variantId: "",
    billingModel: "dynamic",
    tier: "basic",
    name: "Basic",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 5,
    popular: false,
    features: [
      "Dynamic pricing based on demand",
      "Lower rates during off-peak",
      "Up to 5 forms",
      "Email support",
      "5 team members"
    ]
  },
  {
    id: "dynamic-pro",
    variantId: "",
    billingModel: "dynamic",
    tier: "pro",
    name: "Pro",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 10,
    popular: true,
    features: [
      "Dynamic pricing based on demand",
      "Lower rates during off-peak",
      "Up to 30 forms",
      "Advanced analytics",
      "10 team members"
    ]
  },
  {
    id: "dynamic-business",
    variantId: "",
    billingModel: "dynamic",
    tier: "business",
    name: "Business",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      "Dynamic pricing based on demand",
      "Best off-peak rates",
      "Unlimited forms",
      "Priority support",
      "Unlimited team members"
    ]
  },
  {
    id: "dynamic-enterprise",
    variantId: "",
    billingModel: "dynamic",
    tier: "enterprise",
    name: "Enterprise",
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      "Custom dynamic rate",
      "Guaranteed off-peak pricing",
      "Unlimited forms",
      "Dedicated account manager",
      "Custom integrations"
    ]
  }
];
var ALL_PLANS = [
  FREE_PLAN,
  ...FLAT_PLANS,
  ...USAGE_PLANS,
  ...DYNAMIC_PLANS
];
var PLAN_MAP = ALL_PLANS.reduce((acc, plan) => {
  acc[plan.id] = plan;
  return acc;
}, {});

// ../packages/src/config/env.config.ts
var APP_NAME = "GrowLearnHub";
var APP_DOMAIN = "growlearnhub.com";
var APP_URL = `https://${APP_DOMAIN}`;
var APP_HANDLE = "growlearnhub";
var SUPPORT_EMAIL = `support@${APP_DOMAIN}`;
var CONTACT_EMAIL = `contact@${APP_DOMAIN}`;
var PRIVACY_EMAIL = `privacy@${APP_DOMAIN}`;
var ABUSE_EMAIL = `abuse@${APP_DOMAIN}`;
var COMPANY_NAME = `${APP_NAME}`;
var THEME_COLOR = "#3b82f6";
var THEME_DARK = "#1e3a5f";
var VERSION = "1.0.0";
var FOUNDED_YEAR = 2024;
var DEFAULT_LOCALE = "en_US";
var DEFAULT_LANG = "en";
var APP_CONFIG = {
  // ── Identity ─────────────────────────────────────────────────────────────
  name: APP_NAME,
  shortName: "GrowLearn",
  version: VERSION,
  foundedYear: FOUNDED_YEAR,
  company: COMPANY_NAME,
  tagline: "Your Ultimate Resource for Classes 9\u201312 & Virtual University",
  title: `${APP_NAME} - Your Ultimate Resource for Classes 9\u201312 & Virtual University`,
  description: `${APP_NAME} is a comprehensive educational platform providing books, notes, MCQs, past papers, online tests, and pairing schemes for Pakistani students in classes 9\u201312 and Virtual University.`,
  shortDescription: `Books, notes, MCQs, past papers & more for Pakistani students.`,
  // ── Theme ─────────────────────────────────────────────────────────────────
  theme: {
    primary: THEME_COLOR,
    dark: THEME_DARK,
    background: "#ffffff"
  },
  themeColor: THEME_COLOR,
  // ── URLs ──────────────────────────────────────────────────────────────────
  url: APP_URL,
  canonical: APP_URL,
  website: APP_URL,
  domain: APP_DOMAIN,
  assets: {
    logo: `${APP_URL}/logo.png`,
    favicon: `${APP_URL}/favicon.ico`,
    ogImage: `${APP_URL}/og-image.png`,
    appleTouchIcon: `${APP_URL}/apple-touch-icon.png`
  },
  // ── Localization ──────────────────────────────────────────────────────────
  locale: DEFAULT_LOCALE,
  language: DEFAULT_LANG,
  timezone: "UTC",
  currency: "USD",
  // ── Emails ────────────────────────────────────────────────────────────────
  supportEmail: SUPPORT_EMAIL,
  contactEmail: CONTACT_EMAIL,
  privacyEmail: PRIVACY_EMAIL,
  abuseEmail: ABUSE_EMAIL,
  // ── Mail Templates ────────────────────────────────────────────────────────
  mail: {
    from: `"${APP_NAME}" <${SUPPORT_EMAIL}>`,
    replyTo: CONTACT_EMAIL,
    signature: `The ${APP_NAME} Team`,
    footer: `\xA9 ${FOUNDED_YEAR}\u2013${(/* @__PURE__ */ new Date()).getFullYear()} ${COMPANY_NAME}. All rights reserved.`,
    unsubscribe: `${APP_URL}/unsubscribe`,
    address: `${COMPANY_NAME}, Lahore, Pakistan`
  },
  // ── SEO ───────────────────────────────────────────────────────────────────
  keywords: [
    "education",
    "pakistani education",
    "class 9",
    "class 10",
    "class 11",
    "class 12",
    "virtual university",
    "past papers",
    "MCQs",
    "online tests",
    "pairing schemes"
  ],
  robots: "index, follow",
  category: "technology",
  classification: "Business/Productivity",
  // ── Social ────────────────────────────────────────────────────────────────
  social: {
    twitter: `https://twitter.com/${APP_HANDLE}`,
    linkedin: `https://linkedin.com/company/${APP_HANDLE}`,
    github: `https://github.com/${APP_HANDLE}`,
    facebook: `https://facebook.com/${APP_HANDLE}`,
    instagram: `https://instagram.com/${APP_HANDLE}`,
    youtube: `https://youtube.com/@${APP_HANDLE}`
  },
  // ── OpenGraph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} - Your Ultimate Resource for Classes 9\u201312 & Virtual University`,
    description: `${APP_NAME} is a comprehensive educational platform for Pakistani students.`,
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Educational Platform`,
        type: "image/png"
      },
      {
        url: `${APP_URL}/og-image-square.png`,
        width: 600,
        height: 600,
        alt: `${APP_NAME} Logo`,
        type: "image/png"
      }
    ]
  },
  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    handle: `@${APP_HANDLE}`,
    site: `@${APP_HANDLE}`,
    creator: `@${APP_HANDLE}`,
    cardType: "summary_large_image"
  },
  // ── Viewport ──────────────────────────────────────────────────────────────
  viewPort: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover"
  },
  // ── Apple / PWA ───────────────────────────────────────────────────────────
  appleMobileWebApp: {
    capable: "yes",
    statusBarStyle: "default",
    title: APP_NAME
  },
  pwa: {
    name: APP_NAME,
    shortName: "GrowLearn",
    startUrl: "/",
    display: "standalone",
    backgroundColor: "#ffffff",
    themeColor: THEME_COLOR,
    orientation: "portrait"
  },
  // ── Legal ─────────────────────────────────────────────────────────────────
  legal: {
    privacyUrl: `${APP_URL}/privacy`,
    termsUrl: `${APP_URL}/terms`,
    cookieUrl: `${APP_URL}/cookies`,
    copyrightYear: FOUNDED_YEAR,
    get copyright() {
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      return `\xA9 ${FOUNDED_YEAR}${year > FOUNDED_YEAR ? `\u2013${year}` : ""} ${COMPANY_NAME}. All rights reserved.`;
    }
  },
  // ── Support ───────────────────────────────────────────────────────────────
  support: {
    email: SUPPORT_EMAIL,
    url: `${APP_URL}/support`,
    docsUrl: `${APP_URL}/docs`,
    status: `https://status.${APP_DOMAIN}`,
    hours: "Monday\u2013Friday, 9am\u20136pm PKT"
  }
};

// src/routers/auth.router.ts
import { logTreeStep as logTreeStep2 } from "@muzammil328/services";

// src/infrastructure/cookie.service.ts
import { COOKIE_CONFIG } from "@muzammil328/types";
var ACCESS_COOKIE = "token";
var REFRESH_COOKIE = COOKIE_CONFIG.REFRESH_TOKEN_NAME;
var BASE_OPTIONS = {
  httpOnly: COOKIE_CONFIG.HTTP_ONLY,
  secure: process.env.NODE_ENV === "production",
  sameSite: COOKIE_CONFIG.SAME_SITE,
  path: "/"
};
var ACCESS_OPTIONS = {
  ...BASE_OPTIONS,
  httpOnly: false
};
var cookieService = {
  setAuthCookies(res, tokens) {
    res.cookie(ACCESS_COOKIE, tokens.accessToken, ACCESS_OPTIONS);
    res.cookie(REFRESH_COOKIE, tokens.refreshToken, { ...BASE_OPTIONS, maxAge: COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE });
  },
  clearAuthCookies(res) {
    res.clearCookie(ACCESS_COOKIE, { path: "/" });
    res.clearCookie(REFRESH_COOKIE, { path: "/" });
  },
  getAccessToken(req) {
    return req.cookies?.[ACCESS_COOKIE] ?? null;
  },
  getRefreshToken(req) {
    return req.cookies?.[REFRESH_COOKIE] ?? null;
  }
};

// src/services/auth.service.ts
import { AppError } from "@muzammil328/server";
import { Types as Types3 } from "mongoose";
import { logTreeStep } from "@muzammil328/services";

// src/infrastructure/email.service.ts
import { NodemailerProvider, EmailService, createRenderer } from "@muzammil328/services";

// src/email/templateLoader.ts
import fs from "fs/promises";
import path from "path";
async function templateLoader(name) {
  const templatesDir = path.join(process.cwd(), "src/email/templates");
  const partialsDir = path.join(process.cwd(), "src/email/partials");
  const file = path.join(templatesDir, `${name}.hbs`);
  let template = await fs.readFile(file, "utf-8");
  if (template.includes("{{> footer}}")) {
    const footer = await fs.readFile(path.join(partialsDir, "footer.hbs"), "utf-8");
    template = template.replace(/\{\{>\s*footer\s*\}\}/g, footer);
  }
  return template;
}

// src/config/env.config.ts
import { z as z17 } from "zod";
import dotenv from "dotenv";
import path2 from "path";
var envPath = path2.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath, override: true });
var envSchema = z17.object({
  NODE_ENV: z17.enum(["development", "production", "test"]).default("development"),
  PORT: z17.string().default("7000"),
  CLIENT_URL: z17.string().default("http://localhost:3000"),
  CORS_ORIGIN: z17.string().default("http://localhost:3000"),
  // Database
  MONGODB_URI: z17.string().default("mongodb://localhost:27017/education"),
  REDIS_URL: z17.string().default("redis://localhost:6379"),
  // JWT
  JWT_ACCESS_TOKEN_SECRET_KEY: z17.string().min(32).optional(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z17.string().default("1d").optional(),
  JWT_REFRESH_TOKEN_SECRET_KEY: z17.string().min(32),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z17.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z17.coerce.number().default(12),
  // Email
  SMTP_HOST: z17.string().default("smtp.gmail.com"),
  SMTP_PORT: z17.coerce.number().default(465),
  SMTP_SECURE: z17.coerce.boolean().default(true),
  SMTP_USER: z17.string().optional(),
  SMTP_PASS: z17.string().optional(),
  SMTP_FROM: z17.string().optional(),
  ADMIN_EMAIL: z17.string().optional(),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z17.string().optional(),
  CLOUDINARY_API_KEY: z17.string().optional(),
  CLOUDINARY_API_SECRET: z17.string().optional(),
  // Stripe
  STRIPE_SECRET_KEY: z17.string().optional(),
  STRIPE_WEBHOOK_SECRET: z17.string().optional(),
  STRIPE_SUCCESS_URL: z17.string().optional(),
  STRIPE_CANCEL_URL: z17.string().optional(),
  // Google OAuth
  GOOGLE_CLIENT_ID: z17.string().optional(),
  GOOGLE_CLIENT_SECRET: z17.string().optional(),
  GOOGLE_REDIRECT_URI: z17.string().optional(),
  COOKIE_SECRET: z17.string().optional(),
  // Logging
  LOG_LEVEL: z17.enum(["error", "warn", "info", "debug"]).default("info")
});
var parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("\u274C Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}
var env = parsedEnv.data;
var config = {
  PORT: parseInt(env.PORT, 10) || 7e3,
  NODE_ENV: env.NODE_ENV,
  CLIENT_URL: env.CLIENT_URL,
  CORS_ORIGIN: env.CORS_ORIGIN,
  MONGODB_URI: env.MONGODB_URI,
  REDIS_URL: env.REDIS_URL,
  JWT_ACCESS_TOKEN_SECRET_KEY: env.JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET_KEY: env.JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRES_IN: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS: env.BCRYPT_SALT_ROUNDS,
  SMTP_HOST: env.SMTP_HOST,
  SMTP_PORT: env.SMTP_PORT,
  SMTP_SECURE: env.SMTP_SECURE,
  SMTP_USER: env.SMTP_USER,
  SMTP_PASS: env.SMTP_PASS,
  SMTP_FROM: env.SMTP_FROM,
  ADMIN_EMAIL: env.ADMIN_EMAIL,
  CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
  STRIPE_SUCCESS_URL: env.STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL: env.STRIPE_CANCEL_URL,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: env.GOOGLE_REDIRECT_URI,
  COOKIE_SECRET: env.COOKIE_SECRET,
  LOG_LEVEL: env.LOG_LEVEL
};
var env_config_default = config;

// src/infrastructure/email.service.ts
var isProduction = config.NODE_ENV === "production";
var provider = new NodemailerProvider({
  host: isProduction ? config.SMTP_HOST : "localhost",
  port: isProduction ? 587 : 1025,
  secure: false,
  auth: isProduction ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : void 0
});
provider.verify().catch((err) => {
  console.warn(`[email] SMTP connection failed: ${err.message}. Server will still start, but emails won't be sent.`);
});
var renderer = createRenderer(templateLoader);
var emailService = new EmailService(provider, renderer, {
  from: config.SMTP_FROM || APP_CONFIG.supportEmail,
  orgName: APP_CONFIG.company,
  supportEmail: APP_CONFIG.supportEmail
});
async function sendVerificationOtp({
  email,
  username,
  otp
}) {
  return emailService.send({
    to: email,
    subject: "Growlearnhub verification code",
    template: "generateVerificationCode",
    context: { username, otp, year: (/* @__PURE__ */ new Date()).getFullYear() }
  });
}
async function sendPasswordResetOtp({
  email,
  username,
  otp
}) {
  return emailService.send({
    to: email,
    subject: "Growlearnhub password reset code",
    template: "passwordResetCode",
    context: { username, otp, year: (/* @__PURE__ */ new Date()).getFullYear() }
  });
}

// src/infrastructure/bcrypt.service.ts
import { SECURITY_CONFIG } from "@muzammil328/types";
import { createBcrypt } from "@muzammil328/services";
var bcryptService = createBcrypt({
  saltRounds: SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT
});

// src/infrastructure/jwt.service.ts
import { AUTH_CONFIG } from "@muzammil328/types";
import { createJwt } from "@muzammil328/services";
var coreJwt = createJwt({
  accessSecret: env_config_default.JWT_ACCESS_TOKEN_SECRET_KEY || "fallback-access-secret-that-is-at-least-32-chars-long!!",
  refreshSecret: env_config_default.JWT_REFRESH_TOKEN_SECRET_KEY,
  accessExpiresIn: AUTH_CONFIG.ACCESS_TOKEN_EXPIRY,
  refreshExpiresIn: `${AUTH_CONFIG.REFRESH_TOKEN_EXPIRY}d`
});
var jwtService = {
  signAccess(payload) {
    return coreJwt.signAccess(payload);
  },
  signRefresh(payload) {
    return coreJwt.signRefresh(payload);
  },
  signBoth(payload) {
    return {
      accessToken: coreJwt.signAccess(payload),
      refreshToken: coreJwt.signRefresh(payload)
    };
  },
  verifyAccess(token) {
    const result = coreJwt.verifyAccess(token);
    if (!result.valid || !result.payload) {
      return { valid: false };
    }
    return { valid: true, payload: result.payload };
  },
  verifyRefresh(token) {
    const result = coreJwt.verifyRefresh(token);
    if (!result.valid || !result.payload) {
      return { valid: false };
    }
    return { valid: true, payload: result.payload };
  }
};

// src/infrastructure/otp.service.ts
import crypto from "crypto";
import { Types } from "mongoose";

// src/models/otp.model.ts
import mongoose, { Schema } from "mongoose";
var OtpSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    hashedOtp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    purpose: {
      type: String,
      enum: OtpPurposeEnum,
      required: true
    },
    attempts: { type: Number, default: 0 },
    maxAttempts: { type: Number, default: 5 }
  },
  { timestamps: true }
);
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OtpSchema.index({ userId: 1, purpose: 1 });
var Otp = mongoose.model("Otp", OtpSchema);
var otp_model_default = Otp;

// src/config/db.config.ts
import mongoose2 from "mongoose";
import {
  defaultLogger,
  STATE_MAP,
  toObjectId,
  BaseRepository
} from "@muzammil328/db";
async function attemptConnect(uri) {
  await mongoose2.connect(uri, {
    serverSelectionTimeoutMS: 5e3,
    socketTimeoutMS: 45e3
  });
}
async function connectMongo(options) {
  const { uri, maxRetries = 3, retryDelayMs = 500, logger: logger2 = defaultLogger() } = options;
  if (mongoose2.connection.readyState === 1) {
    logger2.info("MongoDB already connected \u2014 reusing existing connection");
    return;
  }
  let attempt = 0;
  while (attempt < maxRetries) {
    attempt++;
    try {
      await attemptConnect(uri);
      logger2.info("MongoDB connected successfully");
      registerListeners(logger2);
      return;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (attempt >= maxRetries) {
        logger2.error(`MongoDB connection failed after ${maxRetries} attempts`, {
          message: error.message
        });
        throw error;
      }
      const delay = retryDelayMs * attempt;
      logger2.warn(
        `MongoDB connection attempt ${attempt} failed \u2014 retrying in ${delay}ms: ${error.message}`
      );
      await sleep(delay);
    }
  }
}
function registerListeners(logger2) {
  mongoose2.connection.removeAllListeners();
  mongoose2.connection.on("error", (err) => {
    logger2.error(`MongoDB connection error: ${err.message}`);
  });
  mongoose2.connection.on("disconnected", () => {
    logger2.warn("MongoDB disconnected");
  });
  mongoose2.connection.on("reconnected", () => {
    logger2.info("MongoDB reconnected");
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/repository/otp.repository.ts
var OtpRepository = class extends BaseRepository {
  constructor() {
    super(otp_model_default);
  }
  async findByUserAndPurpose(userId, purpose) {
    return this.findOne({ userId, purpose });
  }
  async deleteManyByUserAndPurpose(userId, purpose) {
    return this.model.deleteMany({ userId, purpose });
  }
  async incrementAttempts(id) {
    return this.model.findByIdAndUpdate(id, { $inc: { attempts: 1 } }, { new: true });
  }
};
var otpRepository = new OtpRepository();

// src/infrastructure/otp.service.ts
var OTP_LENGTH = 6;
var OTP_TTL_MINUTES = 10;
var OTP_MAX_ATTEMPTS = 5;
function generateNumericOtp(length = OTP_LENGTH) {
  const max = Math.pow(10, length);
  return String(crypto.randomInt(0, max)).padStart(length, "0");
}
function getExpiryDate(ttlMinutes = OTP_TTL_MINUTES) {
  return new Date(Date.now() + ttlMinutes * 60 * 1e3);
}
var otpService = {
  async createOtp(userId, purpose = OtpPurposeEnum.EMAIL_VERIFICATION) {
    const otp = generateNumericOtp();
    const hashedOtp = await bcryptService.hash(otp);
    const expiresAt = getExpiryDate();
    await otpRepository.deleteManyByUserAndPurpose(userId, purpose);
    const record = await otpRepository.create({
      userId: new Types.ObjectId(userId),
      hashedOtp,
      expiresAt,
      purpose,
      attempts: 0,
      maxAttempts: OTP_MAX_ATTEMPTS
    });
    return { otp, recordId: String(record._id) };
  },
  async verifyOtp(userId, inputOtp, purpose) {
    const record = await otpRepository.findByUserAndPurpose(userId, purpose);
    if (!record) return false;
    if (/* @__PURE__ */ new Date() > record.expiresAt) return false;
    if (record.attempts >= record.maxAttempts) return false;
    const isValid = await bcryptService.compare(inputOtp, record.hashedOtp);
    await otpRepository.incrementAttempts(record._id);
    return isValid;
  }
};

// src/repository/user.repository.ts
import { Types as Types2 } from "mongoose";

// src/models/user.model.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var UserSchema = new Schema2(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.Student
    },
    isEmailVerified: { type: Boolean, default: false },
    hashedToken: { type: String, select: false },
    expiresToken: { type: Date, select: false },
    revoked: { type: Boolean, default: false, select: false },
    deviceInfo: {
      type: {
        userAgent: { type: String },
        ip: { type: String }
      },
      select: false
    },
    refreshTokens: {
      type: [
        {
          _id: { type: Schema2.Types.ObjectId, auto: true },
          userId: { type: String, required: true },
          hashedToken: { type: String, required: true },
          expiresAt: { type: Date, required: true },
          revoked: { type: Boolean, default: false },
          deviceInfo: {
            userAgent: { type: String },
            ip: { type: String }
          }
        }
      ],
      select: false
    },
    institutionId: { type: Schema2.Types.ObjectId, ref: "Institution", index: true },
    enrolledClasses: [{ type: Schema2.Types.ObjectId, ref: "Class" }],
    badges: [{ type: String }],
    dailyStreak: { type: Number, default: 0 },
    lastLogin: { type: Date },
    // Exam countdown
    examTarget: { type: String, trim: true },
    examDate: { type: Date },
    // Micro Burst streak
    lastBurstDate: { type: Date },
    burstStreakCount: { type: Number, default: 0 },
    subscriptionPlan: {
      type: String,
      enum: Object.values(SubscriptionPlanEnum),
      default: SubscriptionPlanEnum.FREE
    },
    subscriptionExpiresAt: { type: Date },
    // OTP LIFECYCLE NOTE: hashedOtp/expiresOtp/used are application-layer enforced.
    // otpService.verifyOtp() checks expiresOtp before comparing. Fields hidden via select:false.
    // Future: extract into a separate OtpRecord collection with a TTL index.
    hashedOtp: { type: String, select: false },
    expiresOtp: { type: Date, select: false },
    used: { type: Boolean, default: false, select: false }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret["id"] = ret["_id"]?.toString();
        delete ret["_id"];
        delete ret["__v"];
        return ret;
      }
    }
  }
);
var User = mongoose3.model("User", UserSchema);
var user_model_default = User;

// src/repository/user.repository.ts
var UserRepository = class extends BaseRepository {
  constructor() {
    super(user_model_default);
  }
  async findByEmail(email) {
    return this.findOne({ email: email.toLowerCase() });
  }
  async findByEmailWithAuth(email) {
    return this.model.findOne({ email: email.toLowerCase() }).select("+password +hashedToken +revoked +expiresToken");
  }
  async findByIdWithSecrets(id, fields) {
    return this.model.findById(new Types2.ObjectId(id)).select(fields.join(" "));
  }
  async findByUsername(username) {
    return this.findOne({ username });
  }
  async findByRole(role, page = 1, limit = 10) {
    return this.aggregate({
      pipeline: [{ $match: { role } }, { $sort: { createdAt: -1 } }],
      page,
      limit
    });
  }
};
var userRepository = new UserRepository();

// src/services/auth.service.ts
var authService = {
  async register(input) {
    logTreeStep("AUTH_REGISTER_START");
    const { username, email, password } = input;
    const existingByEmail = await userRepository.findByEmail(email);
    if (existingByEmail) throw AppError.conflict("EMAIL_ALREADY_EXISTS");
    const existingByUsername = await userRepository.findByUsername(username);
    if (existingByUsername) throw AppError.conflict("USERNAME_ALREADY_EXISTS");
    const hashedPassword = await bcryptService.hash(password);
    const user = await userRepository.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: RoleEnum.Student,
      isEmailVerified: false,
      enrolledClasses: [],
      badges: [],
      dailyStreak: 0
    });
    const userId = String(user._id);
    const { otp } = await otpService.createOtp(new Types3.ObjectId(userId), OtpPurposeEnum.EMAIL_VERIFICATION);
    await sendVerificationOtp({ email, username, otp });
    logTreeStep("AUTH_REGISTER_SUCCESS", {
      meta: {
        userId,
        email
      }
    });
    return {
      userId,
      username: user.username,
      email: user.email,
      role: user.role ?? RoleEnum.Student
    };
  },
  async otpVerification(input) {
    logTreeStep("authService.otpVerification");
    const { email, otp } = input;
    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound("User not found");
    const userId = String(user._id);
    const isValid = await otpService.verifyOtp(new Types3.ObjectId(userId), otp, OtpPurposeEnum.EMAIL_VERIFICATION);
    if (!isValid) throw AppError.unauthorized("Invalid or expired OTP");
    logTreeStep("OTP verified successfully");
    return { success: true, message: "Email verified successfully" };
  },
  async login(input) {
    logTreeStep("authService.login");
    const { email, password } = input;
    const user = await userRepository.findByEmailWithAuth(email);
    if (!user) throw AppError.unauthorized("Invalid credentials");
    const isPasswordValid = await bcryptService.compare(password, user.password);
    if (!isPasswordValid) throw AppError.unauthorized("Invalid credentials");
    const userId = String(user._id);
    const role = user.role ?? RoleEnum.Student;
    const accessToken = jwtService.signAccess({ userId, role });
    const refreshToken = jwtService.signRefresh({ userId, role });
    const hashedRefreshToken = await bcryptService.hash(refreshToken);
    await userRepository.findByIdAndUpdate(new Types3.ObjectId(userId), {
      hashedToken: hashedRefreshToken,
      revoked: false
    });
    logTreeStep("User logged in successfully");
    return {
      user: {
        id: userId,
        username: user.username,
        email: user.email,
        role: user.role
      },
      tokens: { accessToken, refreshToken }
    };
  },
  async logout(userId) {
    logTreeStep("authService.logout");
    if (!Types3.ObjectId.isValid(userId)) throw AppError.badRequest("Invalid user ID");
    const user = await userRepository.findByIdAndUpdate(
      new Types3.ObjectId(userId),
      { revoked: true, hashedToken: "", expiresToken: null },
      { new: true }
    );
    if (!user) throw AppError.notFound("User not found");
    logTreeStep("User logged out successfully");
    return { message: "Logged out successfully" };
  },
  async forgotPassword(input) {
    logTreeStep("authService.forgotPassword");
    const { email } = input;
    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound("User not found");
    const userId = String(user._id);
    const { otp } = await otpService.createOtp(new Types3.ObjectId(userId), OtpPurposeEnum.PASSWORD_RESET);
    await sendPasswordResetOtp({ email, username: user.username, otp });
    logTreeStep("Password reset OTP sent successfully");
    return { message: "Password reset OTP sent to email" };
  },
  async verifyForgotPasswordOtp(input) {
    logTreeStep("authService.verifyForgotPasswordOtp");
    const { email, otp } = input;
    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound("User not found");
    const userId = String(user._id);
    const isValid = await otpService.verifyOtp(new Types3.ObjectId(userId), otp, OtpPurposeEnum.PASSWORD_RESET);
    if (!isValid) throw AppError.unauthorized("Invalid or expired OTP");
    logTreeStep("Forgot password OTP verified successfully");
    return { message: "OTP verified successfully" };
  },
  async resetPassword(input) {
    logTreeStep("authService.resetPassword");
    const { email, newPassword } = input;
    const user = await userRepository.findByEmail(email);
    if (!user) throw AppError.notFound("User not found");
    const hashedPassword = await bcryptService.hash(newPassword);
    await userRepository.findByIdAndUpdate(
      new Types3.ObjectId(user._id),
      { password: hashedPassword },
      { new: true }
    );
    logTreeStep("Password reset successfully");
    return { message: "Password changed successfully" };
  },
  async refreshToken(input) {
    logTreeStep("authService.refreshToken");
    const { refreshToken: incomingToken } = input;
    const decoded = jwtService.verifyRefresh(incomingToken);
    if (!decoded.valid || !decoded.payload) throw AppError.unauthorized("Invalid refresh token");
    const payload = decoded.payload;
    const user = await userRepository.findByIdWithSecrets(payload.userId, ["+revoked", "+hashedToken"]);
    if (!user || user.revoked || !user.hashedToken) throw AppError.unauthorized("Invalid refresh token");
    const isTokenValid = await bcryptService.compare(incomingToken, user.hashedToken);
    if (!isTokenValid) throw AppError.unauthorized("Invalid refresh token");
    const userId = String(user._id);
    const role = user.role ?? RoleEnum.Student;
    const accessToken = jwtService.signAccess({ userId, role });
    const newRefreshToken = jwtService.signRefresh({ userId, role });
    const hashedRefreshToken = await bcryptService.hash(newRefreshToken);
    await userRepository.findByIdAndUpdate(new Types3.ObjectId(userId), {
      hashedToken: hashedRefreshToken,
      revoked: false
    });
    logTreeStep("Tokens refreshed successfully");
    return {
      tokens: { accessToken, refreshToken: newRefreshToken }
    };
  }
};

// src/services/user.service.ts
import { AppError as AppError2 } from "@muzammil328/server";
import { Types as Types4 } from "mongoose";
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var userService = {
  async getMe(userId) {
    if (!Types4.ObjectId.isValid(userId)) {
      throw AppError2.badRequest("Invalid user ID");
    }
    const user = await userRepository.findById(new Types4.ObjectId(userId));
    if (!user) {
      throw AppError2.notFound("User not found");
    }
    const profile = {
      userId: String(user._id),
      username: user.username,
      email: user.email,
      role: String(user.role || "user")
    };
    return profile;
  },
  async update(userId, input) {
    if (!Types4.ObjectId.isValid(userId)) {
      throw AppError2.badRequest("Invalid user ID");
    }
    const updateData = {};
    if (input.username) updateData.username = input.username;
    if (input.email) updateData.email = input.email;
    const updated = await userRepository.findByIdAndUpdate(new Types4.ObjectId(userId), updateData, { new: true });
    if (!updated) {
      throw AppError2.notFound("User not found");
    }
    return updated;
  },
  async getAll(input) {
    const sortOrder = input.sortDirection?.toUpperCase() === "DESC" ? -1 : 1;
    const sort = input.sort ?? "createdAt";
    const match = {};
    if (input.role) {
      match.role = input.role;
    }
    if (input.search) {
      const searchRegex = escapeRegex(input.search);
      match.$or = [
        { username: { $regex: searchRegex, $options: "i" } },
        { email: { $regex: searchRegex, $options: "i" } }
      ];
    }
    return userRepository.aggregate({
      pipeline: [
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        {
          $lookup: {
            from: "classes",
            localField: "enrolledClasses",
            foreignField: "_id",
            as: "enrolledClassesDocs"
          }
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            username: 1,
            email: 1,
            role: 1,
            isEmailVerified: 1,
            dailyStreak: 1,
            lastLogin: 1,
            enrolledClasses: {
              $map: {
                input: "$enrolledClassesDocs",
                as: "cls",
                in: { classId: "$$cls._id", className: "$$cls.name" }
              }
            },
            badges: 1,
            createdAt: 1
          }
        }
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10
    });
  },
  async delete(id) {
    if (!id) {
      throw AppError2.badRequest("Invalid user ID");
    }
    const deleted = await userRepository.findByIdAndDelete(new Types4.ObjectId(id));
    if (!deleted) {
      throw AppError2.notFound("User not found");
    }
    return deleted;
  }
};

// src/routers/auth.router.ts
var authRouter = createTRPCRouter({
  register: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
    try {
      const result = await authService.register(input);
      logTreeStep2("User registration successful");
      return {
        success: true,
        status: StatusCode.CREATED,
        message: "Registration successful",
        data: {
          userId: result.userId,
          username: result.username,
          email: result.email,
          role: result.role ?? ""
        }
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  otpVerification: publicProcedure.input(otpVerificationSchema).mutation(async ({ input }) => {
    try {
      await authService.otpVerification(input);
      return {
        success: true,
        status: StatusCode.OK,
        message: "OTP verified successfully",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    try {
      const result = await authService.login(input);
      cookieService.setAuthCookies(ctx.res, result.tokens);
      logTreeStep2("User login successful");
      return {
        success: true,
        status: StatusCode.OK,
        message: "Login successful",
        data: {
          user: {
            userId: result.user.id,
            username: result.user.username,
            email: result.user.email,
            role: result.user.role ?? ""
          },
          token: result.tokens
        }
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  logout: protectedProcedure.input(z18.void()).mutation(async ({ ctx }) => {
    try {
      const userId = ctx.user?.userId;
      if (!userId || !Types5.ObjectId.isValid(userId)) {
        throw AppError3.unauthorized("Invalid user ID");
      }
      await authService.logout(userId);
      cookieService.clearAuthCookies(ctx.res);
      return {
        success: true,
        status: StatusCode.OK,
        message: "Logged out successfully",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  refreshToken: publicProcedure.input(z18.void()).mutation(async ({ ctx }) => {
    try {
      const token = cookieService.getRefreshToken(ctx.req);
      if (!token) throw AppError3.unauthorized("No refresh token provided");
      const result = await authService.refreshToken({ refreshToken: token });
      cookieService.setAuthCookies(ctx.res, result.tokens);
      logTreeStep2("Tokens refreshed via cookie");
      return {
        success: true,
        status: StatusCode.OK,
        message: "Tokens refreshed successfully",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ input }) => {
    try {
      await authService.forgotPassword(input);
      return {
        success: true,
        status: StatusCode.OK,
        message: "OTP sent to email",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  verifyForgotPassword: publicProcedure.input(forgotPasswordOtpVerificationSchema).mutation(async ({ input }) => {
    try {
      await authService.verifyForgotPasswordOtp(input);
      return {
        success: true,
        status: StatusCode.OK,
        message: "OTP verified successfully",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async ({ input }) => {
    try {
      await authService.resetPassword(input);
      return {
        success: true,
        status: StatusCode.OK,
        message: "Password reset successfully",
        data: null
      };
    } catch (error) {
      throw toTrpcError2(error);
    }
  }),
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types5.ObjectId.isValid(userId)) {
      throw toTrpcError2(AppError3.unauthorized("Invalid user ID"));
    }
    return userService.getMe(userId);
  })
});

// src/routers/board/boardGetAll.ts
import { toTrpcError as toTrpcError3 } from "@muzammil328/trpc";

// src/models/board.model.ts
import mongoose4, { Schema as Schema3 } from "mongoose";
var BoardSchema = new Schema3(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    classId: [{ type: Schema3.Types.ObjectId, ref: "Class", required: true }],
    serviceId: [{ type: Schema3.Types.ObjectId, ref: "Service" }],
    description: { type: String },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
BoardSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
BoardSchema.index({ slug: 1, classId: 1 }, { unique: true });
var board_model_default = mongoose4.model("Board", BoardSchema);

// src/repository/board.repository.ts
var BoardRepository = class extends BaseRepository {
  constructor() {
    super(board_model_default);
  }
  async findBySlug(slug) {
    return this.findOne({ slug: slug.toLowerCase() });
  }
  async findActive() {
    return this.findAll({ query: { status: "active" } });
  }
};
var boardRepository = new BoardRepository();

// src/routers/board/boardGetAll.ts
import { buildMatch } from "@muzammil328/db";
var boardGetAll = superAdminProcedure.input(getBoardsInputSchema).query(async ({ input }) => {
  try {
    const result = await boardRepository.aggregate({
      pipeline: boardRepository.pipeline().match(buildMatch(
        { status: input.status }
      )).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        classId: "$_id",
        name: 1,
        status: 1,
        className: "$class.name",
        serviceId: 1,
        services: 1
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Boards fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError3(e);
  }
});

// src/routers/board/boardGetDropdown.ts
import { toTrpcError as toTrpcError4 } from "@muzammil328/trpc";
import { buildMatch as buildMatch2, toObjectId as toObjectId2 } from "@muzammil328/db";
var boardGetDropdown = superAdminProcedure.input(getBoardDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    if (!classId) {
      throw new Error("classId is required");
    }
    const result = await boardRepository.aggregate({
      pipeline: boardRepository.pipeline().match(
        buildMatch2({
          status: StatusEnum.Active,
          classId: toObjectId2(classId)
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError4(e);
  }
});

// src/routers/board/boardGetById.ts
import { toTrpcError as toTrpcError5 } from "@muzammil328/trpc";
import { AppError as AppError4 } from "@muzammil328/server";
import { buildMatch as buildMatch3, toObjectId as toObjectId3 } from "@muzammil328/db";
var boardGetById = superAdminProcedure.input(getBoardByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await boardRepository.aggregate({
      pipeline: boardRepository.pipeline().match(
        buildMatch3({
          _id: toObjectId3(input.id)
        })
      ).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "_id"],
        unwind: false
      }).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).project({
        _id: 0,
        classId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        serviceId: 1,
        services: 1,
        class: {
          $map: {
            input: "$class",
            as: "cls",
            in: { classId: "$$cls._id", name: "$$cls.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError4.notFound("Board not found");
    }
    return {
      success: true,
      message: "Board fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError5(e);
  }
});

// src/routers/board/boardDelete.ts
import { AppError as AppError5 } from "@muzammil328/server";
import { toTrpcError as toTrpcError6 } from "@muzammil328/trpc";
var boardDelete = superAdminProcedure.input(deleteBoardInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await boardRepository.findByIdAndDelete(toObjectId(input.id));
    if (!deleted) {
      throw AppError5.notFound("Board not found");
    }
    return {
      success: true,
      message: "Board deleted successfully"
    };
  } catch (e) {
    throw toTrpcError6(e);
  }
});

// src/routers/board/boardCreate.ts
import { AppError as AppError6 } from "@muzammil328/server";
import { toTrpcError as toTrpcError7 } from "@muzammil328/trpc";
import { parseObjectIdList } from "@muzammil328/db";
var boardCreate = superAdminProcedure.input(boardCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await boardRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError6.badRequest("Board already exists");
    }
    const parsedClassIds = parseObjectIdList(input.classId);
    const classId = Array.isArray(parsedClassIds) ? parsedClassIds[0] : parsedClassIds;
    const created = await boardRepository.create({
      name: input.name,
      classId,
      description: input.description,
      status: input.status
    });
    return {
      success: true,
      message: "Board created successfully",
      data: {
        boardId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError7(e);
  }
});

// src/routers/board/boardUpdate.ts
import { AppError as AppError7 } from "@muzammil328/server";
import { toTrpcError as toTrpcError8 } from "@muzammil328/trpc";
import { resolveObjectId, toObjectId as toObjectId4 } from "@muzammil328/db";
var boardUpdate = superAdminProcedure.input(updateBoardInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await boardRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId(input.id)
      }
    });
    if (duplicate) {
      throw AppError7.badRequest("Board already exists");
    }
    const updated = await boardRepository.findByIdAndUpdate(
      toObjectId4(input.id),
      {
        name: input.updates.name,
        status: input.updates.status,
        classId: input.updates.classId,
        description: input.updates.description
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError7.notFound("Board not found");
    }
    return {
      success: true,
      message: "Board updated successfully",
      data: {
        boardId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status
      }
    };
  } catch (e) {
    throw toTrpcError8(e);
  }
});

// src/routers/board/board.router.ts
var boardRouter = createTRPCRouter({
  getAll: boardGetAll,
  getDropdown: boardGetDropdown,
  getById: boardGetById,
  create: boardCreate,
  update: boardUpdate,
  delete: boardDelete
});

// src/routers/book/bookGetAll.ts
import { toTrpcError as toTrpcError9 } from "@muzammil328/trpc";

// src/models/book.model.ts
import mongoose5, { Schema as Schema4 } from "mongoose";
var VUAssessmentComponentSchema = new Schema4(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["assignment", "quiz", "midterm", "final", "project", "lab", "other"],
      default: "other"
    },
    weight: { type: Number, required: true, min: 0, max: 100 },
    maxMarks: { type: Number },
    passingMarks: { type: Number },
    dueWeek: { type: Number },
    isOnline: { type: Boolean, default: false },
    description: { type: String },
    instructions: { type: String }
  },
  { _id: false }
);
var PairingSchemeSchema = new Schema4(
  {
    image: { type: String },
    year: { type: Number },
    board: { type: String }
  },
  { _id: false }
);
var BookSchema = new Schema4(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    classId: { type: Schema4.Types.ObjectId, ref: "Class", required: true, index: true },
    serviceId: [{ type: Schema4.Types.ObjectId, ref: "Service", index: true }],
    creditHours: { type: Number },
    fileId: { type: String },
    pages: { type: Number },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    image: { type: String },
    totalWeight: { type: Number, default: 100 },
    components: [VUAssessmentComponentSchema],
    pairingScheme: { type: PairingSchemeSchema },
    externalLinks: [
      new Schema4({ name: { type: String, required: true }, slug: { type: String, required: true }, url: { type: String, required: true } }, { _id: false })
    ]
  },
  { timestamps: true }
);
BookSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var Book = mongoose5.model("Book", BookSchema);
var book_model_default = Book;

// src/repository/book.repository.ts
var BookRepository = class extends BaseRepository {
  constructor() {
    super(book_model_default);
  }
  async findBySlug(slug, classId) {
    const query = {
      slug: slug.toLowerCase(),
      classId: classId ? classId : void 0
    };
    if (classId) query.classId = classId;
    return this.findOne(query);
  }
  async findByClass(classId, status) {
    const query = {
      classId,
      status: status ? status.toLowerCase() : void 0
    };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async getBookByName(name) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const result = await this.aggregate({ pipeline: [
      {
        $match: {
          status: "active",
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: "i" } }]
        }
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classId"
        }
      },
      {
        $unwind: "$classId"
      },
      {
        $project: {
          _id: 0,
          bookId: "$_id",
          name: 1,
          slug: 1,
          code: 1,
          status: 1,
          description: 1,
          creditHours: 1,
          totalWeight: 1,
          pages: 1,
          components: 1,
          class: {
            classId: "$classId._id",
            className: "$classId.name"
          },
          image: 1,
          keywords: 1
        }
      },
      { $limit: 1 }
    ] });
    return result[0] || null;
  }
  async getBookByClassName(className) {
    const normalized = className.trim().toLowerCase();
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $match: {
          "classDoc.status": "active",
          $or: [
            { "classDoc.slug": normalized },
            { "classDoc.name": { $regex: `^${escaped}$`, $options: "i" } }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1
        }
      },
      { $sort: { name: 1 } }
    ] });
  }
  async findByClassSlug(classSlug) {
    const normalized = classSlug.trim().toLowerCase();
    const escaped = classSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $match: {
          "classDoc.status": "active",
          $or: [
            { "classDoc.slug": normalized },
            { "classDoc.name": { $regex: `^${escaped}$`, $options: "i" } }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1
        }
      },
      { $sort: { name: 1 } }
    ] });
  }
  async getBookByServiceName(serviceName) {
    const normalized = serviceName.trim().toLowerCase();
    const escaped = serviceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      { $match: { "classDoc.status": "active" } },
      {
        $lookup: {
          from: "services",
          let: { serviceIds: "$classDoc.serviceId" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$serviceIds"] },
                status: "active",
                $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: "i" } }]
              }
            },
            { $project: { _id: 1 } }
          ],
          as: "matchedServices"
        }
      },
      {
        $match: {
          "matchedServices.0": { $exists: true }
        }
      },
      {
        $group: {
          _id: "$slug",
          name: { $first: "$name" },
          slug: { $first: "$slug" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1
        }
      },
      { $sort: { name: 1 } }
    ] });
  }
};
var bookRepository = new BookRepository();

// src/routers/book/bookGetAll.ts
import { buildMatch as buildMatch4 } from "@muzammil328/db";
var bookGetAll = superAdminProcedure.input(getBooksInputSchema).query(async ({ input }) => {
  try {
    const result = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(buildMatch4(
        { status: input.status }
      )).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        bookId: "$_id",
        name: 1,
        status: 1,
        classId: 1,
        className: "$class.name",
        serviceId: 1,
        services: 1
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Books fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError9(e);
  }
});

// src/routers/book/bookGetDropdown.ts
import { toTrpcError as toTrpcError10 } from "@muzammil328/trpc";
import { buildMatch as buildMatch5 } from "@muzammil328/db";
var bookGetDropdown = superAdminProcedure.input(getBookDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    const result = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(
        buildMatch5({
          status: StatusEnum.Active,
          classId
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError10(e);
  }
});

// src/routers/book/bookGetById.ts
import { toTrpcError as toTrpcError11 } from "@muzammil328/trpc";
import { AppError as AppError8 } from "@muzammil328/server";
import { buildMatch as buildMatch6, toObjectId as toObjectId5 } from "@muzammil328/db";
var bookGetById = superAdminProcedure.input(getBookByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(
        buildMatch6({
          _id: toObjectId5(input.id)
        })
      ).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "_id"],
        unwind: false
      }).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).project({
        _id: 0,
        bookId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        classId: 1,
        serviceId: 1,
        services: 1,
        code: 1,
        creditHours: 1,
        fileId: 1,
        pages: 1,
        image: 1,
        totalWeight: 1,
        components: 1,
        class: {
          $let: {
            vars: { c: { $first: "$class" } },
            in: { classId: "$$c._id", name: "$$c.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError8.notFound("Book not found");
    }
    return {
      success: true,
      message: "Book fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError11(e);
  }
});

// src/routers/book/bookDelete.ts
import { AppError as AppError9 } from "@muzammil328/server";
import { toTrpcError as toTrpcError12 } from "@muzammil328/trpc";
var bookDelete = superAdminProcedure.input(deleteBookInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await bookRepository.findByIdAndDelete(input.id);
    if (!deleted) {
      throw AppError9.notFound("Book not found");
    }
    return {
      success: true,
      message: "Book deleted successfully"
    };
  } catch (e) {
    throw toTrpcError12(e);
  }
});

// src/routers/book/bookCreate.ts
import { Types as Types6 } from "mongoose";
import { AppError as AppError10 } from "@muzammil328/server";
import { toTrpcError as toTrpcError13 } from "@muzammil328/trpc";
var bookCreate = superAdminProcedure.input(bookCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await bookRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError10.badRequest("Book already exists");
    }
    const created = await bookRepository.create({
      name: input.name,
      code: input.code,
      status: input.status,
      classId: new Types6.ObjectId(input.classId),
      serviceId: input.serviceId,
      description: input.description,
      creditHours: input.creditHours,
      fileId: input.fileId,
      pages: input.pages,
      image: input.image,
      order: input.order,
      totalWeight: input.totalWeight,
      components: input.components
    });
    return {
      success: true,
      message: "Book created successfully",
      data: {
        bookId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError13(e);
  }
});

// src/routers/book/bookUpdate.ts
import { AppError as AppError11 } from "@muzammil328/server";
import { toTrpcError as toTrpcError14 } from "@muzammil328/trpc";
import { resolveObjectId as resolveObjectId2 } from "@muzammil328/db";
var bookUpdate = superAdminProcedure.input(updateBookInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await bookRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId2(input.id)
      }
    });
    if (duplicate) {
      throw AppError11.badRequest("Book already exists");
    }
    const updated = await bookRepository.findByIdAndUpdate(
      input.id,
      {
        name: input.updates.name,
        code: input.updates.code,
        status: input.updates.status,
        classId: input.updates.classId,
        serviceId: input.updates.serviceId,
        description: input.updates.description,
        creditHours: input.updates.creditHours,
        fileId: input.updates.fileId,
        pages: input.updates.pages,
        image: input.updates.image,
        order: input.updates.order,
        totalWeight: input.updates.totalWeight,
        components: input.updates.components
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError11.notFound("Book not found");
    }
    return {
      success: true,
      message: "Book updated successfully",
      data: {
        bookId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status,
        serviceIds: (updated.serviceId ?? []).map(
          (id) => String(id)
        ),
        image: updated.image,
        keywords: updated.keywords ?? []
      }
    };
  } catch (e) {
    throw toTrpcError14(e);
  }
});

// src/routers/book/book.router.ts
var bookRouter = createTRPCRouter({
  getAll: bookGetAll,
  getDropdown: bookGetDropdown,
  getById: bookGetById,
  create: bookCreate,
  update: bookUpdate,
  delete: bookDelete
});

// src/routers/chapter/chapterGetAll.ts
import { toTrpcError as toTrpcError15 } from "@muzammil328/trpc";

// src/models/chapter.model.ts
import mongoose6, { Schema as Schema5 } from "mongoose";
var ChapterSchema = new Schema5(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    bookId: { type: Schema5.Types.ObjectId, ref: "Book", required: true },
    classId: { type: Schema5.Types.ObjectId, ref: "Class", required: true },
    description: { type: String },
    content: { type: String },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number }
  },
  { timestamps: true }
);
ChapterSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var Chapter = mongoose6.model("Chapter", ChapterSchema);
var chapter_model_default = Chapter;

// src/repository/chapter.repository.ts
var ChapterRepository = class extends BaseRepository {
  constructor() {
    super(chapter_model_default);
  }
  async findBySlug(slug, bookId) {
    const query = { slug: slug.toLowerCase() };
    if (bookId) query.bookId = bookId;
    return this.findOne(query);
  }
  async findByBook(bookId, status) {
    const query = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async findByClass(classId, status) {
    const query = { classId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async findByClassSlugAndChapterSlug(classSlug, chapterSlug) {
    const normalizedClass = classSlug.trim().toLowerCase();
    const normalizedChapter = chapterSlug.trim().toLowerCase();
    const escapedClass = classSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const result = await this.aggregate({ pipeline: [
      {
        $match: {
          slug: normalizedChapter,
          status: "active"
        }
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $match: {
          "classDoc.status": "active",
          $or: [
            { "classDoc.slug": normalizedClass },
            { "classDoc.name": { $regex: `^${escapedClass}$`, $options: "i" } }
          ]
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDoc"
        }
      },
      { $unwind: { path: "$bookDoc", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          chapterId: "$_id",
          name: 1,
          slug: 1,
          status: 1,
          description: 1,
          content: 1,
          order: 1,
          classId: "$classDoc._id",
          bookId: "$bookDoc._id",
          className: "$classDoc.name",
          bookName: "$bookDoc.name"
        }
      },
      { $limit: 1 }
    ] });
    return result[0] || null;
  }
  async getChapterByClassAndBookName(className, bookName) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDoc"
        }
      },
      { $unwind: "$bookDoc" },
      {
        $match: {
          "classDoc.status": "active",
          "bookDoc.status": "active",
          $and: [
            {
              $or: [
                { "classDoc.slug": normalizedClass },
                { "classDoc.name": { $regex: `^${escapedClass}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "bookDoc.slug": normalizedBook },
                { "bookDoc.name": { $regex: `^${escapedBook}$`, $options: "i" } }
              ]
            }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1
        }
      },
      { $sort: { order: 1, name: 1 } }
    ] });
  }
};
var chapterRepository = new ChapterRepository();

// src/routers/chapter/chapterGetAll.ts
import { buildMatch as buildMatch7 } from "@muzammil328/db";
var chapterGetAll = superAdminProcedure.input(getChaptersInputSchema).query(async ({ input }) => {
  try {
    const result = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(buildMatch7(
        { status: input.status }
      )).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        chapterId: "$_id",
        name: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        className: "$class.name",
        bookName: "$book.name",
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        serviceId: 1,
        services: 1
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Chapters fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError15(e);
  }
});

// src/routers/chapter/chapterGetDropdown.ts
import { toTrpcError as toTrpcError16 } from "@muzammil328/trpc";
import { buildMatch as buildMatch8, toObjectId as toObjectId6 } from "@muzammil328/db";
var chapterGetDropdown = superAdminProcedure.input(getChapterDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    if (!classId) {
      throw new Error("Class ID is required");
    }
    const result = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(
        buildMatch8({
          status: StatusEnum.Active,
          classId: toObjectId6(classId)
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError16(e);
  }
});

// src/routers/chapter/chapterGetById.ts
import { toTrpcError as toTrpcError17 } from "@muzammil328/trpc";
import { AppError as AppError12 } from "@muzammil328/server";
import { buildMatch as buildMatch9, toObjectId as toObjectId7 } from "@muzammil328/db";
var chapterGetById = superAdminProcedure.input(getChapterByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(
        buildMatch9({
          _id: toObjectId7(input.id)
        })
      ).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name", "_id"],
        unwind: false
      }).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).project({
        _id: 0,
        chapterId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        serviceId: 1,
        services: 1,
        content: 1,
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        class: {
          $let: {
            vars: { c: { $first: "$class" } },
            in: { classId: "$$c._id", name: "$$c.name" }
          }
        },
        book: {
          $let: {
            vars: { b: { $first: "$book" } },
            in: { bookId: "$$b._id", name: "$$b.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError12.notFound("Chapter not found");
    }
    return {
      success: true,
      message: "Chapter fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError17(e);
  }
});

// src/routers/chapter/chapterDelete.ts
import { AppError as AppError13 } from "@muzammil328/server";
import { toTrpcError as toTrpcError18 } from "@muzammil328/trpc";
var chapterDelete = superAdminProcedure.input(deleteChapterInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await chapterRepository.findByIdAndDelete(toObjectId(input.id));
    if (!deleted) {
      throw AppError13.notFound("Chapter not found");
    }
    return {
      success: true,
      message: "Chapter deleted successfully"
    };
  } catch (e) {
    throw toTrpcError18(e);
  }
});

// src/routers/chapter/chapterCreate.ts
import { AppError as AppError14 } from "@muzammil328/server";
import { toTrpcError as toTrpcError19 } from "@muzammil328/trpc";
var chapterCreate = superAdminProcedure.input(chapterCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await chapterRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError14.badRequest("Chapter already exists");
    }
    const created = await chapterRepository.create({
      name: input.name,
      status: input.status,
      bookId: toObjectId(input.bookId),
      classId: toObjectId(input.classId),
      description: input.description,
      content: input.content,
      order: input.order
    });
    return {
      success: true,
      message: "Chapter created successfully",
      data: {
        chapterId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError19(e);
  }
});

// src/routers/chapter/chapterUpdate.ts
import { AppError as AppError15 } from "@muzammil328/server";
import { toTrpcError as toTrpcError20 } from "@muzammil328/trpc";
import { resolveObjectId as resolveObjectId3, toObjectId as toObjectId8 } from "@muzammil328/db";
var chapterUpdate = superAdminProcedure.input(updateChapterInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await chapterRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId3(input.id)
      }
    });
    if (duplicate) {
      throw AppError15.badRequest("Chapter already exists");
    }
    const updated = await chapterRepository.findByIdAndUpdate(
      toObjectId8(input.id),
      {
        name: input.updates.name,
        status: input.updates.status,
        bookId: toObjectId8(input.updates.bookId),
        classId: toObjectId8(input.updates.classId),
        description: input.updates.description,
        content: input.updates.content,
        order: input.updates.order
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError15.notFound("Chapter not found");
    }
    return {
      success: true,
      message: "Chapter updated successfully",
      data: {
        chapterId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status
      }
    };
  } catch (e) {
    throw toTrpcError20(e);
  }
});

// src/routers/chapter/chapter.router.ts
var chapterRouter = createTRPCRouter({
  getAll: chapterGetAll,
  getDropdown: chapterGetDropdown,
  getById: chapterGetById,
  create: chapterCreate,
  update: chapterUpdate,
  delete: chapterDelete
});

// src/routers/class/classCreate.ts
import { AppError as AppError16 } from "@muzammil328/server";
import { toTrpcError as toTrpcError21 } from "@muzammil328/trpc";

// src/models/class.model.ts
import mongoose7, { Schema as Schema6 } from "mongoose";
var ClassSchema = new Schema6(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String },
    serviceId: [{ type: Schema6.Types.ObjectId, ref: "Service", index: true }],
    status: { type: String, enum: StatusEnum, default: StatusEnum.Active },
    image: { type: String },
    keywords: [{ type: String }]
  },
  { timestamps: true }
);
ClassSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var Class = mongoose7.model("Class", ClassSchema);
var class_model_default = Class;

// src/repository/class.repository.ts
var ClassRepository = class extends BaseRepository {
  constructor() {
    super(class_model_default);
  }
};
var classRepository = new ClassRepository();

// src/routers/class/classCreate.ts
import { parseObjectIdList as parseObjectIdList2 } from "@muzammil328/db";
var classCreate = superAdminProcedure.input(classCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await classRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError16.badRequest("Class already exists");
    }
    const created = await classRepository.create({
      name: input.name.trim(),
      description: input.description?.trim(),
      serviceId: parseObjectIdList2(input.serviceIds),
      status: input.status,
      image: input.image?.trim(),
      keywords: input.keywords?.map((k) => k.trim()) ?? []
    });
    return {
      success: true,
      message: "Class created successfully",
      data: {
        classId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError21(e);
  }
});

// src/routers/class/classGetAll.ts
import { toTrpcError as toTrpcError22 } from "@muzammil328/trpc";
import { buildMatch as buildMatch10 } from "@muzammil328/db";
var classGetAll = superAdminProcedure.input(getClassesInputSchema).query(async ({ input }) => {
  try {
    const result = await classRepository.aggregate({
      pipeline: classRepository.pipeline().match(buildMatch10(
        { status: input.status }
      )).lookupOne({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        classId: "$_id",
        name: 1,
        status: 1,
        serviceName: "$service.name"
        // flat field, not array
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Classes fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError22(e);
  }
});

// src/routers/class/classGetById.ts
import { toTrpcError as toTrpcError23 } from "@muzammil328/trpc";
import { AppError as AppError17 } from "@muzammil328/server";
import { buildMatch as buildMatch11, toObjectId as toObjectId9 } from "@muzammil328/db";
var classGetById = superAdminProcedure.input(getClassByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await classRepository.aggregate({
      pipeline: classRepository.pipeline().match(
        buildMatch11({
          _id: toObjectId9(input.id)
        })
      ).lookupOne({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
        pick: ["name", "_id"],
        unwind: false
      }).project({
        _id: 0,
        classId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        image: 1,
        keywords: 1,
        service: {
          $map: {
            input: "$service",
            as: "svc",
            in: { serviceId: "$$svc._id", name: "$$svc.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError17.notFound("Class not found");
    }
    return {
      success: true,
      message: "Class fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError23(e);
  }
});

// src/routers/class/classUpdate.ts
import { AppError as AppError18 } from "@muzammil328/server";
import { toTrpcError as toTrpcError24 } from "@muzammil328/trpc";
import { parseObjectIdList as parseObjectIdList3, resolveObjectId as resolveObjectId4 } from "@muzammil328/db";
import { Types as Types8 } from "mongoose";
var classUpdate = superAdminProcedure.input(updateClassInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await classRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId4(input.id)
      }
    });
    if (duplicate) {
      throw AppError18.badRequest("Class already exists");
    }
    const updated = await classRepository.findByIdAndUpdate(
      new Types8.ObjectId(input.id),
      {
        ...input.updates,
        serviceId: parseObjectIdList3(input.updates.serviceIds)
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError18.notFound("Class not found");
    }
    return {
      success: true,
      message: "Class updated successfully",
      data: {
        classId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status,
        serviceIds: (updated.serviceId ?? []).map(
          (id) => String(id)
        ),
        image: updated.image,
        keywords: updated.keywords ?? []
      }
    };
  } catch (e) {
    throw toTrpcError24(e);
  }
});

// src/routers/class/classDelete.ts
import { Types as Types9 } from "mongoose";
import { AppError as AppError19 } from "@muzammil328/server";
import { toTrpcError as toTrpcError25 } from "@muzammil328/trpc";
var classDelete = superAdminProcedure.input(deleteClassInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await classRepository.findByIdAndDelete(new Types9.ObjectId(input.id));
    if (!deleted) {
      throw AppError19.notFound("Class not found");
    }
    return {
      success: true,
      message: "Class deleted successfully"
    };
  } catch (e) {
    throw toTrpcError25(e);
  }
});

// src/routers/class/classGetDropdown.ts
import { toTrpcError as toTrpcError26 } from "@muzammil328/trpc";
import { buildMatch as buildMatch12 } from "@muzammil328/db";
var classGetDropdown = superAdminProcedure.input(dropdownClassInputSchema).query(async ({ input }) => {
  try {
    const { serviceId } = input;
    const result = await classRepository.aggregate({
      pipeline: classRepository.pipeline().match(
        buildMatch12({
          status: StatusEnum.Active,
          serviceIds: serviceId
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
      // no search/pagination needed here
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError26(e);
  }
});

// src/routers/class/class.router.ts
var classRouter = createTRPCRouter({
  create: classCreate,
  getAll: classGetAll,
  getDropdown: classGetDropdown,
  getById: classGetById,
  update: classUpdate,
  delete: classDelete
});

// src/routers/classGroup.router.ts
import { toTrpcError as toTrpcError27 } from "@muzammil328/trpc";
import { TRPCError as TRPCError3 } from "@trpc/server";

// src/services/classGroup.service.ts
import { TRPCError as TRPCError2 } from "@trpc/server";
import { Types as Types10 } from "mongoose";

// src/models/classGroup.model.ts
import mongoose8, { Schema as Schema7 } from "mongoose";
var ClassGroupSchema2 = new Schema7(
  {
    name: { type: String, required: true },
    admin: { type: Schema7.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema7.Types.ObjectId, ref: "User" }],
    classIds: [{ type: Schema7.Types.ObjectId, ref: "Class" }],
    subscription: { type: Schema7.Types.ObjectId, ref: "Payment" }
  },
  { timestamps: true }
);
ClassGroupSchema2.index({ admin: 1 });
var classGroup_model_default = mongoose8.model("ClassGroup", ClassGroupSchema2);

// src/repository/classGroup.repository.ts
var ClassGroupRepository = class extends BaseRepository {
  constructor() {
    super(classGroup_model_default);
  }
  // ---------------- CUSTOM METHODS ----------------
};
var classGroupRepository = new ClassGroupRepository();

// src/services/classGroup.service.ts
var classGroupService = {
  async create(adminId, input) {
    const group = await classGroupRepository.create({
      name: input.name,
      admin: new Types10.ObjectId(adminId),
      members: [],
      classIds: input.classIds?.map((id) => new Types10.ObjectId(id)) || []
    });
    return {
      groupId: String(group._id),
      name: group.name
    };
  },
  async addStudents(input) {
    const group = await classGroupRepository.findById(new Types10.ObjectId(input.groupId));
    if (!group) {
      throw new TRPCError2({ code: "NOT_FOUND", message: "Class group not found" });
    }
    const existingMemberIds = group.members.map((m) => m.toString());
    const newMembers = input.studentIds.filter((id) => !existingMemberIds.includes(id)).map((id) => new Types10.ObjectId(id));
    const updated = await classGroupRepository.findByIdAndUpdate(
      new Types10.ObjectId(input.groupId),
      { $addToSet: { members: { $each: newMembers } } },
      { new: true }
    );
    return {
      groupId: String(updated?._id),
      memberCount: updated?.members.length || 0
    };
  },
  async getAll(adminId) {
    const groups = await classGroupRepository.findAll({
      query: { admin: new Types10.ObjectId(adminId) }
    });
    return groups.map((group) => ({
      groupId: String(group._id),
      name: group.name,
      memberCount: group.members.length,
      createdAt: group.createdAt
    }));
  },
  async getById(groupId) {
    const result = await classGroupRepository.aggregate({ pipeline: [
      { $match: { _id: new Types10.ObjectId(groupId) } },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "memberDetails"
        }
      },
      {
        $project: {
          _id: 0,
          groupId: "$_id",
          name: 1,
          memberCount: { $size: "$members" },
          members: {
            $map: {
              input: "$memberDetails",
              as: "member",
              in: {
                userId: { $toString: "$$member._id" },
                username: "$$member.username",
                email: "$$member.email"
              }
            }
          },
          createdAt: 1
        }
      }
    ] });
    if (!result.length) {
      throw new TRPCError2({ code: "NOT_FOUND", message: "Class group not found" });
    }
    return result[0];
  }
};

// src/routers/classGroup.router.ts
var classGroupRouter = createTRPCRouter({
  create: protectedProcedure.input(ClassGroupSchema).mutation(async ({ ctx, input }) => {
    try {
      const user = ctx.user;
      if (!user) {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Not authenticated" });
      }
      const result = await classGroupService.create(user.userId, input);
      return {
        success: true,
        message: "Class group created successfully",
        data: { groupId: result.groupId, name: result.name }
      };
    } catch (e) {
      throw toTrpcError27(e);
    }
  }),
  addStudents: protectedProcedure.input(AddStudentsToClassGroupSchema).mutation(async ({ input }) => {
    try {
      const result = await classGroupService.addStudents(input);
      return {
        success: true,
        message: "Students added to class group",
        data: { groupId: result.groupId, memberCount: result.memberCount }
      };
    } catch (e) {
      throw toTrpcError27(e);
    }
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = ctx.user;
      if (!user) {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Not authenticated" });
      }
      const result = await classGroupService.getAll(user.userId);
      return {
        success: true,
        message: "Class groups fetched successfully",
        data: result
      };
    } catch (e) {
      throw toTrpcError27(e);
    }
  }),
  getById: protectedProcedure.input(GetClassGroupDetailsSchema).query(async ({ input }) => {
    try {
      const result = await classGroupService.getById(input.groupId);
      return { success: true, data: result };
    } catch (e) {
      throw toTrpcError27(e);
    }
  })
});

// src/routers/feedback.router.ts
import { Types as Types11 } from "mongoose";
import { AppError as AppError20 } from "@muzammil328/server";
import { toTrpcError as toTrpcError28 } from "@muzammil328/trpc";

// src/models/feedback.model.ts
import mongoose9, { Schema as Schema8 } from "mongoose";
var FeedbackSchema = new Schema8(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(FeedbackTypeEnum),
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: Object.values(FeedbackStatusEnum),
      default: "pending",
      index: true
    }
  },
  { timestamps: true }
);
FeedbackSchema.index({ createdAt: -1 });
var feedback_model_default = mongoose9.model("Feedback", FeedbackSchema);

// src/repository/feedback.repository.ts
var FeedbackRepository = class extends BaseRepository {
  constructor() {
    super(feedback_model_default);
  }
  async findByType(type) {
    return this.findAll({ query: { type } });
  }
  async findByStatus(status) {
    return this.findAll({ query: { status } });
  }
};
var feedbackRepository = new FeedbackRepository();

// src/routers/feedback.router.ts
var feedbackRouter = createTRPCRouter({
  create: publicProcedure.input(createFeedbackSchema).mutation(async ({ input }) => {
    const created = await feedbackRepository.create({ ...input, status: "pending" });
    return {
      success: true,
      message: "Feedback submitted successfully",
      data: {
        feedbackId: String(created._id),
        name: created.name,
        email: created.email,
        type: created.type,
        status: created.status
      }
    };
  }),
  getAll: publicProcedure.input(getFeedbackInputSchema).query(async ({ input }) => {
    const sortOrder = input.sortDirection === "desc" ? -1 : 1;
    const match = {};
    if (input.type) match.type = input.type;
    if (input.status) match.status = input.status;
    const result = await feedbackRepository.aggregate({
      pipeline: [
        { $match: match },
        { $sort: { [input.sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            feedbackId: "$_id",
            name: 1,
            email: 1,
            phone: 1,
            message: 1,
            type: 1,
            status: 1,
            createdAt: 1
          }
        }
      ],
      page: input.page,
      limit: input.limit
    });
    return {
      success: true,
      message: "Feedback fetched successfully",
      data: (result.data || []).map((item) => ({
        feedbackId: String(item.feedbackId),
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
        type: item.type,
        status: item.status,
        createdAt: item.createdAt
      })),
      pagination: result.pagination
    };
  }),
  getById: publicProcedure.input(getFeedbackByIdInputSchema).query(async ({ input }) => {
    if (!Types11.ObjectId.isValid(input.id)) {
      throw toTrpcError28(AppError20.badRequest("Invalid feedback ID format"));
    }
    const result = await feedbackRepository.findById(new Types11.ObjectId(input.id));
    if (!result) {
      throw toTrpcError28(AppError20.notFound("Feedback not found"));
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
      updatedAt: result.updatedAt
    };
  }),
  updateStatus: publicProcedure.input(updateFeedbackStatusSchema).mutation(async ({ input }) => {
    const updated = await feedbackRepository.findByIdAndUpdate(
      new Types11.ObjectId(input.id),
      { status: input.status },
      { new: true }
    );
    if (!updated) {
      throw toTrpcError28(AppError20.notFound("Feedback not found"));
    }
    return {
      success: true,
      message: "Feedback status updated successfully",
      data: { feedbackId: String(updated._id), status: updated.status }
    };
  })
});

// src/routers/comment.router.ts
import { Types as Types12 } from "mongoose";
import { AppError as AppError21 } from "@muzammil328/server";
import { toTrpcError as toTrpcError29 } from "@muzammil328/trpc";

// src/models/comment.model.ts
import mongoose10, { Schema as Schema9 } from "mongoose";
var CommentSchema = new Schema9(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    pageUrl: { type: String },
    message: { type: String, required: true }
  },
  { timestamps: true }
);
CommentSchema.index({ createdAt: -1 });
var comment_model_default = mongoose10.model("Comment", CommentSchema);

// src/repository/comment.repository.ts
var CommentRepository = class extends BaseRepository {
  constructor() {
    super(comment_model_default);
  }
};
var commentRepository = new CommentRepository();

// src/routers/comment.router.ts
var commentRouter = createTRPCRouter({
  create: publicProcedure.input(createCommentSchema).mutation(async ({ input }) => {
    const created = await commentRepository.create(input);
    return {
      success: true,
      message: "Comment submitted successfully",
      data: { commentId: String(created._id) }
    };
  }),
  getAll: publicProcedure.input(getCommentsSchema).query(async ({ input }) => {
    const sortOrder = input.sortDirection === "desc" ? -1 : 1;
    const result = await commentRepository.aggregate({
      pipeline: [
        { $sort: { [input.sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            commentId: "$_id",
            firstName: 1,
            lastName: 1,
            email: 1,
            pageUrl: 1,
            message: 1,
            createdAt: 1
          }
        }
      ],
      page: input.page,
      limit: input.limit
    });
    return {
      success: true,
      message: "Comments fetched successfully",
      data: (result.data || []).map((item) => ({
        commentId: String(item.commentId),
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        pageUrl: item.pageUrl,
        message: item.message,
        createdAt: item.createdAt
      })),
      pagination: result.pagination
    };
  }),
  getById: publicProcedure.input(getCommentByIdSchema).query(async ({ input }) => {
    if (!Types12.ObjectId.isValid(input.id)) {
      throw toTrpcError29(AppError21.badRequest("Invalid comment ID"));
    }
    const result = await commentRepository.findById(new Types12.ObjectId(input.id));
    if (!result) throw toTrpcError29(AppError21.notFound("Comment not found"));
    return {
      commentId: String(result._id),
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      pageUrl: result.pageUrl,
      message: result.message,
      createdAt: result.createdAt
    };
  }),
  delete: publicProcedure.input(deleteCommentSchema).mutation(async ({ input }) => {
    if (!Types12.ObjectId.isValid(input.id)) {
      throw toTrpcError29(AppError21.badRequest("Invalid comment ID"));
    }
    await commentRepository.findByIdAndDelete(new Types12.ObjectId(input.id));
    return { success: true, message: "Comment deleted successfully" };
  })
});

// src/routers/heading/headingGetAll.ts
import { toTrpcError as toTrpcError30 } from "@muzammil328/trpc";

// src/models/heading.model.ts
import mongoose11, { Schema as Schema10 } from "mongoose";
var HeadingSchema = new Schema10(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    chapterId: { type: Schema10.Types.ObjectId, ref: "Chapter", required: true },
    bookId: { type: Schema10.Types.ObjectId, ref: "Book", required: true },
    classId: { type: Schema10.Types.ObjectId, ref: "Class", required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number }
  },
  { timestamps: true }
);
HeadingSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var Heading = mongoose11.model("Heading", HeadingSchema);
var heading_model_default = Heading;

// src/repository/heading.repository.ts
var HeadingRepository = class extends BaseRepository {
  constructor() {
    super(heading_model_default);
  }
  async findBySlug(slug, chapterId) {
    const query = { slug: slug.toLowerCase() };
    if (chapterId) query.chapterId = chapterId;
    return this.findOne(query);
  }
  async findByChapter(chapterId, status) {
    const query = { chapterId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async findByBook(bookId, status) {
    const query = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async getHeadingByName(name) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      {
        $match: {
          status: "active",
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: "i" } }]
        }
      },
      {
        $project: {
          _id: 0,
          headingId: "$_id",
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1
        }
      },
      { $sort: { name: 1 } }
    ] });
  }
  async getHeadingByClassAndBookAndChapterName(className, bookName, chapterName) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const normalizedChapter = chapterName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedChapter = chapterName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDoc"
        }
      },
      { $unwind: "$bookDoc" },
      {
        $lookup: {
          from: "chapters",
          localField: "chapterId",
          foreignField: "_id",
          as: "chapterDoc"
        }
      },
      { $unwind: "$chapterDoc" },
      {
        $match: {
          "classDoc.status": "active",
          "bookDoc.status": "active",
          "chapterDoc.status": "active",
          $and: [
            {
              $or: [
                { "classDoc.slug": normalizedClass },
                { "classDoc.name": { $regex: `^${escapedClass}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "bookDoc.slug": normalizedBook },
                { "bookDoc.name": { $regex: `^${escapedBook}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "chapterDoc.slug": normalizedChapter },
                { "chapterDoc.name": { $regex: `^${escapedChapter}$`, $options: "i" } }
              ]
            }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          headingId: "$_id",
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1
        }
      },
      { $sort: { order: 1, name: 1 } }
    ] });
  }
};
var headingRepository = new HeadingRepository();

// src/routers/heading/headingGetAll.ts
import { buildMatch as buildMatch13 } from "@muzammil328/db";
var headingGetAll = superAdminProcedure.input(getHeadingsInputSchema).query(async ({ input }) => {
  try {
    const result = await headingRepository.aggregate({
      pipeline: headingRepository.pipeline().match(buildMatch13(
        { status: input.status }
      )).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        headingId: "$_id",
        name: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        chapterId: 1,
        className: "$class.name",
        bookName: "$book.name",
        chapterName: "$chapter.name",
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        serviceId: 1,
        services: 1
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Headings fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError30(e);
  }
});

// src/routers/heading/headingGetDropdown.ts
import { toTrpcError as toTrpcError31 } from "@muzammil328/trpc";
import { buildMatch as buildMatch14 } from "@muzammil328/db";
var headingGetDropdown = superAdminProcedure.input(getHeadingDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    const result = await headingRepository.aggregate({
      pipeline: headingRepository.pipeline().match(
        buildMatch14({
          status: StatusEnum.Active,
          classId
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError31(e);
  }
});

// src/routers/heading/headingGetById.ts
import { toTrpcError as toTrpcError32 } from "@muzammil328/trpc";
import { AppError as AppError22 } from "@muzammil328/server";
import { buildMatch as buildMatch15, toObjectId as toObjectId10 } from "@muzammil328/db";
var headingGetById = superAdminProcedure.input(getHeadingByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await headingRepository.aggregate({
      pipeline: headingRepository.pipeline().match(
        buildMatch15({
          _id: toObjectId10(input.id)
        })
      ).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name", "_id"],
        unwind: false
      }).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).project({
        _id: 0,
        headingId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        chapterId: 1,
        serviceId: 1,
        services: 1,
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        class: {
          $let: {
            vars: { c: { $first: "$class" } },
            in: { classId: "$$c._id", name: "$$c.name" }
          }
        },
        book: {
          $let: {
            vars: { b: { $first: "$book" } },
            in: { bookId: "$$b._id", name: "$$b.name" }
          }
        },
        chapter: {
          $let: {
            vars: { ch: { $first: "$chapter" } },
            in: { chapterId: "$$ch._id", name: "$$ch.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError22.notFound("Heading not found");
    }
    return {
      success: true,
      message: "Heading fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError32(e);
  }
});

// src/routers/heading/headingDelete.ts
import { AppError as AppError23 } from "@muzammil328/server";
import { toTrpcError as toTrpcError33 } from "@muzammil328/trpc";
var headingDelete = superAdminProcedure.input(deleteHeadingInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await headingRepository.findByIdAndDelete(toObjectId(input.id));
    if (!deleted) {
      throw AppError23.notFound("Heading not found");
    }
    return {
      success: true,
      message: "Heading deleted successfully"
    };
  } catch (e) {
    throw toTrpcError33(e);
  }
});

// src/routers/heading/headingCreate.ts
import { AppError as AppError24 } from "@muzammil328/server";
import { toTrpcError as toTrpcError34 } from "@muzammil328/trpc";
import { toObjectId as toObjectId11 } from "@muzammil328/db";
var headingCreate = superAdminProcedure.input(headingCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await headingRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError24.badRequest("Heading already exists");
    }
    const created = await headingRepository.create({
      name: input.name,
      status: input.status,
      classId: toObjectId11(input.classId),
      bookId: toObjectId11(input.bookId),
      chapterId: toObjectId11(input.chapterId),
      order: input.order
    });
    return {
      success: true,
      message: "Heading created successfully",
      data: {
        headingId: created._id,
        name: created.name,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError34(e);
  }
});

// src/routers/heading/headingUpdate.ts
import { AppError as AppError25 } from "@muzammil328/server";
import { toTrpcError as toTrpcError35 } from "@muzammil328/trpc";
import { resolveObjectId as resolveObjectId5, toObjectId as toObjectId12 } from "@muzammil328/db";
var headingUpdate = superAdminProcedure.input(updateHeadingInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await headingRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId5(input.id)
      }
    });
    if (duplicate) {
      throw AppError25.badRequest("Heading already exists");
    }
    const updated = await headingRepository.findByIdAndUpdate(
      toObjectId12(input.id),
      {
        name: input.updates.name,
        status: input.updates.status,
        classId: toObjectId12(input.updates.classId),
        bookId: toObjectId12(input.updates.bookId),
        chapterId: toObjectId12(input.updates.chapterId),
        order: input.updates.order
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError25.notFound("Heading not found");
    }
    return {
      success: true,
      message: "Heading updated successfully",
      data: {
        headingId: String(updated._id),
        name: updated.name,
        status: updated.status
      }
    };
  } catch (e) {
    throw toTrpcError35(e);
  }
});

// src/routers/heading/heading.router.ts
var headingRouter = createTRPCRouter({
  getAll: headingGetAll,
  getDropdown: headingGetDropdown,
  getById: headingGetById,
  create: headingCreate,
  update: headingUpdate,
  delete: headingDelete
});

// src/routers/institution.router.ts
import { Types as Types13 } from "mongoose";
import { AppError as AppError26 } from "@muzammil328/server";
import { toTrpcError as toTrpcError36 } from "@muzammil328/trpc";

// src/models/institution.model.ts
import mongoose12, { Schema as Schema11 } from "mongoose";
var InstitutionSchema2 = new Schema11(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: Object.values(InstitutionTypeEnum), required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    classes: [{ type: Schema11.Types.ObjectId, ref: "Class" }],
    subscriptionPlan: {
      type: String,
      enum: Object.values(SubscriptionPlanEnum),
      default: SubscriptionPlanEnum.FREE
    },
    subscriptionExpiresAt: { type: Date },
    maxStudents: { type: Number, default: 50 },
    maxTeachers: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);
InstitutionSchema2.index({ email: 1 }, { unique: true });
InstitutionSchema2.index({ type: 1, isActive: 1 });
var institution_model_default = mongoose12.model("Institution", InstitutionSchema2);

// src/routers/institution.router.ts
function escapeRegex2(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var institutionRouter = createTRPCRouter({
  getAll: superAdminProcedure.input(getInstitutionsInputSchema).query(async ({ input }) => {
    const filter = {};
    if (input.status !== "all") filter.status = input.status;
    if (input.search) {
      const re = escapeRegex2(input.search);
      filter.$or = [
        { name: { $regex: re, $options: "i" } },
        { code: { $regex: re, $options: "i" } }
      ];
    }
    const offset = (input.page - 1) * input.limit;
    const sortOrder = input.sortDirection === "desc" ? -1 : 1;
    const [data, totalRecords] = await Promise.all([
      institution_model_default.find(filter).sort({ [input.sort]: sortOrder }).skip(offset).limit(input.limit).lean(),
      institution_model_default.countDocuments(filter)
    ]);
    const totalPages = Math.ceil(totalRecords / input.limit);
    return {
      success: true,
      message: "Institutions fetched successfully",
      data: data.map((item) => ({
        institutionId: String(item._id),
        name: item.name,
        slug: item.slug,
        code: item.code,
        contactEmail: item.contactEmail,
        address: item.address,
        status: item.status
      })),
      pagination: { totalRecords, totalPages, currentPage: input.page, pageSize: input.limit }
    };
  }),
  getDropdown: protectedProcedure.input(getInstitutionsInputSchema.pick({ search: true }).optional()).query(async ({ input }) => {
    const filter = { status: "active" };
    if (input?.search) {
      filter.name = { $regex: escapeRegex2(input.search), $options: "i" };
    }
    const result = await institution_model_default.find(filter).select("_id name code").limit(50).lean();
    return result.map((item) => ({
      value: String(item._id),
      label: `${item.name} (${item.code})`
    }));
  }),
  getById: superAdminProcedure.input(getInstitutionByIdInputSchema).query(async ({ input }) => {
    if (!Types13.ObjectId.isValid(input.id)) {
      throw toTrpcError36(AppError26.badRequest("Invalid institution ID"));
    }
    const institution = await institution_model_default.findById(input.id).populate("classes", "name slug").lean();
    if (!institution) {
      throw toTrpcError36(AppError26.notFound("Institution not found"));
    }
    return {
      institutionId: String(institution._id),
      name: institution.name,
      slug: institution.slug,
      code: institution.code,
      contactEmail: institution.contactEmail,
      address: institution.address,
      status: institution.status,
      ownerUserId: institution.ownerUserId ? String(institution.ownerUserId) : void 0
    };
  }),
  create: superAdminProcedure.input(InstitutionSchema).mutation(async ({ input }) => {
    const exists = await institution_model_default.findOne({ contactEmail: input.contactEmail });
    if (exists) {
      throw toTrpcError36(AppError26.conflict("Institution with this email already exists"));
    }
    const institution = await institution_model_default.create({ ...input });
    return {
      success: true,
      message: "Institution created successfully",
      data: { id: String(institution._id) }
    };
  }),
  update: superAdminProcedure.input(updateInstitutionInputSchema).mutation(async ({ input }) => {
    if (!Types13.ObjectId.isValid(input.id)) {
      throw toTrpcError36(AppError26.badRequest("Invalid institution ID"));
    }
    const updated = await institution_model_default.findByIdAndUpdate(input.id, input.updates, {
      new: true
    }).lean();
    if (!updated) {
      throw toTrpcError36(AppError26.notFound("Institution not found"));
    }
    return { success: true, message: "Institution updated successfully" };
  }),
  updateSubscription: superAdminProcedure.input(updateInstitutionSubscriptionSchema).mutation(async ({ input }) => {
    if (!Types13.ObjectId.isValid(input.id)) {
      throw toTrpcError36(AppError26.badRequest("Invalid institution ID"));
    }
    const updated = await institution_model_default.findByIdAndUpdate(
      input.id,
      { ...input.updates },
      { new: true }
    ).lean();
    if (!updated) {
      throw toTrpcError36(AppError26.notFound("Institution not found"));
    }
    return {
      success: true,
      message: "Institution updated successfully",
      data: { institutionId: String(updated._id) }
    };
  }),
  delete: superAdminProcedure.input(deleteInstitutionInputSchema).mutation(async ({ input }) => {
    if (!Types13.ObjectId.isValid(input.id)) {
      throw toTrpcError36(AppError26.badRequest("Invalid institution ID"));
    }
    const deleted = await institution_model_default.findByIdAndDelete(input.id).lean();
    if (!deleted) {
      throw toTrpcError36(AppError26.notFound("Institution not found"));
    }
    return { success: true, message: "Institution deleted successfully" };
  })
});

// src/routers/mcqAttempt.router.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { z as z19 } from "zod";
import { Types as Types17 } from "mongoose";

// src/models/mcqs.model.ts
import mongoose13, { Schema as Schema12 } from "mongoose";
var McqsSchema = new Schema12(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, maxlength: 1e3 },
    classId: { type: Schema12.Types.ObjectId, ref: "Class", required: true },
    bookId: { type: Schema12.Types.ObjectId, ref: "Book", required: true },
    chapterId: { type: Schema12.Types.ObjectId, ref: "Chapter", required: true },
    headingId: { type: Schema12.Types.ObjectId, ref: "Heading" },
    subHeadingId: { type: Schema12.Types.ObjectId, ref: "SubHeading" },
    scope: {
      type: String,
      enum: Object.values(McqScopeEnum),
      default: McqScopeEnum.GLOBAL,
      index: true
    },
    institutionId: { type: Schema12.Types.ObjectId, ref: "Institution", index: true },
    question: { type: String, required: true, trim: true, minlength: 5 },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 2,
        message: "Mcqs must have at least 2 options"
      },
      set: (opts) => Array.from(new Set(opts))
      // remove duplicates
    },
    correctOption: { type: Number, required: true, min: 0 },
    explanation: { type: String, trim: true, maxlength: 2e3 },
    difficulty: { type: String, enum: Object.values(DifficultyEnum), default: DifficultyEnum.Medium },
    aiHint: { type: String, trim: true, maxlength: 500 },
    isPremium: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    cognitiveLevel: { type: String, enum: ["recall", "understand", "apply", "analyze"] },
    distractorType: {
      type: String,
      enum: ["similar_sounding", "partially_correct", "opposite", "unrelated"]
    },
    examinersNote: { type: String, trim: true, maxlength: 1e3, select: false },
    conceptNode: { type: String, trim: true },
    commonMisconception: { type: String, trim: true, maxlength: 500 },
    examSourceTag: { type: String, enum: ["past_paper", "predicted", "original"] },
    examYear: { type: Number },
    historicalWrongRate: { type: Number, min: 0, max: 100 },
    askedInExams: [
      {
        examName: { type: String, trim: true },
        year: { type: Number },
        board: { type: String, trim: true },
        _id: false
      }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
McqsSchema.virtual("totalOptions").get(function() {
  return this.options.length;
});
McqsSchema.pre("validate", function(next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
McqsSchema.index({ slug: 1 });
McqsSchema.index({ chapterId: 1, difficulty: 1, status: 1 });
McqsSchema.index({ bookId: 1, status: 1 });
McqsSchema.index({ classId: 1, scope: 1, status: 1 });
var Mcqs = mongoose13.model("Mcqs", McqsSchema);
var mcqs_model_default = Mcqs;

// src/models/mcqAttempt.model.ts
import mongoose14, { Schema as Schema13 } from "mongoose";
var mcqAttemptSchema = new Schema13(
  {
    userId: { type: Schema13.Types.ObjectId, ref: "User", required: true, index: true },
    institutionId: { type: Schema13.Types.ObjectId, ref: "Institution", index: true },
    mcqId: { type: Schema13.Types.ObjectId, ref: "Mcqs", required: true, index: true },
    selectedOption: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    timeTakenMs: { type: Number },
    attemptedAt: { type: Date, default: Date.now, index: true },
    confidenceTag: { type: String, enum: ["sure", "guessed", "no_idea"] },
    outcomeType: {
      type: String,
      enum: ["true_knowledge", "lucky_guess", "confident_mistake", "known_weakness"]
    },
    sessionId: { type: String, index: true },
    quizMode: {
      type: String,
      enum: [
        "practice",
        "exam_sim",
        "weak_topic",
        "focused_drill",
        "speed_round",
        "challenge",
        "revision",
        "micro_burst"
      ]
    }
  },
  { timestamps: true }
);
mcqAttemptSchema.index({ userId: 1, mcqId: 1, attemptedAt: -1 });
mcqAttemptSchema.index({ userId: 1, outcomeType: 1 });
mcqAttemptSchema.index({ userId: 1, sessionId: 1 });
mcqAttemptSchema.pre("save", function(next) {
  if (this.get("confidenceTag") !== void 0) {
    const sure = this.get("confidenceTag") === "sure";
    const correct = this.get("isCorrect");
    if (sure && correct) this.set("outcomeType", "true_knowledge");
    else if (!sure && correct) this.set("outcomeType", "lucky_guess");
    else if (sure && !correct) this.set("outcomeType", "confident_mistake");
    else this.set("outcomeType", "known_weakness");
  }
  next();
});
var McqAttempt = mongoose14.models.McqAttempt || mongoose14.model("McqAttempt", mcqAttemptSchema);
var mcqAttempt_model_default = McqAttempt;

// src/trpc/lib/resolveInstitution.ts
import { Types as Types14 } from "mongoose";
var cache = /* @__PURE__ */ new Map();
var TTL_MS = 6e4;
async function resolveUserInstitutionId(userId) {
  if (!Types14.ObjectId.isValid(userId)) return void 0;
  const now = Date.now();
  const cached = cache.get(userId);
  if (cached && cached.expiresAt > now) return cached.institutionId;
  const user = await User.findById(userId).select("institutionId").lean();
  const institutionId = user?.institutionId ? String(user.institutionId) : void 0;
  cache.set(userId, { institutionId, expiresAt: now + TTL_MS });
  return institutionId;
}

// src/services/userProgress.service.ts
init_userProgress_model();
import { Types as Types15 } from "mongoose";
var MASTERY_CORRECT_DELTA = 5;
var MASTERY_WRONG_DELTA = 8;
var MAX_SPACED_INTERVAL_DAYS = 30;
var CONFIDENT_MISTAKE_OPEN_LOOP_THRESHOLD = 3;
var WRONG_ANSWER_OPEN_LOOP_THRESHOLD = 3;
function computeMasteryBand(score) {
  if (score >= 70) return "strong";
  if (score >= 40) return "developing";
  return "weak";
}
function computeDifficultyBand(band) {
  if (band === "strong") return "hard";
  if (band === "developing") return "medium";
  return "easy";
}
async function updateUserProgressOnAttempt(params) {
  const { userId, mcqId, isCorrect, isConfidentMistake } = params;
  const mcq = await mcqs_model_default.findById(mcqId).select("subHeadingId headingId chapterId bookId classId").lean();
  if (!mcq) return;
  const filter = {
    user: new Types15.ObjectId(userId),
    ...mcq.subHeadingId ? { subHeadingId: mcq.subHeadingId } : mcq.headingId ? { headingId: mcq.headingId } : { chapterId: mcq.chapterId }
  };
  const progress = await userProgress_model_default.findOne(filter);
  if (!progress) {
    const masteryScore = isCorrect ? MASTERY_CORRECT_DELTA : 0;
    const masteryBand = computeMasteryBand(masteryScore);
    await userProgress_model_default.create({
      user: new Types15.ObjectId(userId),
      classId: mcq.classId,
      bookId: mcq.bookId,
      chapterId: mcq.chapterId,
      headingId: mcq.headingId ?? void 0,
      subHeadingId: mcq.subHeadingId ?? void 0,
      correct: isCorrect ? 1 : 0,
      incorrect: isCorrect ? 0 : 1,
      totalAttempts: 1,
      masteryScore,
      masteryBand,
      currentDifficultyBand: computeDifficultyBand(masteryBand),
      lastAttempt: /* @__PURE__ */ new Date(),
      confidentMistakeCount: isConfidentMistake ? 1 : 0,
      openLoopCount: isConfidentMistake ? 1 : 0,
      spacedRepetitionInterval: isCorrect ? 1 : 1,
      nextReviewAt: new Date(Date.now() + 864e5),
      retryCount: isCorrect ? 0 : 1
    });
    return;
  }
  const newCorrect = progress.correct + (isCorrect ? 1 : 0);
  const newIncorrect = progress.incorrect + (isCorrect ? 0 : 1);
  const newTotal = (progress.totalAttempts ?? 0) + 1;
  let newMasteryScore = (progress.masteryScore ?? 0) + (isCorrect ? MASTERY_CORRECT_DELTA : -MASTERY_WRONG_DELTA);
  newMasteryScore = Math.max(0, Math.min(100, newMasteryScore));
  const newMasteryBand = computeMasteryBand(newMasteryScore);
  const newDifficultyBand = computeDifficultyBand(newMasteryBand);
  let interval = progress.spacedRepetitionInterval ?? 1;
  if (isCorrect) {
    interval = Math.min(Math.round(interval * 2.5), MAX_SPACED_INTERVAL_DAYS);
  } else {
    interval = 1;
  }
  const nextReviewAt = new Date(Date.now() + interval * 864e5);
  const newConfidentMistakeCount = (progress.confidentMistakeCount ?? 0) + (isConfidentMistake ? 1 : 0);
  let newOpenLoopCount = progress.openLoopCount ?? 0;
  if (isConfidentMistake && newConfidentMistakeCount >= CONFIDENT_MISTAKE_OPEN_LOOP_THRESHOLD) {
    newOpenLoopCount = Math.max(newOpenLoopCount, 1);
  }
  if (!isCorrect && newIncorrect > 0 && newIncorrect % WRONG_ANSWER_OPEN_LOOP_THRESHOLD === 0) {
    newOpenLoopCount++;
  }
  await userProgress_model_default.updateOne(filter, {
    $set: {
      correct: newCorrect,
      incorrect: newIncorrect,
      totalAttempts: newTotal,
      masteryScore: newMasteryScore,
      masteryBand: newMasteryBand,
      currentDifficultyBand: newDifficultyBand,
      lastAttempt: /* @__PURE__ */ new Date(),
      spacedRepetitionInterval: interval,
      nextReviewAt,
      confidentMistakeCount: newConfidentMistakeCount,
      openLoopCount: newOpenLoopCount,
      retryCount: (progress.retryCount ?? 0) + (isCorrect ? 0 : 1)
    }
  });
}

// src/services/gamification.service.ts
import { Types as Types16 } from "mongoose";
init_userProgress_model();
async function awardBadge(userId, badge) {
  await user_model_default.updateOne(
    { _id: new Types16.ObjectId(userId), badges: { $ne: badge } },
    { $addToSet: { badges: badge } }
  );
}
async function checkAndAwardBadges(userId) {
  try {
    const [userDoc, progress] = await Promise.all([
      user_model_default.findById(new Types16.ObjectId(userId)).select("badges burstStreakCount").lean(),
      userProgress_model_default.find({ user: new Types16.ObjectId(userId) }).lean()
    ]);
    if (!userDoc || !progress.length) return;
    const existingBadges = userDoc.badges ?? [];
    if (!existingBadges.includes("conquer_it")) {
      const hasStrong = progress.some((p) => p.masteryBand === "strong");
      if (hasStrong) await awardBadge(userId, "conquer_it");
    }
    if (!existingBadges.includes("open_loop_closer")) {
      const allClear = progress.every((p) => (p.openLoopCount ?? 0) === 0);
      if (allClear && progress.length >= 3) await awardBadge(userId, "open_loop_closer");
    }
    if (!existingBadges.includes("confident_mistake_zero")) {
      const noMistakes = progress.every((p) => (p.confidentMistakeCount ?? 0) === 0);
      if (noMistakes && progress.length >= 5) await awardBadge(userId, "confident_mistake_zero");
    }
    const streakCount = userDoc.burstStreakCount ?? 0;
    if (streakCount >= 3 && !existingBadges.includes("burst_streak_3")) await awardBadge(userId, "burst_streak_3");
    if (streakCount >= 7 && !existingBadges.includes("burst_streak_7")) await awardBadge(userId, "burst_streak_7");
    if (streakCount >= 30 && !existingBadges.includes("burst_streak_30")) await awardBadge(userId, "burst_streak_30");
    if (!existingBadges.includes("exam_ready")) {
      const strong = progress.filter((p) => p.masteryBand === "strong").length;
      if (progress.length >= 5 && strong / progress.length >= 0.8) {
        await awardBadge(userId, "exam_ready");
      }
    }
  } catch {
  }
}
async function completeBurst(userId) {
  const user = await user_model_default.findById(new Types16.ObjectId(userId)).select("lastBurstDate burstStreakCount").lean();
  if (!user) return;
  const now = /* @__PURE__ */ new Date();
  const lastBurst = user.lastBurstDate ? new Date(user.lastBurstDate) : null;
  const isConsecutive = lastBurst ? now.getTime() - lastBurst.getTime() < 2 * 864e5 : false;
  const newStreak = isConsecutive ? (user.burstStreakCount ?? 0) + 1 : 1;
  await user_model_default.findByIdAndUpdate(new Types16.ObjectId(userId), {
    lastBurstDate: now,
    burstStreakCount: newStreak
  });
  await checkAndAwardBadges(userId);
}

// src/routers/mcqAttempt.router.ts
var submitInputSchema = z19.object({
  mcqId: z19.string().min(1),
  selectedOption: z19.number().int().min(0),
  timeTakenMs: z19.number().int().min(0).optional(),
  confidenceTag: z19.enum(["sure", "guessed", "no_idea"]).optional(),
  sessionId: z19.string().optional(),
  quizMode: z19.enum(["practice", "exam_sim", "weak_topic", "focused_drill", "speed_round", "challenge", "revision", "micro_burst"]).optional()
});
var historyInputSchema = z19.object({
  page: z19.number().int().positive().optional().default(1),
  limit: z19.number().int().positive().max(100).optional().default(20)
});
var leaderboardInputSchema = z19.object({
  limit: z19.number().int().positive().max(100).optional().default(20)
});
var mcqAttemptRouter = createTRPCRouter({
  /**
   * Append-only attempt submission. Correctness is computed server-side from the
   * stored MCQ; the client cannot override `isCorrect`. There is no update or
   * delete procedure — scores can only be modified directly in MongoDB.
   */
  submit: protectedProcedure.input(submitInputSchema).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    if (!Types17.ObjectId.isValid(input.mcqId)) {
      throw new TRPCError4({ code: "BAD_REQUEST", message: "Invalid MCQ ID" });
    }
    const mcq = await mcqs_model_default.findById(input.mcqId).lean();
    if (!mcq) throw new TRPCError4({ code: "NOT_FOUND", message: "MCQ not found" });
    const userInstitutionId = await resolveUserInstitutionId(user.userId);
    if (mcq.scope === McqScopeEnum.INSTITUTION) {
      const mcqInstId = mcq.institutionId ? String(mcq.institutionId) : void 0;
      if (!mcqInstId || mcqInstId !== userInstitutionId) {
        throw new TRPCError4({
          code: "FORBIDDEN",
          message: "This MCQ is not available to your institution"
        });
      }
    }
    if (input.selectedOption >= mcq.options.length) {
      throw new TRPCError4({ code: "BAD_REQUEST", message: "Invalid option index" });
    }
    const isCorrect = input.selectedOption === mcq.correctOption;
    const isConfidentMistake = !isCorrect && input.confidenceTag === "sure";
    const attempt = await mcqAttempt_model_default.create({
      userId: new Types17.ObjectId(user.userId),
      institutionId: userInstitutionId ? new Types17.ObjectId(userInstitutionId) : void 0,
      mcqId: new Types17.ObjectId(input.mcqId),
      selectedOption: input.selectedOption,
      isCorrect,
      timeTakenMs: input.timeTakenMs,
      confidenceTag: input.confidenceTag,
      sessionId: input.sessionId,
      quizMode: input.quizMode
    });
    updateUserProgressOnAttempt({
      userId: user.userId,
      mcqId: input.mcqId,
      isCorrect,
      isConfidentMistake
    }).then(() => checkAndAwardBadges(user.userId)).catch(() => {
    });
    return {
      success: true,
      message: "Attempt recorded",
      data: {
        attemptId: String(attempt._id),
        isCorrect,
        correctOption: mcq.correctOption,
        outcomeType: attempt.outcomeType,
        explanation: isCorrect ? void 0 : mcq.explanation
      }
    };
  }),
  myHistory: protectedProcedure.input(historyInputSchema).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    const userId = new Types17.ObjectId(user.userId);
    const offset = (input.page - 1) * input.limit;
    const [data, totalRecords] = await Promise.all([
      mcqAttempt_model_default.find({ userId }).sort({ attemptedAt: -1 }).skip(offset).limit(input.limit).lean(),
      mcqAttempt_model_default.countDocuments({ userId })
    ]);
    return {
      success: true,
      data: data.map((item) => ({
        attemptId: String(item._id),
        mcqId: String(item.mcqId),
        selectedOption: item.selectedOption,
        isCorrect: item.isCorrect,
        timeTakenMs: item.timeTakenMs,
        attemptedAt: item.attemptedAt
      })),
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / input.limit),
        currentPage: input.page,
        pageSize: input.limit
      }
    };
  }),
  myStats: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    const userId = new Types17.ObjectId(user.userId);
    const [agg] = await mcqAttempt_model_default.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          correct: { $sum: { $cond: ["$isCorrect", 1, 0] } },
          confidentMistakes: {
            $sum: { $cond: [{ $eq: ["$outcomeType", "confident_mistake"] }, 1, 0] }
          },
          luckyGuesses: {
            $sum: { $cond: [{ $eq: ["$outcomeType", "lucky_guess"] }, 1, 0] }
          }
        }
      }
    ]);
    const total = agg?.total ?? 0;
    const correct = agg?.correct ?? 0;
    return {
      total,
      correct,
      incorrect: total - correct,
      accuracy: total > 0 ? correct / total : 0,
      confidentMistakes: agg?.confidentMistakes ?? 0,
      luckyGuesses: agg?.luckyGuesses ?? 0
    };
  }),
  sessionSummary: protectedProcedure.input(z19.object({ sessionId: z19.string().min(1) })).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    const userId = new Types17.ObjectId(user.userId);
    const attempts = await mcqAttempt_model_default.find({ userId, sessionId: input.sessionId }).sort({ attemptedAt: 1 }).lean();
    if (!attempts.length) {
      throw new TRPCError4({ code: "NOT_FOUND", message: "Session not found" });
    }
    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const incorrect = total - correct;
    const timeTakenMs = attempts.reduce((s, a) => s + (a.timeTakenMs ?? 0), 0);
    const wrongMcqIds = attempts.filter((a) => !a.isCorrect).map((a) => String(a.mcqId));
    const outcomeCounts = attempts.reduce(
      (acc, a) => {
        if (a.outcomeType) acc[a.outcomeType] = (acc[a.outcomeType] ?? 0) + 1;
        return acc;
      },
      {}
    );
    const mcqIds = attempts.map((a) => a.mcqId);
    const mcqs = await mcqs_model_default.find({ _id: { $in: mcqIds } }).select("subHeadingId headingId chapterId").lean();
    const mcqMap = new Map(mcqs.map((m) => [String(m._id), m]));
    const subHeadingMap = /* @__PURE__ */ new Map();
    for (const a of attempts) {
      const mcq = mcqMap.get(String(a.mcqId));
      const key = String(mcq?.subHeadingId ?? mcq?.headingId ?? mcq?.chapterId ?? "unknown");
      const cur = subHeadingMap.get(key) ?? { correct: 0, incorrect: 0 };
      if (a.isCorrect) cur.correct++;
      else cur.incorrect++;
      subHeadingMap.set(key, cur);
    }
    return {
      sessionId: input.sessionId,
      total,
      correct,
      incorrect,
      accuracy: total > 0 ? correct / total : 0,
      timeTakenMs,
      wrongMcqIds,
      outcomeCounts,
      subHeadingBreakdown: Object.fromEntries(subHeadingMap)
    };
  }),
  institutionLeaderboard: protectedProcedure.input(leaderboardInputSchema).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    const institutionId = await resolveUserInstitutionId(user.userId);
    if (!institutionId) {
      throw new TRPCError4({
        code: "FORBIDDEN",
        message: "No institution associated with this user"
      });
    }
    const result = await mcqAttempt_model_default.aggregate([
      { $match: { institutionId: new Types17.ObjectId(institutionId) } },
      {
        $group: {
          _id: "$userId",
          total: { $sum: 1 },
          correct: { $sum: { $cond: ["$isCorrect", 1, 0] } }
        }
      },
      { $sort: { correct: -1, total: 1 } },
      { $limit: input.limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          userId: { $toString: "$_id" },
          username: "$user.username",
          total: 1,
          correct: 1,
          accuracy: {
            $cond: [{ $gt: ["$total", 0] }, { $divide: ["$correct", "$total"] }, 0]
          }
        }
      }
    ]);
    return { success: true, data: result };
  }),
  completeBurstSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types17.ObjectId.isValid(userId)) {
      throw new TRPCError4({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    await completeBurst(userId);
    return { success: true };
  })
});

// src/routers/mcqs.router.ts
import { z as z20 } from "zod";
import { Types as Types18 } from "mongoose";
import { AppError as AppError27 } from "@muzammil328/server";
import { toTrpcError as toTrpcError37 } from "@muzammil328/trpc";
var SUPER_ADMIN_ROLES2 = /* @__PURE__ */ new Set([RoleEnum.SuperAdmin]);
var GLOBAL_SCOPE_MATCH = {
  $or: [{ scope: McqScopeEnum.GLOBAL }, { scope: { $exists: false } }]
};
async function institutionVisibilityFilter(ctx) {
  if (!ctx.user) {
    return GLOBAL_SCOPE_MATCH;
  }
  if (SUPER_ADMIN_ROLES2.has(ctx.user.role)) return null;
  const institutionId = await resolveUserInstitutionId(ctx.user.userId);
  if (!institutionId) return GLOBAL_SCOPE_MATCH;
  return {
    $or: [
      { scope: McqScopeEnum.GLOBAL },
      { scope: { $exists: false } },
      { scope: McqScopeEnum.INSTITUTION, institutionId: new Types18.ObjectId(institutionId) }
    ]
  };
}
function escapeRegex3(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseObjectId(value) {
  if (!value || !Types18.ObjectId.isValid(value)) {
    return void 0;
  }
  return new Types18.ObjectId(value);
}
var mcqsRouter = createTRPCRouter({
  getAll: teacherProcedure.input(getMcqsInputSchema).query(async ({ input, ctx }) => {
    const sortOrder = input.sortDirection === "desc" ? -1 : 1;
    const match = {};
    const visibility = await institutionVisibilityFilter(ctx);
    if (visibility) Object.assign(match, visibility);
    if (input.status !== "all") {
      match.status = input.status;
    }
    if (input.search) {
      match.question = { $regex: escapeRegex3(input.search), $options: "i" };
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
    const user = ctx.user;
    if (user?.subscriptionPlan === "free" || !user?.subscriptionPlan) {
      match.isPremium = { $ne: true };
    }
    const offset = (input.page - 1) * input.limit;
    const data = await mcqs_model_default.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classInfo"
        }
      },
      { $unwind: { path: "$classInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      { $unwind: { path: "$bookInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "chapters",
          localField: "chapterId",
          foreignField: "_id",
          as: "chapterInfo"
        }
      },
      { $unwind: { path: "$chapterInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "headings",
          localField: "headingId",
          foreignField: "_id",
          as: "headingInfo"
        }
      },
      { $unwind: { path: "$headingInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "subheadings",
          localField: "subHeadingId",
          foreignField: "_id",
          as: "subHeadingInfo"
        }
      },
      { $unwind: { path: "$subHeadingInfo", preserveNullAndEmptyArrays: true } },
      {
        $facet: {
          data: [
            {
              $project: {
                _id: 0,
                mcqId: "$_id",
                question: 1,
                options: 1,
                correctOption: 1,
                explanation: 1,
                difficulty: 1,
                isPremium: 1,
                status: 1,
                classId: "$classInfo._id",
                className: "$classInfo.name",
                classSlug: "$classInfo.slug",
                bookId: "$bookInfo._id",
                bookName: "$bookInfo.name",
                bookSlug: "$bookInfo.slug",
                chapterId: "$chapterInfo._id",
                chapterName: "$chapterInfo.name",
                chapterSlug: "$chapterInfo.slug",
                headingId: "$headingInfo._id",
                headingName: "$headingInfo.name",
                headingSlug: "$headingInfo.slug",
                subHeadingId: "$subHeadingInfo._id",
                subHeadingName: "$subHeadingInfo.name",
                subHeadingSlug: "$subHeadingInfo.slug"
              }
            },
            { $sort: { [input.sort]: sortOrder } },
            { $skip: offset },
            { $limit: input.limit }
          ],
          total: [{ $count: "count" }]
        }
      }
    ]);
    const mcqs = data[0].data || [];
    const totalRecords = data[0].total[0]?.count || 0;
    const totalPages = Math.ceil(totalRecords / input.limit);
    return {
      success: true,
      message: "Mcqs fetched successfully",
      data: mcqs.map((item) => ({
        mcqId: String(item.mcqId),
        question: item.question,
        options: item.options,
        correctOption: item.correctOption,
        explanation: item.explanation,
        difficulty: item.difficulty,
        isPremium: item.isPremium,
        status: item.status,
        classId: item.classId ? String(item.classId) : void 0,
        className: item.className,
        bookId: item.bookId ? String(item.bookId) : void 0,
        bookName: item.bookName,
        chapterId: item.chapterId ? String(item.chapterId) : void 0,
        chapterName: item.chapterName,
        headingId: item.headingId ? String(item.headingId) : void 0,
        headingName: item.headingName,
        subHeadingId: item.subHeadingId ? String(item.subHeadingId) : void 0,
        subHeadingName: item.subHeadingName
      })),
      pagination: { totalRecords, totalPages, currentPage: input.page, pageSize: input.limit }
    };
  }),
  getDropdown: teacherProcedure.input(getMcqDropdownInputSchema).query(async ({ input, ctx }) => {
    const filter = {
      question: { $regex: escapeRegex3(input.search || ""), $options: "i" },
      status: "active"
    };
    const visibility = await institutionVisibilityFilter(ctx);
    if (visibility) Object.assign(filter, visibility);
    const result = await mcqs_model_default.find(filter).select("_id question").limit(10).lean();
    return result.map((item) => ({
      value: String(item._id),
      label: item.question.substring(0, 50) + (item.question.length > 50 ? "..." : "")
    }));
  }),
  getById: teacherProcedure.input(getMcqByIdInputSchema).query(async ({ input }) => {
    if (!Types18.ObjectId.isValid(input.id)) {
      throw toTrpcError37(AppError27.badRequest("Invalid MCQ ID format"));
    }
    const result = await mcqs_model_default.findById(input.id).lean();
    if (!result) {
      throw toTrpcError37(AppError27.notFound("MCQ not found"));
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
      classId: result.classId ? String(result.classId) : void 0,
      bookId: result.bookId ? String(result.bookId) : void 0,
      chapterId: result.chapterId ? String(result.chapterId) : void 0,
      headingId: result.headingId ? String(result.headingId) : void 0,
      subHeadingId: result.subHeadingId ? String(result.subHeadingId) : void 0
    };
  }),
  create: protectedProcedure.input(
    z20.object({
      questions: z20.array(McqPayloadSchema).min(1),
      classId: z20.string().min(1),
      bookId: z20.string().min(1),
      chapterId: z20.string().min(1),
      headingId: z20.string().optional(),
      subHeadingId: z20.string().optional(),
      scope: mcqScopeSchema.optional()
    })
  ).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw toTrpcError37(AppError27.unauthorized("Not authenticated"));
    }
    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);
    const headingId = parseObjectId(input.headingId);
    const subHeadingId = parseObjectId(input.subHeadingId);
    if (!classId || !bookId || !chapterId) {
      throw toTrpcError37(AppError27.badRequest("Class, book and chapter are required"));
    }
    const isSuperAdmin = SUPER_ADMIN_ROLES2.has(user.role);
    const userInstitutionId = await resolveUserInstitutionId(user.userId);
    let scope;
    let institutionId;
    if (isSuperAdmin) {
      scope = input.scope ?? McqScopeEnum.GLOBAL;
      institutionId = scope === McqScopeEnum.INSTITUTION && userInstitutionId ? new Types18.ObjectId(userInstitutionId) : void 0;
      if (scope === McqScopeEnum.INSTITUTION && !institutionId) {
        throw toTrpcError37(AppError27.badRequest("Institution-scoped MCQ requires an institution"));
      }
    } else {
      if (!userInstitutionId) {
        throw toTrpcError37(AppError27.forbidden("Account is not linked to an institution"));
      }
      scope = McqScopeEnum.INSTITUTION;
      institutionId = new Types18.ObjectId(userInstitutionId);
    }
    const mcqData = input.questions.map((q) => ({
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
      institutionId
    }));
    const created = await mcqs_model_default.insertMany(mcqData, { ordered: false });
    return {
      success: true,
      message: "MCQs created successfully",
      data: created.map((c) => ({
        mcqId: String(c._id),
        question: c.question,
        status: c.status
      }))
    };
  }),
  update: protectedProcedure.input(updateMcqInputSchema).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) {
      throw toTrpcError37(AppError27.unauthorized("Not authenticated"));
    }
    const parsedInput = input;
    if (!Types18.ObjectId.isValid(parsedInput.id)) {
      throw toTrpcError37(AppError27.badRequest("Invalid MCQ ID format"));
    }
    const existing = await mcqs_model_default.findById(parsedInput.id).select("scope institutionId").lean();
    if (!existing) throw toTrpcError37(AppError27.notFound("MCQ not found"));
    if (!SUPER_ADMIN_ROLES2.has(user.role)) {
      const userInstitutionId = await resolveUserInstitutionId(user.userId);
      const mcqInstId = existing.institutionId ? String(existing.institutionId) : void 0;
      if (existing.scope !== McqScopeEnum.INSTITUTION || !mcqInstId || mcqInstId !== userInstitutionId) {
        throw toTrpcError37(AppError27.forbidden("Cannot modify MCQs outside your institution"));
      }
    }
    const updateData = {};
    if (parsedInput.updates.question) updateData.question = parsedInput.updates.question;
    if (parsedInput.updates.options) updateData.options = parsedInput.updates.options;
    if (parsedInput.updates.correctOption !== void 0)
      updateData.correctOption = parsedInput.updates.correctOption;
    if (parsedInput.updates.explanation !== void 0)
      updateData.explanation = parsedInput.updates.explanation;
    if (parsedInput.updates.difficulty) updateData.difficulty = parsedInput.updates.difficulty;
    if (parsedInput.updates.status) updateData.status = parsedInput.updates.status;
    if (parsedInput.updates.isPremium !== void 0)
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
    const updated = await mcqs_model_default.findByIdAndUpdate(parsedInput.id, updateData, {
      new: true
    }).lean();
    if (!updated) {
      throw toTrpcError37(AppError27.notFound("MCQ not found"));
    }
    return {
      success: true,
      message: "MCQ updated successfully",
      data: {
        mcqId: String(updated._id),
        question: updated.question,
        status: updated.status
      }
    };
  }),
  delete: protectedProcedure.input(deleteMcqInputSchema).mutation(async ({ input }) => {
    if (!Types18.ObjectId.isValid(input.id)) {
      throw toTrpcError37(AppError27.badRequest("Invalid MCQ ID format"));
    }
    const deleted = await mcqs_model_default.findByIdAndDelete(input.id).lean();
    if (!deleted) {
      throw toTrpcError37(AppError27.notFound("MCQ not found"));
    }
    return {
      success: true,
      message: "MCQ deleted successfully"
    };
  })
});

// src/routers/service/serviceGetAll.ts
import { toTrpcError as toTrpcError38 } from "@muzammil328/trpc";

// src/models/service.model.ts
import mongoose16, { Schema as Schema15 } from "mongoose";
var ServiceSchema = new Schema15(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    description: { type: String },
    classId: [{ type: Schema15.Types.ObjectId, ref: "Class", required: true, index: true }],
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    image: { type: String },
    keywords: [{ type: String }]
  },
  { timestamps: true }
);
ServiceSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var service_model_default = mongoose16.model("Service", ServiceSchema);

// src/repository/service.repository.ts
var ServiceRepository = class extends BaseRepository {
  constructor() {
    super(service_model_default);
  }
  async findBySlug(slug, classId) {
    const query = { slug: slug.toLowerCase() };
    if (classId) query.classId = classId;
    return this.findOne(query);
  }
  async findByClass(classId, status) {
    const query = { classId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
};
var serviceRepository = new ServiceRepository();

// src/routers/service/serviceGetAll.ts
import { buildMatch as buildMatch16 } from "@muzammil328/db";
var serviceGetAll = superAdminProcedure.input(getServicesInputSchema).query(async ({ input }) => {
  try {
    const result = await serviceRepository.aggregate({
      pipeline: serviceRepository.pipeline().match(buildMatch16(
        { status: input.status }
      )).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        serviceId: "$_id",
        name: 1,
        status: 1,
        className: "$class.name"
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "Services fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError38(e);
  }
});

// src/routers/service/serviceGetDropdown.ts
import { toTrpcError as toTrpcError39 } from "@muzammil328/trpc";
import { buildMatch as buildMatch17 } from "@muzammil328/db";
var serviceGetDropdown = superAdminProcedure.input(getServiceDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    const result = await serviceRepository.aggregate({
      pipeline: serviceRepository.pipeline().match(
        buildMatch17({
          status: StatusEnum.Active,
          classId
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError39(e);
  }
});

// src/routers/service/serviceGetById.ts
import { AppError as AppError28 } from "@muzammil328/server";
import { buildMatch as buildMatch18, toObjectId as toObjectId13 } from "@muzammil328/db";
import { toTrpcError as toTrpcError40 } from "@muzammil328/trpc";
var serviceGetById = superAdminProcedure.input(getServiceByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await serviceRepository.aggregate({
      pipeline: serviceRepository.pipeline().match(
        buildMatch18({
          _id: toObjectId13(input.id)
        })
      ).project({
        _id: 0,
        serviceId: "$_id",
        name: 1,
        slug: 1
      }).build(),
      single: true
    });
    if (!result) {
      throw AppError28.notFound("Service not found");
    }
    return {
      success: true,
      message: "Service fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError40(e);
  }
});

// src/routers/service/serviceDelete.ts
import { AppError as AppError29 } from "@muzammil328/server";
import { toTrpcError as toTrpcError41 } from "@muzammil328/trpc";
import { toObjectId as toObjectId14 } from "@muzammil328/db";
var serviceDelete = superAdminProcedure.input(deleteServiceInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await serviceRepository.findByIdAndDelete(toObjectId14(input.id));
    if (!deleted) {
      throw AppError29.notFound("Service not found");
    }
    return {
      success: true,
      message: "Service deleted successfully"
    };
  } catch (e) {
    throw toTrpcError41(e);
  }
});

// src/routers/service/serviceCreate.ts
import { AppError as AppError30 } from "@muzammil328/server";
import { toTrpcError as toTrpcError42 } from "@muzammil328/trpc";
import { parseObjectIdList as parseObjectIdList4 } from "@muzammil328/db";
var serviceCreate = superAdminProcedure.input(serviceCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await serviceRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError30.badRequest("Service already exists");
    }
    const created = await serviceRepository.create({
      name: input.name,
      status: input.status,
      description: input.description,
      classId: parseObjectIdList4(input.classId),
      image: input.image,
      keywords: input.keywords ?? []
    });
    return {
      success: true,
      message: "Service created successfully",
      data: {
        serviceId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError42(e);
  }
});

// src/routers/service/serviceUpdate.ts
import { AppError as AppError31 } from "@muzammil328/server";
import { toTrpcError as toTrpcError43 } from "@muzammil328/trpc";
import { resolveObjectId as resolveObjectId6 } from "@muzammil328/db";
import { Types as Types19 } from "mongoose";
var serviceUpdate = superAdminProcedure.input(updateServiceInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await serviceRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId6(input.id)
      }
    });
    if (duplicate) {
      throw AppError31.badRequest("Service already exists");
    }
    const updated = await serviceRepository.findByIdAndUpdate(
      new Types19.ObjectId(input.id),
      {
        name: input.updates.name,
        code: input.updates.code,
        status: input.updates.status,
        classId: input.updates.classId?.map((id) => new Types19.ObjectId(id)),
        serviceId: input.updates.serviceId?.map((id) => new Types19.ObjectId(id)),
        description: input.updates.description,
        creditHours: input.updates.creditHours,
        fileId: input.updates.fileId,
        pages: input.updates.pages,
        image: input.updates.image,
        order: input.updates.order,
        totalWeight: input.updates.totalWeight,
        components: input.updates.components
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError31.notFound("Service not found");
    }
    return {
      success: true,
      message: "Service updated successfully",
      data: {
        serviceId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status,
        serviceIds: (updated.serviceId ?? []).map(
          (id) => String(id)
        ),
        image: updated.image,
        keywords: updated.keywords ?? []
      }
    };
  } catch (e) {
    throw toTrpcError43(e);
  }
});

// src/routers/service/service.router.ts
var serviceRouter = createTRPCRouter({
  getAll: serviceGetAll,
  getDropdown: serviceGetDropdown,
  getById: serviceGetById,
  create: serviceCreate,
  update: serviceUpdate,
  delete: serviceDelete
});

// src/routers/student.router.ts
import { TRPCError as TRPCError5 } from "@trpc/server";
import { z as z21 } from "zod";
import { Types as Types20 } from "mongoose";
import { createBcrypt as createBcrypt2 } from "@muzammil328/services";
var emailSchema = z21.string().email();
var studentSchema2 = z21.object({
  username: z21.string().min(3),
  email: emailSchema,
  password: z21.string().min(6)
});
var addStudentsSchema2 = z21.object({
  students: z21.array(studentSchema2).min(1).max(100)
});
var classGroupSchema = z21.object({
  name: z21.string().min(1),
  classIds: z21.array(z21.string()).optional()
});
var studentRouter = createTRPCRouter({
  addStudent: protectedProcedure.input(studentSchema2).mutation(async ({ input }) => {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new TRPCError5({ code: "CONFLICT", message: "Email already exists" });
    }
    const hashedPassword = await createBcrypt2().hash(input.password, 12);
    const student = await userRepository.create({
      ...input,
      password: hashedPassword,
      role: RoleEnum.Student
    });
    return {
      success: true,
      message: "Student added successfully",
      data: {
        userId: String(student._id),
        username: student.username,
        email: student.email
      }
    };
  }),
  addStudents: protectedProcedure.input(addStudentsSchema2).mutation(async ({ input }) => {
    const results = {
      success: [],
      failed: []
    };
    for (const student of input.students) {
      try {
        const existingUser = await userRepository.findByEmail(student.email);
        if (existingUser) {
          results.failed.push({ email: student.email, reason: "Email already exists" });
          continue;
        }
        const hashedPassword = await createBcrypt2().hash(student.password, 12);
        await userRepository.create({
          ...student,
          password: hashedPassword,
          role: RoleEnum.Student
        });
        results.success.push(student.email);
      } catch (error) {
        results.failed.push({ email: student.email, reason: "Failed to create student" });
      }
    }
    return {
      success: results.failed.length === 0,
      message: `Added ${results.success.length} students, ${results.failed.length} failed`,
      data: results
    };
  }),
  getStudents: protectedProcedure.input(
    z21.object({
      page: z21.number().optional().default(1),
      limit: z21.number().optional().default(10),
      search: z21.string().optional()
    })
  ).query(async ({ input }) => {
    const match = { role: RoleEnum.Student };
    if (input.search) {
      match.$or = [
        { username: { $regex: input.search, $options: "i" } },
        { email: { $regex: input.search, $options: "i" } }
      ];
    }
    const result = await userRepository.aggregate({
      pipeline: [
        { $match: match },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            username: 1,
            email: 1,
            role: 1,
            isEmailVerified: 1,
            createdAt: 1
          }
        }
      ],
      page: input.page,
      limit: input.limit
    });
    return {
      success: true,
      message: "Students fetched successfully",
      data: (result.data || []).map((item) => ({
        userId: String(item.userId),
        username: item.username,
        email: item.email,
        role: item.role,
        isEmailVerified: item.isEmailVerified,
        createdAt: item.createdAt
      })),
      pagination: result.pagination
    };
  }),
  deleteStudent: protectedProcedure.input(z21.object({ id: z21.string() })).mutation(async ({ input }) => {
    const deleted = await userRepository.findByIdAndDelete(new Types20.ObjectId(input.id));
    if (!deleted) {
      throw new TRPCError5({ code: "NOT_FOUND", message: "Student not found" });
    }
    return {
      success: true,
      message: "Student deleted successfully"
    };
  }),
  createClassGroup: protectedProcedure.input(classGroupSchema).mutation(async ({ ctx, input }) => {
    const group = await classGroupRepository.create({
      name: input.name,
      admin: new Types20.ObjectId(ctx.user?.userId),
      members: [],
      classIds: input.classIds?.map((id) => new Types20.ObjectId(id)) || []
    });
    return {
      success: true,
      message: "Class group created successfully",
      data: {
        groupId: String(group._id),
        name: group.name
      }
    };
  }),
  addStudentsToClassGroup: protectedProcedure.input(
    z21.object({
      groupId: z21.string(),
      studentIds: z21.array(z21.string())
    })
  ).mutation(async ({ input }) => {
    const group = await classGroupRepository.findById(new Types20.ObjectId(input.groupId));
    if (!group) {
      throw new TRPCError5({ code: "NOT_FOUND", message: "Class group not found" });
    }
    const newMembers = input.studentIds.filter(
      (id) => !group.members.map((m) => m.toString()).includes(id)
    ).map((id) => new Types20.ObjectId(id));
    const updated = await classGroupRepository.findByIdAndUpdate(
      new Types20.ObjectId(input.groupId),
      { $addToSet: { members: { $each: newMembers } } },
      { new: true }
    );
    return {
      success: true,
      message: "Students added to class group",
      data: {
        groupId: String(updated?._id),
        memberCount: updated?.members.length || 0
      }
    };
  }),
  getClassGroups: protectedProcedure.query(async ({ ctx }) => {
    const groups = await classGroupRepository.findAll({
      query: { admin: new Types20.ObjectId(ctx.user?.userId) }
    });
    return {
      success: true,
      message: "Class groups fetched successfully",
      data: groups.map((group) => ({
        groupId: String(group._id),
        name: group.name,
        memberCount: group.members.length,
        createdAt: group.createdAt
      }))
    };
  }),
  getClassGroupDetails: protectedProcedure.input(z21.object({ groupId: z21.string() })).query(async ({ input }) => {
    const result = await classGroupRepository.aggregate({
      pipeline: [
        { $match: { _id: new Types20.ObjectId(input.groupId) } },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "memberDetails"
          }
        },
        {
          $project: {
            _id: 0,
            groupId: "$_id",
            name: 1,
            memberCount: { $size: "$members" },
            members: {
              $map: {
                input: "$memberDetails",
                as: "member",
                in: {
                  userId: { $toString: "$$member._id" },
                  username: "$$member.username",
                  email: "$$member.email"
                }
              }
            },
            createdAt: 1
          }
        }
      ]
    });
    const group = result;
    if (!group.length) {
      throw new TRPCError5({ code: "NOT_FOUND", message: "Class group not found" });
    }
    return {
      success: true,
      data: group[0]
    };
  })
});

// src/routers/subHeading/subHeadingGetAll.ts
import { toTrpcError as toTrpcError44 } from "@muzammil328/trpc";

// src/models/subHeading.model.ts
import mongoose17, { Schema as Schema16 } from "mongoose";
var SubHeadingSchema = new Schema16(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    headingId: { type: Schema16.Types.ObjectId, ref: "Heading", required: true },
    chapterId: { type: Schema16.Types.ObjectId, ref: "Chapter", required: true },
    bookId: { type: Schema16.Types.ObjectId, ref: "Book", required: true },
    classId: { type: Schema16.Types.ObjectId, ref: "Class", required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number }
  },
  { timestamps: true }
);
SubHeadingSchema.pre("validate", function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});
var SubHeading = mongoose17.model("SubHeading", SubHeadingSchema);
var subHeading_model_default = SubHeading;

// src/repository/subHeading.repository.ts
var SubHeadingRepository = class extends BaseRepository {
  constructor() {
    super(subHeading_model_default);
  }
  async findBySlug(slug, headingId) {
    const query = { slug: slug.toLowerCase() };
    if (headingId) query.headingId = headingId;
    return this.findOne(query);
  }
  async findByHeading(headingId, status) {
    const query = { headingId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async findByChapter(chapterId, status) {
    const query = { chapterId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async findByBook(bookId, status) {
    const query = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
  async getSubHeadingByName(name) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      {
        $match: {
          status: "active",
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: "i" } }]
        }
      },
      {
        $project: {
          _id: 0,
          subHeadingId: "$_id",
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          headingId: 1
        }
      },
      { $sort: { name: 1 } }
    ] });
  }
  async getSubHeadingByClassAndBookAndChapterAndHeadingName(className, bookName, chapterName, headingName) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const normalizedChapter = chapterName.trim().toLowerCase();
    const normalizedHeading = headingName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedChapter = chapterName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedHeading = headingName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.aggregate({ pipeline: [
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDoc"
        }
      },
      { $unwind: "$classDoc" },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDoc"
        }
      },
      { $unwind: "$bookDoc" },
      {
        $lookup: {
          from: "chapters",
          localField: "chapterId",
          foreignField: "_id",
          as: "chapterDoc"
        }
      },
      { $unwind: "$chapterDoc" },
      {
        $lookup: {
          from: "headings",
          localField: "headingId",
          foreignField: "_id",
          as: "headingDoc"
        }
      },
      { $unwind: "$headingDoc" },
      {
        $match: {
          "classDoc.status": "active",
          "bookDoc.status": "active",
          "chapterDoc.status": "active",
          "headingDoc.status": "active",
          $and: [
            {
              $or: [
                { "classDoc.slug": normalizedClass },
                { "classDoc.name": { $regex: `^${escapedClass}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "bookDoc.slug": normalizedBook },
                { "bookDoc.name": { $regex: `^${escapedBook}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "chapterDoc.slug": normalizedChapter },
                { "chapterDoc.name": { $regex: `^${escapedChapter}$`, $options: "i" } }
              ]
            },
            {
              $or: [
                { "headingDoc.slug": normalizedHeading },
                { "headingDoc.name": { $regex: `^${escapedHeading}$`, $options: "i" } }
              ]
            }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          subHeadingId: "$_id",
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          headingId: 1
        }
      },
      { $sort: { order: 1, name: 1 } }
    ] });
  }
};
var subHeadingRepository = new SubHeadingRepository();

// src/routers/subHeading/subHeadingGetAll.ts
import { buildMatch as buildMatch19 } from "@muzammil328/db";
var subHeadingGetAll = superAdminProcedure.input(getSubHeadingsInputSchema).query(async ({ input }) => {
  try {
    const result = await subHeadingRepository.aggregate({
      pipeline: subHeadingRepository.pipeline().match(buildMatch19(
        { status: input.status }
      )).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name"],
        unwind: false
      }).lookupOne({
        from: "headings",
        localField: "headingId",
        foreignField: "_id",
        as: "heading",
        pick: ["name"],
        unwind: false
      }).project({
        _id: 0,
        subHeadingId: "$_id",
        name: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        chapterId: 1,
        headingId: 1,
        className: "$class.name",
        bookName: "$book.name",
        chapterName: "$chapter.name",
        headingName: "$heading.name",
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        serviceId: 1,
        services: 1
      }),
      search: input.search,
      searchFields: ["name"],
      sort: input.sort,
      page: input.page,
      limit: input.limit
    });
    const { data, pagination } = result;
    return {
      success: true,
      message: "SubHeadings fetched successfully",
      data,
      pagination
    };
  } catch (e) {
    throw toTrpcError44(e);
  }
});

// src/routers/subHeading/subHeadingGetDropdown.ts
import { toTrpcError as toTrpcError45 } from "@muzammil328/trpc";
import { buildMatch as buildMatch20 } from "@muzammil328/db";
var subHeadingGetDropdown = superAdminProcedure.input(getSubHeadingDropdownInputSchema).query(async ({ input }) => {
  try {
    const { classId } = input;
    const result = await subHeadingRepository.aggregate({
      pipeline: subHeadingRepository.pipeline().match(
        buildMatch20({
          status: StatusEnum.Active,
          classId
        })
      ).sort({ name: 1 }).project({
        _id: 0,
        value: "$_id",
        label: "$name"
      })
    });
    return result.map((item) => ({
      value: String(item.value),
      label: item.label
    }));
  } catch (e) {
    throw toTrpcError45(e);
  }
});

// src/routers/subHeading/subHeadingGetById.ts
import { toTrpcError as toTrpcError46 } from "@muzammil328/trpc";
import { AppError as AppError32 } from "@muzammil328/server";
import { buildMatch as buildMatch21, toObjectId as toObjectId15 } from "@muzammil328/db";
var subHeadingGetById = superAdminProcedure.input(getSubHeadingByIdInputSchema).query(async ({ input }) => {
  try {
    const result = await subHeadingRepository.aggregate({
      pipeline: subHeadingRepository.pipeline().match(
        buildMatch21({
          _id: toObjectId15(input.id)
        })
      ).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name", "_id"],
        unwind: false
      }).lookupOne({
        from: "headings",
        localField: "headingId",
        foreignField: "_id",
        as: "heading",
        pick: ["name", "_id"],
        unwind: false
      }).lookup({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services"
      }).project({
        _id: 0,
        subHeadingId: "$_id",
        name: 1,
        description: 1,
        status: 1,
        classId: 1,
        bookId: 1,
        chapterId: 1,
        headingId: 1,
        serviceId: 1,
        services: 1,
        order: 1,
        createdAt: 1,
        updatedAt: 1,
        class: {
          $let: {
            vars: { c: { $first: "$class" } },
            in: { classId: "$$c._id", name: "$$c.name" }
          }
        },
        book: {
          $let: {
            vars: { b: { $first: "$book" } },
            in: { bookId: "$$b._id", name: "$$b.name" }
          }
        },
        chapter: {
          $let: {
            vars: { ch: { $first: "$chapter" } },
            in: { chapterId: "$$ch._id", name: "$$ch.name" }
          }
        },
        heading: {
          $let: {
            vars: { h: { $first: "$heading" } },
            in: { headingId: "$$h._id", name: "$$h.name" }
          }
        }
      }).build(),
      single: true
      // 👈 important (returns one document)
    });
    if (!result) {
      throw AppError32.notFound("SubHeading not found");
    }
    return {
      success: true,
      message: "SubHeading fetched successfully",
      data: result
    };
  } catch (e) {
    throw toTrpcError46(e);
  }
});

// src/routers/subHeading/subHeadingDelete.ts
import { AppError as AppError33 } from "@muzammil328/server";
import { toTrpcError as toTrpcError47 } from "@muzammil328/trpc";
var subHeadingDelete = superAdminProcedure.input(deleteSubHeadingInputSchema).mutation(async ({ input }) => {
  try {
    const deleted = await subHeadingRepository.findByIdAndDelete(toObjectId(input.id));
    if (!deleted) {
      throw AppError33.notFound("SubHeading not found");
    }
    return {
      success: true,
      message: "SubHeading deleted successfully"
    };
  } catch (e) {
    throw toTrpcError47(e);
  }
});

// src/routers/subHeading/subHeadingCreate.ts
import { Types as Types21 } from "mongoose";
import { AppError as AppError34 } from "@muzammil328/server";
import { toTrpcError as toTrpcError48 } from "@muzammil328/trpc";
var subHeadingCreate = superAdminProcedure.input(subHeadingCreateSchema).mutation(async ({ input }) => {
  try {
    const existing = await subHeadingRepository.findOne({
      name: input.name
    });
    if (existing) {
      throw AppError34.badRequest("SubHeading already exists");
    }
    const created = await subHeadingRepository.create({
      name: input.name,
      code: input.code,
      status: input.status,
      classId: new Types21.ObjectId(input.classId),
      serviceId: input.serviceId?.map((id) => new Types21.ObjectId(id)),
      description: input.description,
      creditHours: input.creditHours,
      fileId: input.fileId,
      pages: input.pages,
      image: input.image,
      order: input.order,
      totalWeight: input.totalWeight,
      components: input.components
    });
    return {
      success: true,
      message: "SubHeading created successfully",
      data: {
        subHeadingId: created._id,
        name: created.name,
        description: created.description,
        status: created.status
      }
    };
  } catch (e) {
    throw toTrpcError48(e);
  }
});

// src/routers/subHeading/subHeadingUpdate.ts
import { AppError as AppError35 } from "@muzammil328/server";
import { toTrpcError as toTrpcError49 } from "@muzammil328/trpc";
import { resolveObjectId as resolveObjectId7 } from "@muzammil328/db";
import { Types as Types22 } from "mongoose";
var subHeadingUpdate = superAdminProcedure.input(updateSubHeadingInputSchema).mutation(async ({ input }) => {
  try {
    const duplicate = await subHeadingRepository.findOne({
      name: input.updates.name,
      _id: {
        $ne: resolveObjectId7(input.id)
      }
    });
    if (duplicate) {
      throw AppError35.badRequest("SubHeading already exists");
    }
    const updated = await subHeadingRepository.findByIdAndUpdate(
      new Types22.ObjectId(input.id),
      {
        name: input.updates.name,
        code: input.updates.code,
        status: input.updates.status,
        classId: new Types22.ObjectId(input.updates.classId),
        serviceId: input.updates.serviceId?.map((id) => new Types22.ObjectId(id)),
        description: input.updates.description,
        creditHours: input.updates.creditHours,
        fileId: input.updates.fileId,
        pages: input.updates.pages,
        image: input.updates.image,
        order: input.updates.order,
        totalWeight: input.updates.totalWeight,
        components: input.updates.components
      },
      {
        new: true
      }
    );
    if (!updated) {
      throw AppError35.notFound("SubHeading not found");
    }
    return {
      success: true,
      message: "SubHeading updated successfully",
      data: {
        subHeadingId: String(updated._id),
        name: updated.name,
        description: updated.description,
        status: updated.status,
        serviceIds: (updated.serviceId ?? []).map(
          (id) => String(id)
        ),
        image: updated.image,
        keywords: updated.keywords ?? []
      }
    };
  } catch (e) {
    throw toTrpcError49(e);
  }
});

// src/routers/subHeading/subHeading.router.ts
var subHeadingRouter = createTRPCRouter({
  getAll: subHeadingGetAll,
  getDropdown: subHeadingGetDropdown,
  getById: subHeadingGetById,
  create: subHeadingCreate,
  update: subHeadingUpdate,
  delete: subHeadingDelete
});

// src/routers/user.router.ts
import { Types as Types23 } from "mongoose";
import { z as z22 } from "zod";
import { AppError as AppError36 } from "@muzammil328/server";
import { toTrpcError as toTrpcError50 } from "@muzammil328/trpc";
import { StatusCode as StatusCode2 } from "@muzammil328/types";
var authRouter2 = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types23.ObjectId.isValid(userId)) {
      throw toTrpcError50(AppError36.unauthorized("Invalid user ID"));
    }
    return userService.getMe(userId);
  }),
  updateProfile: protectedProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.user?.userId;
    const updated = await userService.update(userId, input);
    if (!updated) {
      throw toTrpcError50(AppError36.notFound("User not found"));
    }
    return {
      success: true,
      status: StatusCode2.OK,
      message: "Profile updated successfully",
      data: {
        user: {
          userId: String(updated._id),
          username: updated.username,
          email: updated.email,
          role: updated.role ?? ""
        }
      }
    };
  }),
  getStats: superAdminProcedure.query(async () => {
    const [
      totalUsers,
      superAdmins,
      admins,
      teachers,
      students,
      totalClasses,
      totalBooks,
      totalChapters,
      totalHeadings,
      totalSubHeadings,
      totalBoards,
      totalServices,
      totalMcqs
    ] = await Promise.all([
      user_model_default.countDocuments(),
      user_model_default.countDocuments({ role: "super_admin" }),
      user_model_default.countDocuments({ role: "admin" }),
      user_model_default.countDocuments({ role: "teacher" }),
      user_model_default.countDocuments({ role: "student" }),
      class_model_default.countDocuments(),
      book_model_default.countDocuments(),
      chapter_model_default.countDocuments(),
      heading_model_default.countDocuments(),
      subHeading_model_default.countDocuments(),
      board_model_default.countDocuments(),
      service_model_default.countDocuments(),
      mcqs_model_default.countDocuments()
    ]);
    return {
      users: { total: totalUsers, superAdmins, admins, teachers, students },
      content: {
        classes: totalClasses,
        books: totalBooks,
        chapters: totalChapters,
        headings: totalHeadings,
        subHeadings: totalSubHeadings,
        boards: totalBoards,
        services: totalServices,
        mcqs: totalMcqs
      }
    };
  }),
  setExamTarget: protectedProcedure.input(z22.object({
    examTarget: z22.string().trim().max(100),
    examDate: z22.string().datetime()
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types23.ObjectId.isValid(userId)) {
      throw toTrpcError50(AppError36.unauthorized("Invalid user"));
    }
    await user_model_default.findByIdAndUpdate(new Types23.ObjectId(userId), {
      examTarget: input.examTarget,
      examDate: new Date(input.examDate)
    });
    return { success: true };
  }),
  myBadges: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types23.ObjectId.isValid(userId)) {
      throw toTrpcError50(AppError36.unauthorized("Invalid user"));
    }
    const user = await user_model_default.findById(new Types23.ObjectId(userId)).select("badges burstStreakCount").lean();
    return {
      badges: user?.badges ?? [],
      burstStreakCount: user?.burstStreakCount ?? 0
    };
  }),
  readinessScore: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types23.ObjectId.isValid(userId)) {
      throw toTrpcError50(AppError36.unauthorized("Invalid user"));
    }
    const user = await user_model_default.findById(new Types23.ObjectId(userId)).select("examTarget examDate burstStreakCount lastBurstDate").lean();
    if (!user?.examDate) {
      return { hasExam: false, readinessScore: null, daysRemaining: null, examTarget: null, examDate: null };
    }
    const now = /* @__PURE__ */ new Date();
    const examDate = new Date(user.examDate);
    const daysRemaining = Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / 864e5));
    const [strongCount, totalCount] = await Promise.all([
      subHeading_model_default.countDocuments(),
      subHeading_model_default.countDocuments()
    ]);
    const UserProgress = (await Promise.resolve().then(() => (init_userProgress_model(), userProgress_model_exports))).default;
    const [strongProgress, totalProgress] = await Promise.all([
      UserProgress.countDocuments({ user: new Types23.ObjectId(userId), masteryBand: "strong" }),
      UserProgress.countDocuments({ user: new Types23.ObjectId(userId) })
    ]);
    const readinessScore = totalProgress > 0 ? Math.round(strongProgress / totalProgress * 100) : 0;
    return {
      hasExam: true,
      examTarget: user.examTarget,
      examDate: examDate.toISOString(),
      daysRemaining,
      readinessScore,
      strongSubHeadings: strongProgress,
      totalTrackedSubHeadings: totalProgress,
      burstStreakCount: user.burstStreakCount ?? 0
    };
  })
});

// src/routers/userProgress.router.ts
import { TRPCError as TRPCError6 } from "@trpc/server";
import { z as z23 } from "zod";
import { Types as Types24 } from "mongoose";
init_userProgress_model();
var userProgressRouter = createTRPCRouter({
  myProgress: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    const records = await userProgress_model_default.find({ user: new Types24.ObjectId(user.userId) }).populate("bookId", "name slug").populate("chapterId", "name slug").populate("headingId", "name slug").populate("subHeadingId", "name slug").lean();
    return { success: true, data: records };
  }),
  weakSubHeadings: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    const records = await userProgress_model_default.find({
      user: new Types24.ObjectId(user.userId),
      masteryBand: "weak"
    }).sort({ openLoopCount: -1, masteryScore: 1 }).populate("subHeadingId", "name slug").populate("headingId", "name slug").populate("chapterId", "name slug").lean();
    return { success: true, data: records };
  }),
  dueForReview: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    const records = await userProgress_model_default.find({
      user: new Types24.ObjectId(user.userId),
      nextReviewAt: { $lte: /* @__PURE__ */ new Date() }
    }).sort({ nextReviewAt: 1 }).populate("subHeadingId", "name slug").populate("chapterId", "name slug").lean();
    return { success: true, data: records };
  }),
  openLoops: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    const records = await userProgress_model_default.find({
      user: new Types24.ObjectId(user.userId),
      openLoopCount: { $gt: 0 }
    }).sort({ openLoopCount: -1 }).populate("subHeadingId", "name slug").populate("headingId", "name slug").populate("chapterId", "name slug").lean();
    const totalOpenLoops = records.reduce((s, r) => s + (r.openLoopCount ?? 0), 0);
    return { success: true, totalOpenLoops, data: records };
  }),
  dismissLoop: protectedProcedure.input(z23.object({ progressId: z23.string().min(1) })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    if (!Types24.ObjectId.isValid(input.progressId)) {
      throw new TRPCError6({ code: "BAD_REQUEST", message: "Invalid progress ID" });
    }
    const result = await userProgress_model_default.updateOne(
      { _id: new Types24.ObjectId(input.progressId), user: new Types24.ObjectId(user.userId) },
      { $inc: { openLoopCount: -1 } }
    );
    if (!result.matchedCount) {
      throw new TRPCError6({ code: "NOT_FOUND", message: "Progress record not found" });
    }
    return { success: true };
  }),
  subHeadingProgress: protectedProcedure.input(z23.object({ subHeadingId: z23.string().min(1) })).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError6({ code: "UNAUTHORIZED" });
    const record = await userProgress_model_default.findOne({
      user: new Types24.ObjectId(user.userId),
      subHeadingId: new Types24.ObjectId(input.subHeadingId)
    }).lean();
    return { success: true, data: record ?? null };
  })
});

// src/routers/adaptiveMcq.router.ts
import { TRPCError as TRPCError7 } from "@trpc/server";
import { z as z24 } from "zod";
import { Types as Types25 } from "mongoose";
init_userProgress_model();
var DIFFICULTY_MAP = {
  weak: "easy",
  developing: "medium",
  strong: "hard"
};
var adaptiveMcqRouter = createTRPCRouter({
  /**
   * Returns a batch of MCQs tailored to the student's current mastery level for a subHeading.
   * Priority: spaced-repetition due items → recovery queue (recent wrong answers) → new questions.
   */
  getNextBatch: protectedProcedure.input(
    z24.object({
      subHeadingId: z24.string().min(1),
      sessionId: z24.string().optional(),
      mode: z24.enum([
        "practice",
        "exam_sim",
        "weak_topic",
        "focused_drill",
        "speed_round",
        "challenge",
        "revision",
        "micro_burst"
      ]).optional().default("practice"),
      limit: z24.number().int().min(1).max(50).optional().default(10)
    })
  ).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError7({ code: "UNAUTHORIZED" });
    if (!Types25.ObjectId.isValid(input.subHeadingId)) {
      throw new TRPCError7({ code: "BAD_REQUEST", message: "Invalid subHeadingId" });
    }
    const userId = new Types25.ObjectId(user.userId);
    const subHeadingId = new Types25.ObjectId(input.subHeadingId);
    const progress = await userProgress_model_default.findOne({ user: userId, subHeadingId }).lean();
    const masteryBand = progress?.masteryBand ?? "weak";
    const difficultyBand = DIFFICULTY_MAP[masteryBand];
    const sevenDaysAgo = new Date(Date.now() - 7 * 864e5);
    const recentCorrectAttempts = await mcqAttempt_model_default.find({
      userId,
      isCorrect: true,
      attemptedAt: { $gte: sevenDaysAgo }
    }).select("mcqId").lean();
    const recentCorrectIds = recentCorrectAttempts.map((a) => a.mcqId);
    const recentWrongAttempts = await mcqAttempt_model_default.find({
      userId,
      isCorrect: false,
      attemptedAt: { $gte: sevenDaysAgo }
    }).select("mcqId").lean();
    const recoveryIds = recentWrongAttempts.map((a) => a.mcqId).filter((id) => !recentCorrectIds.some((cid) => String(cid) === String(id)));
    const baseFilter = {
      subHeadingId,
      status: StatusEnum.Active,
      difficulty: difficultyBand
    };
    const recoveryMcqs = recoveryIds.length > 0 ? await mcqs_model_default.find({ ...baseFilter, _id: { $in: recoveryIds } }).select("question options correctOption difficulty explanation examinersNote").limit(Math.ceil(input.limit / 2)).lean() : [];
    const recoveryMcqIds = recoveryMcqs.map((m) => m._id);
    const excludeIds = [...recentCorrectIds, ...recoveryMcqIds];
    const newMcqs = await mcqs_model_default.find({
      ...baseFilter,
      _id: { $nin: excludeIds }
    }).select("question options correctOption difficulty explanation examinersNote").limit(input.limit - recoveryMcqs.length).lean();
    const allMcqs = [...recoveryMcqs, ...newMcqs];
    for (let i = allMcqs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allMcqs[i], allMcqs[j]] = [allMcqs[j], allMcqs[i]];
    }
    return {
      success: true,
      masteryBand,
      difficultyBand,
      data: allMcqs.map((m) => ({
        id: String(m._id),
        question: m.question,
        options: m.options,
        difficulty: m.difficulty,
        isRecovery: recoveryMcqIds.some((rid) => String(rid) === String(m._id))
      }))
    };
  }),
  /**
   * Micro Burst: 5 targeted questions from weakest subHeading + spaced repetition due items + 1 new.
   */
  getMicroBurst: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError7({ code: "UNAUTHORIZED" });
    const userId = new Types25.ObjectId(user.userId);
    const weakest = await userProgress_model_default.findOne({
      user: userId,
      masteryBand: "weak"
    }).sort({ masteryScore: 1 }).lean();
    if (!weakest?.subHeadingId) {
      return { success: true, data: [], message: "No weak subHeadings found" };
    }
    const subHeadingId = weakest.subHeadingId;
    const difficultyBand = DIFFICULTY_MAP[weakest.masteryBand ?? "weak"];
    const weakMcqs = await mcqs_model_default.find({
      subHeadingId,
      status: StatusEnum.Active,
      difficulty: difficultyBand
    }).select("question options correctOption difficulty").limit(4).lean();
    const dueProgress = await userProgress_model_default.findOne({
      user: userId,
      nextReviewAt: { $lte: /* @__PURE__ */ new Date() },
      subHeadingId: { $ne: subHeadingId }
    }).sort({ nextReviewAt: 1 }).lean();
    let dueMcq = null;
    if (dueProgress?.subHeadingId) {
      dueMcq = await mcqs_model_default.findOne({
        subHeadingId: dueProgress.subHeadingId,
        status: StatusEnum.Active
      }).select("question options correctOption difficulty").lean();
    }
    const burst = [...weakMcqs, ...dueMcq ? [dueMcq] : []].slice(0, 5);
    return {
      success: true,
      data: burst.map((m) => ({
        id: String(m._id),
        question: m.question,
        options: m.options,
        difficulty: m.difficulty
      }))
    };
  })
});

// src/routers/analytics.router.ts
import { TRPCError as TRPCError8 } from "@trpc/server";
import { z as z25 } from "zod";
import { Types as Types26 } from "mongoose";
var analyticsRouter = createTRPCRouter({
  /**
   * Top MCQs with the highest wrong-answer rates and which distractor option was chosen most.
   * Institution-scoped for teachers, global for super admins.
   */
  distractorIntelligence: teacherProcedure.input(z25.object({ limit: z25.number().int().min(1).max(50).optional().default(10) })).query(async ({ ctx, input }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError8({ code: "UNAUTHORIZED" });
    const institutionId = await resolveUserInstitutionId(user.userId);
    const matchStage = institutionId ? { isCorrect: false, institutionId: new Types26.ObjectId(institutionId) } : { isCorrect: false };
    const result = await mcqAttempt_model_default.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { mcqId: "$mcqId", selectedOption: "$selectedOption" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      {
        $group: {
          _id: "$_id.mcqId",
          totalWrong: { $sum: "$count" },
          topDistractor: { $first: "$_id.selectedOption" },
          topDistractorCount: { $first: "$count" }
        }
      },
      { $sort: { totalWrong: -1 } },
      { $limit: input.limit },
      {
        $lookup: {
          from: "mcqs",
          localField: "_id",
          foreignField: "_id",
          as: "mcq"
        }
      },
      { $unwind: { path: "$mcq", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "mcqattempts",
          let: { mcqId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$mcqId", "$$mcqId"] } } },
            { $group: { _id: null, total: { $sum: 1 } } }
          ],
          as: "totalAttempts"
        }
      },
      {
        $project: {
          _id: 0,
          mcqId: { $toString: "$_id" },
          question: "$mcq.question",
          options: "$mcq.options",
          correctOption: "$mcq.correctOption",
          topDistractor: 1,
          topDistractorCount: 1,
          totalWrong: 1,
          totalAttempts: { $ifNull: [{ $arrayElemAt: ["$totalAttempts.total", 0] }, 0] },
          wrongRate: {
            $cond: [
              { $gt: [{ $ifNull: [{ $arrayElemAt: ["$totalAttempts.total", 0] }, 0] }, 0] },
              { $divide: ["$totalWrong", { $ifNull: [{ $arrayElemAt: ["$totalAttempts.total", 0] }, 0] }] },
              0
            ]
          }
        }
      }
    ]);
    return { success: true, data: result };
  }),
  /**
   * Class-wide student progress overview for teachers.
   */
  classProgressOverview: teacherProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError8({ code: "UNAUTHORIZED" });
    const institutionId = await resolveUserInstitutionId(user.userId);
    if (!institutionId) return { success: true, data: [] };
    const result = await mcqAttempt_model_default.aggregate([
      { $match: { institutionId: new Types26.ObjectId(institutionId) } },
      {
        $group: {
          _id: "$userId",
          total: { $sum: 1 },
          correct: { $sum: { $cond: ["$isCorrect", 1, 0] } },
          confidentMistakes: {
            $sum: { $cond: [{ $eq: ["$outcomeType", "confident_mistake"] }, 1, 0] }
          }
        }
      },
      { $sort: { correct: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "userprogresses",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$userId"] } } },
            { $group: { _id: null, openLoops: { $sum: "$openLoopCount" }, weakCount: { $sum: { $cond: [{ $eq: ["$masteryBand", "weak"] }, 1, 0] } } } }
          ],
          as: "progress"
        }
      },
      {
        $project: {
          _id: 0,
          userId: { $toString: "$_id" },
          name: "$user.username",
          total: 1,
          correct: 1,
          confidentMistakes: 1,
          accuracy: { $cond: [{ $gt: ["$total", 0] }, { $divide: ["$correct", "$total"] }, 0] },
          openLoops: { $ifNull: [{ $arrayElemAt: ["$progress.openLoops", 0] }, 0] },
          weakSubHeadings: { $ifNull: [{ $arrayElemAt: ["$progress.weakCount", 0] }, 0] }
        }
      }
    ]);
    return { success: true, data: result };
  }),
  /**
   * Students with 3+ confident mistakes in any topic this week — for teacher alerts.
   */
  confidentMistakeAlerts: teacherProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    if (!user) throw new TRPCError8({ code: "UNAUTHORIZED" });
    const institutionId = await resolveUserInstitutionId(user.userId);
    const oneWeekAgo = new Date(Date.now() - 7 * 864e5);
    const matchStage = {
      outcomeType: "confident_mistake",
      attemptedAt: { $gte: oneWeekAgo },
      ...institutionId ? { institutionId: new Types26.ObjectId(institutionId) } : {}
    };
    const result = await mcqAttempt_model_default.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { userId: "$userId", mcqId: "$mcqId" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.userId",
          totalConfidentMistakes: { $sum: "$count" },
          affectedMcqs: { $addToSet: "$_id.mcqId" }
        }
      },
      { $match: { totalConfidentMistakes: { $gte: 3 } } },
      { $sort: { totalConfidentMistakes: -1 } },
      {
        $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          userId: { $toString: "$_id" },
          name: "$user.username",
          email: "$user.email",
          totalConfidentMistakes: 1,
          affectedMcqCount: { $size: "$affectedMcqs" }
        }
      }
    ]);
    return { success: true, data: result };
  }),
  /**
   * Platform-wide stats for super admins.
   */
  platformStats: superAdminProcedure.query(async () => {
    const now = /* @__PURE__ */ new Date();
    const dayAgo = new Date(now.getTime() - 864e5);
    const weekAgo = new Date(now.getTime() - 7 * 864e5);
    const [dauAgg, wauAgg, totalAgg, highErrorMcqs] = await Promise.all([
      mcqAttempt_model_default.aggregate([
        { $match: { attemptedAt: { $gte: dayAgo } } },
        { $group: { _id: "$userId" } },
        { $count: "count" }
      ]),
      mcqAttempt_model_default.aggregate([
        { $match: { attemptedAt: { $gte: weekAgo } } },
        { $group: { _id: "$userId" } },
        { $count: "count" }
      ]),
      mcqAttempt_model_default.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, correct: { $sum: { $cond: ["$isCorrect", 1, 0] } } } }
      ]),
      // MCQs with error rate > 60%
      mcqAttempt_model_default.aggregate([
        { $group: { _id: "$mcqId", total: { $sum: 1 }, wrong: { $sum: { $cond: [{ $eq: ["$isCorrect", false] }, 1, 0] } } } },
        { $match: { total: { $gte: 5 } } },
        { $addFields: { errorRate: { $divide: ["$wrong", "$total"] } } },
        { $match: { errorRate: { $gte: 0.6 } } },
        { $sort: { errorRate: -1 } },
        { $limit: 10 },
        { $lookup: { from: "mcqs", localField: "_id", foreignField: "_id", as: "mcq" } },
        { $unwind: { path: "$mcq", preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, mcqId: { $toString: "$_id" }, question: "$mcq.question", total: 1, wrong: 1, errorRate: 1 } }
      ])
    ]);
    return {
      success: true,
      dau: dauAgg[0]?.count ?? 0,
      wau: wauAgg[0]?.count ?? 0,
      totalAttempts: totalAgg[0]?.total ?? 0,
      overallAccuracy: totalAgg[0]?.total > 0 ? totalAgg[0].correct / totalAgg[0].total : 0,
      highErrorMcqs
    };
  })
});

// src/routers/payment.router.ts
import { Types as Types27 } from "mongoose";
import { z as z26 } from "zod";
import { TRPCError as TRPCError9 } from "@trpc/server";

// src/models/payment.model.ts
import mongoose18, { Schema as Schema17 } from "mongoose";
var PaymentSchema = new Schema17(
  {
    user: { type: Schema17.Types.ObjectId, ref: "User" },
    classGroup: { type: Schema17.Types.ObjectId, ref: "ClassGroup" },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "PKR" },
    type: { type: String, enum: Object.values(PaymentTypeEnum), required: true },
    status: { type: String, enum: Object.values(PaymentStatusEnum), required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    transactionId: { type: String },
    provider: { type: String }
  },
  { timestamps: true }
);
PaymentSchema.index({ user: 1 });
PaymentSchema.index({ classGroup: 1 });
var payment_model_default = mongoose18.model("Payment", PaymentSchema);

// src/routers/payment.router.ts
var PLAN_PRICES = {
  basic: { amount: 2999, durationDays: 30, maxStudents: 200, maxTeachers: 10 },
  premium: { amount: 7999, durationDays: 30, maxStudents: 1e3, maxTeachers: 50 },
  enterprise: { amount: 19999, durationDays: 30, maxStudents: 1e4, maxTeachers: 200 }
};
var paymentRouter = createTRPCRouter({
  /** Initiate a subscription purchase (mock — no real gateway; records as pending) */
  initSubscription: protectedProcedure.input(z26.object({
    plan: z26.enum(["basic", "premium", "enterprise"]),
    institutionId: z26.string().optional(),
    transactionId: z26.string().optional()
    // provided by client after gateway handoff
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types27.ObjectId.isValid(userId)) {
      throw new TRPCError9({ code: "UNAUTHORIZED" });
    }
    const meta = PLAN_PRICES[input.plan];
    if (!meta) throw new TRPCError9({ code: "BAD_REQUEST", message: "Unknown plan" });
    const payment = await payment_model_default.create({
      user: new Types27.ObjectId(userId),
      amount: meta.amount,
      currency: "PKR",
      type: input.institutionId ? PaymentTypeEnum.Institution : PaymentTypeEnum.Subscription,
      status: input.transactionId ? PaymentStatusEnum.Completed : PaymentStatusEnum.Pending,
      transactionId: input.transactionId,
      provider: "manual",
      startDate: /* @__PURE__ */ new Date(),
      endDate: new Date(Date.now() + meta.durationDays * 864e5)
    });
    if (input.transactionId && input.institutionId && Types27.ObjectId.isValid(input.institutionId)) {
      await institution_model_default.findByIdAndUpdate(input.institutionId, {
        subscriptionPlan: input.plan,
        subscriptionExpiresAt: payment.endDate,
        maxStudents: meta.maxStudents,
        maxTeachers: meta.maxTeachers
      });
    }
    return {
      success: true,
      paymentId: String(payment._id),
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      expiresAt: payment.endDate?.toISOString()
    };
  }),
  /** Confirm a pending payment (called by webhook or admin) */
  confirmPayment: superAdminProcedure.input(z26.object({
    paymentId: z26.string(),
    transactionId: z26.string(),
    institutionId: z26.string().optional(),
    plan: z26.enum(["basic", "premium", "enterprise"]).optional()
  })).mutation(async ({ input }) => {
    if (!Types27.ObjectId.isValid(input.paymentId)) {
      throw new TRPCError9({ code: "BAD_REQUEST" });
    }
    const payment = await payment_model_default.findByIdAndUpdate(input.paymentId, {
      status: PaymentStatusEnum.Completed,
      transactionId: input.transactionId
    }, { new: true });
    if (!payment) throw new TRPCError9({ code: "NOT_FOUND", message: "Payment not found" });
    if (input.institutionId && input.plan && Types27.ObjectId.isValid(input.institutionId)) {
      const meta = PLAN_PRICES[input.plan];
      if (meta) {
        await institution_model_default.findByIdAndUpdate(input.institutionId, {
          subscriptionPlan: input.plan,
          subscriptionExpiresAt: payment.endDate,
          maxStudents: meta.maxStudents,
          maxTeachers: meta.maxTeachers
        });
      }
    }
    return { success: true };
  }),
  /** Student's own payment history */
  myHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types27.ObjectId.isValid(userId)) {
      throw new TRPCError9({ code: "UNAUTHORIZED" });
    }
    const payments = await payment_model_default.find({ user: new Types27.ObjectId(userId) }).sort({ createdAt: -1 }).limit(20).lean();
    return {
      data: payments.map((p) => ({
        id: String(p._id),
        amount: p.amount,
        currency: p.currency,
        type: p.type,
        status: p.status,
        transactionId: p.transactionId,
        startDate: p.startDate?.toISOString(),
        endDate: p.endDate?.toISOString(),
        createdAt: p.createdAt?.toISOString()
      }))
    };
  }),
  /** Admin — all payments with pagination */
  adminList: superAdminProcedure.input(z26.object({
    page: z26.number().int().positive().default(1),
    limit: z26.number().int().positive().max(100).default(20),
    status: z26.enum(["all", "pending", "completed", "failed", "refunded"]).default("all")
  })).query(async ({ input }) => {
    const filter = {};
    if (input.status !== "all") filter.status = input.status;
    const skip = (input.page - 1) * input.limit;
    const [data, total] = await Promise.all([
      payment_model_default.find(filter).sort({ createdAt: -1 }).skip(skip).limit(input.limit).populate("user", "username email").lean(),
      payment_model_default.countDocuments(filter)
    ]);
    return {
      data: data.map((p) => ({
        id: String(p._id),
        user: p.user ? { username: p.user.username, email: p.user.email } : null,
        amount: p.amount,
        currency: p.currency,
        type: p.type,
        status: p.status,
        transactionId: p.transactionId,
        startDate: p.startDate?.toISOString(),
        endDate: p.endDate?.toISOString(),
        createdAt: p.createdAt?.toISOString()
      })),
      pagination: { total, page: input.page, pages: Math.ceil(total / input.limit) }
    };
  }),
  /** Admin — revenue summary */
  revenueSummary: superAdminProcedure.query(async () => {
    const [totalRevenue, monthRevenue, pendingCount, completedCount] = await Promise.all([
      payment_model_default.aggregate([
        { $match: { status: PaymentStatusEnum.Completed } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      payment_model_default.aggregate([
        {
          $match: {
            status: PaymentStatusEnum.Completed,
            createdAt: { $gte: new Date(Date.now() - 30 * 864e5) }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      payment_model_default.countDocuments({ status: PaymentStatusEnum.Pending }),
      payment_model_default.countDocuments({ status: PaymentStatusEnum.Completed })
    ]);
    return {
      totalRevenuePKR: totalRevenue[0]?.total ?? 0,
      monthRevenuePKR: monthRevenue[0]?.total ?? 0,
      pendingCount,
      completedCount
    };
  }),
  /** Plan metadata (public — no auth needed for pricing page) */
  plans: protectedProcedure.query(() => {
    return {
      plans: [
        {
          key: "free",
          label: "Free",
          price: 0,
          currency: "PKR",
          durationDays: null,
          features: ["Up to 50 students", "Basic MCQ access", "Student dashboard"],
          maxStudents: 50,
          maxTeachers: 5
        },
        {
          key: "basic",
          label: "Basic",
          price: PLAN_PRICES.basic.amount,
          currency: "PKR",
          durationDays: 30,
          features: ["Up to 200 students", "Adaptive MCQ engine", "Teacher dashboard", "Distractor intelligence", "Student progress tracking"],
          maxStudents: 200,
          maxTeachers: 10
        },
        {
          key: "premium",
          label: "Premium",
          price: PLAN_PRICES.premium.amount,
          currency: "PKR",
          durationDays: 30,
          features: ["Up to 1,000 students", "All Basic features", "Analytics platform", "Exam countdown", "Gamification & badges", "Bulk MCQ import"],
          maxStudents: 1e3,
          maxTeachers: 50
        },
        {
          key: "enterprise",
          label: "Enterprise",
          price: PLAN_PRICES.enterprise.amount,
          currency: "PKR",
          durationDays: 30,
          features: ["Unlimited students", "All Premium features", "Dedicated support", "Custom branding", "API access"],
          maxStudents: 1e4,
          maxTeachers: 200
        }
      ]
    };
  })
});

// src/routers/bulkImport.router.ts
import { Types as Types28 } from "mongoose";
import { z as z27 } from "zod";
import { TRPCError as TRPCError10 } from "@trpc/server";
var mcqRowSchema = z27.object({
  question: z27.string().min(5).max(2e3),
  options: z27.array(z27.string().min(1)).min(2).max(6),
  correctOption: z27.number().int().min(0),
  explanation: z27.string().max(2e3).optional(),
  examinersNote: z27.string().max(1e3).optional(),
  difficulty: z27.enum(["easy", "medium", "hard"]).optional().default("medium")
});
var bulkImportSchema = z27.object({
  subHeadingId: z27.string(),
  rows: z27.array(mcqRowSchema).min(1).max(500),
  /** If true, validate only — don't insert */
  dryRun: z27.boolean().optional().default(false)
});
var bulkImportRouter = createTRPCRouter({
  /**
   * Validate and insert MCQ rows in bulk.
   * Teachers can import up to 100; super-admins up to 500.
   * Each row must pass Zod validation; invalid rows are returned as errors
   * rather than aborting the entire batch.
   */
  importMcqs: superAdminProcedure.input(bulkImportSchema).mutation(async ({ input }) => {
    if (!Types28.ObjectId.isValid(input.subHeadingId)) {
      throw new TRPCError10({ code: "BAD_REQUEST", message: "Invalid subHeadingId" });
    }
    const subHeading = await subHeading_model_default.findById(input.subHeadingId).select("_id classId bookId chapterId headingId").lean();
    if (!subHeading) {
      throw new TRPCError10({ code: "NOT_FOUND", message: "SubHeading not found" });
    }
    const errors = [];
    const valid = [];
    for (let i = 0; i < input.rows.length; i++) {
      const row = input.rows[i];
      if (row.correctOption >= row.options.length) {
        errors.push({ row: i + 1, message: `correctOption ${row.correctOption} out of range (${row.options.length} options)` });
        continue;
      }
      valid.push({
        subHeadingId: new Types28.ObjectId(input.subHeadingId),
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
        status: StatusEnum.Active
      });
    }
    if (input.dryRun) {
      return {
        dryRun: true,
        validCount: valid.length,
        errorCount: errors.length,
        errors,
        inserted: 0
      };
    }
    let inserted = 0;
    if (valid.length > 0) {
      const result = await mcqs_model_default.insertMany(valid, { ordered: false });
      inserted = result.length;
    }
    return {
      dryRun: false,
      validCount: valid.length,
      errorCount: errors.length,
      errors,
      inserted
    };
  }),
  /** Teacher-scoped import — same logic but limited to 100 rows */
  importMcqsTeacher: teacherProcedure.input(bulkImportSchema.extend({ rows: z27.array(mcqRowSchema).min(1).max(100) })).mutation(async ({ input }) => {
    if (!Types28.ObjectId.isValid(input.subHeadingId)) {
      throw new TRPCError10({ code: "BAD_REQUEST", message: "Invalid subHeadingId" });
    }
    const subHeading = await subHeading_model_default.findById(input.subHeadingId).select("_id classId bookId chapterId headingId").lean();
    if (!subHeading) {
      throw new TRPCError10({ code: "NOT_FOUND", message: "SubHeading not found" });
    }
    const errors = [];
    const valid = [];
    for (let i = 0; i < input.rows.length; i++) {
      const row = input.rows[i];
      if (row.correctOption >= row.options.length) {
        errors.push({ row: i + 1, message: `correctOption ${row.correctOption} out of range` });
        continue;
      }
      valid.push({
        subHeadingId: new Types28.ObjectId(input.subHeadingId),
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
        status: StatusEnum.Active
      });
    }
    if (input.dryRun) {
      return { dryRun: true, validCount: valid.length, errorCount: errors.length, errors, inserted: 0 };
    }
    let inserted = 0;
    if (valid.length > 0) {
      const result = await mcqs_model_default.insertMany(valid, { ordered: false });
      inserted = result.length;
    }
    return { dryRun: false, validCount: valid.length, errorCount: errors.length, errors, inserted };
  })
});

// src/models/vuHandout.model.ts
import mongoose19, { Schema as Schema18 } from "mongoose";
var VuHandoutSchema = new Schema18(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    courseCode: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fileUrl: { type: String, required: true },
    classId: { type: Schema18.Types.ObjectId, ref: "Class", required: true, index: true },
    serviceId: { type: Schema18.Types.ObjectId, ref: "Service", required: true, index: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);
VuHandoutSchema.index({ classId: 1, serviceId: 1 });
VuHandoutSchema.index({ slug: 1, serviceId: 1 }, { unique: true });
var vuHandout_model_default = mongoose19.model("VuHandout", VuHandoutSchema);

// src/routers/public/sitemap.ts
var BASE = "https://growlearnhub.com";
var STATIC_URLS = [
  `${BASE}/`,
  `${BASE}/mcqs/`,
  `${BASE}/online-test/`,
  `${BASE}/blogs/`,
  `${BASE}/books/`,
  `${BASE}/notes/`,
  `${BASE}/date-sheet/`,
  `${BASE}/result/`,
  `${BASE}/pairing-scheme/`,
  `${BASE}/past-paper/`,
  `${BASE}/explore-topics/`,
  `${BASE}/jobs-opportunities/`,
  `${BASE}/vu/`,
  `${BASE}/vu/handouts/`,
  `${BASE}/vu/final-mcqs/`,
  `${BASE}/vu/mid-mcqs/`,
  `${BASE}/vu/mid-mark-calculator/`
];
var CLASS_STATIC_SERVICES = [
  "mcqs",
  "online-test",
  "books",
  "notes",
  "past-paper",
  "pairing-scheme",
  "result",
  "date-sheet"
];
var sitemapStatic = publicProcedure.query(() => STATIC_URLS);
var sitemapClasses = publicProcedure.query(async () => {
  const classes = await class_model_default.find().select("slug").lean();
  const matricClasses = classes.filter(
    (c) => ["class-9", "class-10", "class-11", "class-12"].includes(c.slug)
  );
  const urls = [];
  for (const cls of matricClasses) {
    urls.push(`${BASE}/${cls.slug}/`);
    for (const service of CLASS_STATIC_SERVICES) {
      urls.push(`${BASE}/${cls.slug}/${service}/`);
    }
  }
  return urls;
});
var sitemapBooks = publicProcedure.query(async () => {
  const books = await book_model_default.find({ classId: { $ne: null } }).populate("classId", "slug").select("slug classId").lean();
  const urls = [];
  for (const { slug, classId } of books) {
    if (!classId?.slug) continue;
    const cls = classId.slug;
    urls.push(`${BASE}/${cls}/mcqs/${slug}/`);
    urls.push(`${BASE}/${cls}/online-test/${slug}/`);
    urls.push(`${BASE}/${cls}/books/${slug}/`);
    if (cls === "class-9") {
    } else {
      urls.push(`${BASE}/${cls}/past-paper/${slug}/`);
    }
    if (["class-10", "class-11", "class-12"].includes(cls)) {
      urls.push(`${BASE}/${cls}/pairing-scheme/${slug}/`);
    }
  }
  return [...new Set(urls)];
});
var sitemapChapters = publicProcedure.query(async () => {
  const chapters = await chapter_model_default.find({
    classId: { $ne: null },
    bookId: { $ne: null }
  }).populate("classId", "slug").populate("bookId", "slug").select("slug classId bookId").lean();
  const urls = [];
  for (const { slug, classId, bookId } of chapters) {
    if (!classId?.slug || !bookId?.slug) continue;
    const cls = classId.slug;
    const book = bookId.slug;
    urls.push(`${BASE}/${cls}/mcqs/${book}/${slug}/`);
    urls.push(`${BASE}/${cls}/online-test/${book}/${slug}/`);
    urls.push(`${BASE}/${cls}/books/${book}/${slug}/`);
    if (cls !== "class-9") {
      urls.push(`${BASE}/${cls}/past-paper/${book}/${slug}/`);
    }
  }
  return [...new Set(urls)];
});
var sitemapBoards = publicProcedure.query(async () => {
  const boards = await board_model_default.find().populate("classId", "slug").select("slug classId").lean();
  const urls = [];
  for (const { slug, classId } of boards) {
    for (const cls of classId ?? []) {
      if (!cls?.slug) continue;
      const c = cls.slug;
      urls.push(`${BASE}/${c}/result/${slug}/`);
      urls.push(`${BASE}/${c}/date-sheet/${slug}/`);
      if (c === "class-9") {
        urls.push(`${BASE}/${c}/past-paper/${slug}/`);
      }
    }
  }
  return [...new Set(urls)];
});
var sitemapHeadings = publicProcedure.query(async () => {
  const headings = await heading_model_default.find({ bookId: { $ne: null } }).populate("bookId", "slug").select("slug bookId").lean();
  const urls = headings.filter((h) => h.bookId?.slug).map(({ slug, bookId }) => `${BASE}/mcqs/${bookId.slug}/${slug}/`);
  return [...new Set(urls)];
});
var sitemapSubHeadings = publicProcedure.query(async () => {
  const subHeadings = await subHeading_model_default.find({
    headingId: { $ne: null },
    bookId: { $ne: null }
  }).populate("headingId", "slug").populate("bookId", "slug").select("slug headingId bookId").lean();
  const urls = subHeadings.filter((s) => s.headingId?.slug && s.bookId?.slug).map(
    ({ slug, headingId, bookId }) => `${BASE}/mcqs/${bookId.slug}/${headingId.slug}/${slug}/`
  );
  return [...new Set(urls)];
});
var sitemapOnlineTest = publicProcedure.query(async () => {
  const headings = await heading_model_default.find({ bookId: { $ne: null } }).populate("bookId", "slug").select("slug bookId").lean();
  const subHeadings = await subHeading_model_default.find({
    headingId: { $ne: null },
    bookId: { $ne: null }
  }).populate("headingId", "slug").populate("bookId", "slug").select("slug headingId bookId").lean();
  const headingUrls = headings.filter((h) => h.bookId?.slug).map(({ slug, bookId }) => `${BASE}/online-test/${bookId.slug}/${slug}/`);
  const subHeadingUrls = subHeadings.filter((s) => s.headingId?.slug && s.bookId?.slug).map(
    ({ slug, headingId, bookId }) => `${BASE}/online-test/${bookId.slug}/${headingId.slug}/${slug}/`
  );
  return [.../* @__PURE__ */ new Set([...headingUrls, ...subHeadingUrls])];
});
var sitemapVu = publicProcedure.query(async () => {
  const handouts = await vuHandout_model_default.find({ status: "active" }).select("slug").lean();
  const handoutUrls = handouts.map((h) => `${BASE}/vu/handouts/${h.slug}/`);
  const vuBooks = await book_model_default.find({ classId: { $ne: null } }).populate("classId", "slug").populate("serviceId", "slug").select("slug classId serviceId externalLinks").lean();
  const vuFinalUrls = [];
  const vuMidUrls = [];
  for (const book of vuBooks) {
    if (book.classId?.slug !== "vu") continue;
    const services = (book.serviceId ?? []).map((s) => s?.slug);
    if (services.includes("final-exam")) {
      vuFinalUrls.push(`${BASE}/vu/final-mcqs/${book.slug}/`);
      for (const link of book.externalLinks ?? []) {
        vuFinalUrls.push(`${BASE}/vu/final-mcqs/${book.slug}/${link.slug}/`);
      }
    }
    if (services.includes("mid-exam")) {
      vuMidUrls.push(`${BASE}/vu/mid-mcqs/${book.slug}/`);
      for (const link of book.externalLinks ?? []) {
        vuMidUrls.push(`${BASE}/vu/mid-mcqs/${book.slug}/${link.slug}/`);
      }
    }
  }
  return [.../* @__PURE__ */ new Set([...handoutUrls, ...vuFinalUrls, ...vuMidUrls])];
});

// src/routers/public/serviceByClassSlug.ts
import { AppError as AppError37 } from "@muzammil328/server";
import { toTrpcError as toTrpcError51 } from "@muzammil328/trpc";
import { buildMatch as buildMatch22 } from "@muzammil328/db";
var serviceByClassSlug = publicProcedure.input(getServiceBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    if (!classSlug) {
      throw AppError37.badRequest("Class slug is required");
    }
    const result = await serviceRepository.aggregate({
      pipeline: serviceRepository.pipeline().match(buildMatch22({ status: "active" })).lookup({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class"
      }).match({
        "class.slug": classSlug
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Services fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError51(e);
  }
});

// src/routers/public/bookGetByClassAndServiceSlug.ts
import { AppError as AppError38 } from "@muzammil328/server";
import { toTrpcError as toTrpcError52 } from "@muzammil328/trpc";
import { buildMatch as buildMatch23 } from "@muzammil328/db";
var bookGetByClassAndServiceSlug = publicProcedure.input(getBookBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    const serviceSlug = input.serviceSlug?.trim();
    if (!classSlug) {
      throw AppError38.badRequest("Class slug is required");
    }
    const result = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(buildMatch23({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
        pick: ["name", "slug"],
        unwind: false
      }).match({
        "class.slug": classSlug,
        ...serviceSlug ? { "service.slug": serviceSlug } : {}
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Books fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError52(e);
  }
});

// src/routers/public/chapterGetByClassAndServiceAndSubjectSlug.ts
import { toTrpcError as toTrpcError53 } from "@muzammil328/trpc";
import { AppError as AppError39 } from "@muzammil328/server";
import { buildMatch as buildMatch24 } from "@muzammil328/db";
var chapterGetByClassAndServiceAndSubjectSlug = publicProcedure.input(getChapterBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    const bookSlug = input.bookSlug?.trim();
    if (!classSlug) {
      throw AppError39.badRequest("Class slug is required");
    }
    const result = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(buildMatch24({ status: "active" })).lookup({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class"
      }).lookup({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }).match({
        "class.slug": classSlug,
        ...bookSlug ? { "book.slug": bookSlug } : {}
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Chapters fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError53(e);
  }
});

// src/routers/public/headingGetByClassAndServiceAndSubjectAndChapterSlug.ts
import { AppError as AppError40 } from "@muzammil328/server";
import { toTrpcError as toTrpcError54 } from "@muzammil328/trpc";
import { buildMatch as buildMatch25 } from "@muzammil328/db";
var headingGetByClassAndServiceAndSubjectAndChapterSlug = publicProcedure.input(getHeadingBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    const bookSlug = input.bookSlug?.trim();
    const chapterSlug = input.chapterSlug?.trim();
    if (!classSlug) {
      throw AppError40.badRequest("Class slug is required");
    }
    const result = await headingRepository.aggregate({
      pipeline: headingRepository.pipeline().match(buildMatch25({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name", "slug"],
        unwind: false
      }).match({
        ...bookSlug ? { "book.slug": bookSlug } : {},
        ...chapterSlug ? { "chapter.slug": chapterSlug } : {},
        ...classSlug ? { "class.slug": classSlug } : {}
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Headings fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError54(e);
  }
});

// src/routers/public/subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug.ts
import { AppError as AppError41 } from "@muzammil328/server";
import { toTrpcError as toTrpcError55 } from "@muzammil328/trpc";
import { buildMatch as buildMatch26 } from "@muzammil328/db";
var subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug = publicProcedure.input(getSubHeadingBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    const bookSlug = input.bookSlug?.trim();
    const chapterSlug = input.chapterSlug?.trim();
    const headingSlug = input.headingSlug?.trim();
    if (!classSlug) {
      throw AppError41.badRequest("Class slug is required");
    }
    const result = await subHeadingRepository.aggregate({
      pipeline: subHeadingRepository.pipeline().match(buildMatch26({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "chapters",
        localField: "chapterId",
        foreignField: "_id",
        as: "chapter",
        pick: ["name", "slug"],
        unwind: false
      }).lookupOne({
        from: "headings",
        localField: "headingId",
        foreignField: "_id",
        as: "heading",
        pick: ["name", "slug"],
        unwind: false
      }).match({
        ...classSlug ? { "class.slug": classSlug } : {},
        ...bookSlug ? { "book.slug": bookSlug } : {},
        ...chapterSlug ? { "chapter.slug": chapterSlug } : {},
        ...headingSlug ? { "heading.slug": headingSlug } : {}
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "SubHeadings fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError55(e);
  }
});

// src/routers/public/boardGetBySlug.ts
import { AppError as AppError42 } from "@muzammil328/server";
import { toTrpcError as toTrpcError56 } from "@muzammil328/trpc";
import { buildMatch as buildMatch27 } from "@muzammil328/db";
var boardGetBySlug = publicProcedure.input(getBoardBySlugInputSchema).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim();
    if (!classSlug) {
      throw AppError42.badRequest("Class slug is required");
    }
    const result = await boardRepository.aggregate({
      pipeline: boardRepository.pipeline().match(buildMatch27({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["name", "slug"],
        unwind: false
      }).match({
        ...classSlug ? { "class.slug": classSlug } : {}
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Boards fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError56(e);
  }
});

// src/routers/public/classGetByServiceSlug.ts
import { AppError as AppError43 } from "@muzammil328/server";
import { toTrpcError as toTrpcError57 } from "@muzammil328/trpc";
import { buildMatch as buildMatch28 } from "@muzammil328/db";
var classGetByServiceSlug = publicProcedure.input(getClassByServiceSlugInputSchema).query(async ({ input }) => {
  try {
    const serviceSlug = input.serviceSlug.trim();
    if (!serviceSlug) {
      throw AppError43.badRequest("Service slug is required");
    }
    const result = await classRepository.aggregate({
      pipeline: classRepository.pipeline().match(buildMatch28({ status: "active" })).lookupOne({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
        pick: ["name", "slug"],
        unwind: false
      }).match({
        "service.slug": serviceSlug
      }).project({
        _id: 0,
        name: 1,
        slug: 1
      }).build()
    });
    return {
      success: true,
      message: "Classes fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError57(e);
  }
});

// src/routers/public/mcqsBySlug.ts
import { z as z28 } from "zod";
import { toTrpcError as toTrpcError58 } from "@muzammil328/trpc";
var mcqsBySlugInputSchema = z28.object({
  classSlug: z28.string().min(1),
  bookSlug: z28.string().optional(),
  chapterSlug: z28.string().optional(),
  headingSlug: z28.string().optional(),
  subHeadingSlug: z28.string().optional(),
  page: z28.number().int().min(1).default(1),
  limit: z28.number().int().min(1).max(100).default(10)
});
var mcqsBySlug = publicProcedure.input(mcqsBySlugInputSchema).query(async ({ input }) => {
  try {
    const { classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug, page, limit } = input;
    const match = { status: "active" };
    const pipeline = [
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "class"
        }
      },
      { $unwind: { path: "$class", preserveNullAndEmptyArrays: false } },
      { $match: { "class.slug": classSlug } }
    ];
    if (bookSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "books",
            localField: "bookId",
            foreignField: "_id",
            as: "book"
          }
        },
        { $unwind: { path: "$book", preserveNullAndEmptyArrays: false } },
        { $match: { "book.slug": bookSlug } }
      );
    } else {
      pipeline.push({
        $lookup: { from: "books", localField: "bookId", foreignField: "_id", as: "book" }
      }, { $unwind: { path: "$book", preserveNullAndEmptyArrays: true } });
    }
    if (chapterSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "_id",
            as: "chapter"
          }
        },
        { $unwind: { path: "$chapter", preserveNullAndEmptyArrays: false } },
        { $match: { "chapter.slug": chapterSlug } }
      );
    } else {
      pipeline.push({
        $lookup: { from: "chapters", localField: "chapterId", foreignField: "_id", as: "chapter" }
      }, { $unwind: { path: "$chapter", preserveNullAndEmptyArrays: true } });
    }
    if (headingSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "headings",
            localField: "headingId",
            foreignField: "_id",
            as: "heading"
          }
        },
        { $unwind: { path: "$heading", preserveNullAndEmptyArrays: true } },
        { $match: { "heading.slug": headingSlug } }
      );
    }
    if (subHeadingSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "subheadings",
            localField: "subHeadingId",
            foreignField: "_id",
            as: "subHeading"
          }
        },
        { $unwind: { path: "$subHeading", preserveNullAndEmptyArrays: true } },
        { $match: { "subHeading.slug": subHeadingSlug } }
      );
    }
    pipeline.push(
      { $match: match },
      {
        $facet: {
          data: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                mcqId: "$_id",
                slug: 1,
                question: 1,
                options: 1,
                correctOption: 1,
                explanation: 1,
                difficulty: 1,
                className: "$class.name",
                bookName: "$book.name",
                chapterName: "$chapter.name",
                headingName: "$heading.name",
                subHeadingName: "$subHeading.name"
              }
            }
          ],
          total: [{ $count: "count" }]
        }
      }
    );
    const result = await mcqs_model_default.aggregate(pipeline);
    const mcqs = result[0]?.data ?? [];
    const totalRecords = result[0]?.total[0]?.count ?? 0;
    const totalPages = Math.ceil(totalRecords / limit);
    return {
      success: true,
      message: "MCQs fetched successfully",
      data: mcqs.map((item) => ({
        mcqId: String(item.mcqId),
        slug: item.slug,
        question: item.question,
        options: item.options,
        correctOption: item.correctOption,
        explanation: item.explanation,
        difficulty: item.difficulty,
        className: item.className,
        bookName: item.bookName,
        chapterName: item.chapterName,
        headingName: item.headingName,
        subHeadingName: item.subHeadingName
      })),
      pagination: { totalRecords, totalPages, currentPage: page, pageSize: limit }
    };
  } catch (e) {
    throw toTrpcError58(e);
  }
});

// src/routers/public/mcqsSetsBySlug.ts
import { z as z29 } from "zod";
import { toTrpcError as toTrpcError59 } from "@muzammil328/trpc";
var inputSchema = z29.object({
  classSlug: z29.string().min(1),
  bookSlug: z29.string().optional(),
  chapterSlug: z29.string().optional(),
  headingSlug: z29.string().optional(),
  subHeadingSlug: z29.string().optional()
});
var SET_SIZE = 10;
var mcqsSetsBySlug = publicProcedure.input(inputSchema).query(async ({ input }) => {
  try {
    const { classSlug, bookSlug, chapterSlug, headingSlug, subHeadingSlug } = input;
    const pipeline = [
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "class"
        }
      },
      { $unwind: { path: "$class", preserveNullAndEmptyArrays: false } },
      { $match: { "class.slug": classSlug } }
    ];
    if (bookSlug) {
      pipeline.push(
        { $lookup: { from: "books", localField: "bookId", foreignField: "_id", as: "book" } },
        { $unwind: { path: "$book", preserveNullAndEmptyArrays: false } },
        { $match: { "book.slug": bookSlug } }
      );
    }
    if (chapterSlug) {
      pipeline.push(
        { $lookup: { from: "chapters", localField: "chapterId", foreignField: "_id", as: "chapter" } },
        { $unwind: { path: "$chapter", preserveNullAndEmptyArrays: false } },
        { $match: { "chapter.slug": chapterSlug } }
      );
    }
    if (headingSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "headings",
            localField: "headingId",
            foreignField: "_id",
            as: "heading"
          }
        },
        { $unwind: { path: "$heading", preserveNullAndEmptyArrays: true } },
        { $match: { "heading.slug": headingSlug } }
      );
    }
    if (subHeadingSlug) {
      pipeline.push(
        {
          $lookup: {
            from: "subheadings",
            localField: "subHeadingId",
            foreignField: "_id",
            as: "subHeading"
          }
        },
        { $unwind: { path: "$subHeading", preserveNullAndEmptyArrays: true } },
        { $match: { "subHeading.slug": subHeadingSlug } }
      );
    }
    pipeline.push({ $match: { status: "active" } });
    pipeline.push({ $count: "total" });
    const result = await mcqs_model_default.aggregate(pipeline);
    const totalMcqs = result[0]?.total ?? 0;
    const totalSets = Math.ceil(totalMcqs / SET_SIZE);
    const sets = Array.from({ length: totalSets }, (_, i) => ({
      setNumber: i + 1,
      count: i === totalSets - 1 ? totalMcqs - i * SET_SIZE : SET_SIZE
    }));
    return {
      success: true,
      message: "MCQ sets fetched successfully",
      data: {
        totalMcqs,
        totalSets,
        setSize: SET_SIZE,
        sets
      }
    };
  } catch (e) {
    throw toTrpcError59(e);
  }
});

// src/routers/public/getMcqBySlug.ts
import { z as z30 } from "zod";
import { toTrpcError as toTrpcError60 } from "@muzammil328/trpc";
var getMcqBySlug = publicProcedure.input(z30.object({ slug: z30.string().min(1) })).query(async ({ input }) => {
  try {
    const mcq = await mcqs_model_default.findOne({ slug: input.slug, status: "active" }).populate("classId", "name slug").populate("bookId", "name slug").populate("chapterId", "name slug").populate("headingId", "name slug").populate("subHeadingId", "name slug").lean();
    if (!mcq) {
      throw new Error("MCQ not found");
    }
    const c = mcq.classId;
    const b = mcq.bookId;
    const ch = mcq.chapterId;
    const h = mcq.headingId;
    const sh = mcq.subHeadingId;
    return {
      success: true,
      data: {
        mcqId: String(mcq._id),
        slug: mcq.slug,
        question: mcq.question,
        options: mcq.options,
        correctOption: mcq.correctOption,
        explanation: mcq.explanation,
        difficulty: mcq.difficulty,
        className: c?.name,
        bookName: b?.name,
        chapterName: ch?.name,
        headingName: h?.name,
        subHeadingName: sh?.name
      }
    };
  } catch (e) {
    throw toTrpcError60(e);
  }
});

// src/routers/public/booksByClassSlug.ts
import { AppError as AppError44 } from "@muzammil328/server";
import { toTrpcError as toTrpcError61 } from "@muzammil328/trpc";
import { z as z31 } from "zod";
import { buildMatch as buildMatch29 } from "@muzammil328/db";
var booksByClassSlug = publicProcedure.input(z31.object({ classSlug: z31.string().min(1) })).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim().toLowerCase();
    if (!classSlug) throw AppError44.badRequest("Class slug is required");
    const data = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(buildMatch29({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "class.slug": classSlug, "class.status": "active" }).project({ _id: 0, name: 1, slug: 1, image: 1, description: 1 }).build()
    });
    return {
      success: true,
      message: "Books fetched successfully",
      data: data ?? []
    };
  } catch (e) {
    throw toTrpcError61(e);
  }
});

// src/routers/public/bookDetailByClassAndBookSlug.ts
import { AppError as AppError45 } from "@muzammil328/server";
import { toTrpcError as toTrpcError62 } from "@muzammil328/trpc";
import { z as z32 } from "zod";

// src/models/bookPdf.model.ts
import mongoose20, { Schema as Schema19 } from "mongoose";
var BookPdfSchema = new Schema19(
  {
    classId: { type: Schema19.Types.ObjectId, ref: "Class", required: true },
    bookId: { type: Schema19.Types.ObjectId, ref: "Book", required: true },
    medium: { type: String, enum: ["english", "urdu"], required: true },
    fileId: { type: String, required: true },
    fileUrl: { type: String, required: true },
    pages: { type: Number },
    fileSize: { type: Number },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
BookPdfSchema.index({ bookId: 1, medium: 1 }, { unique: true });
BookPdfSchema.index({ classId: 1, status: 1 });
var BookPdf = mongoose20.model("BookPdf", BookPdfSchema);
var bookPdf_model_default = BookPdf;

// src/repository/bookPdf.repository.ts
var BookPdfRepository = class extends BaseRepository {
  constructor() {
    super(bookPdf_model_default);
  }
  async findByBook(bookId) {
    return this.findAll({ query: { bookId, status: "active" } });
  }
};
var bookPdfRepository = new BookPdfRepository();

// src/models/chapterPdf.model.ts
import mongoose21, { Schema as Schema20 } from "mongoose";
var ChapterPdfSchema = new Schema20(
  {
    classId: { type: Schema20.Types.ObjectId, ref: "Class", required: true },
    bookId: { type: Schema20.Types.ObjectId, ref: "Book", required: true },
    chapterId: { type: Schema20.Types.ObjectId, ref: "Chapter", required: true },
    medium: { type: String, enum: ["english", "urdu"], required: true },
    fileId: { type: String, required: true },
    fileUrl: { type: String, required: true },
    pages: { type: Number },
    fileSize: { type: Number },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
ChapterPdfSchema.index({ chapterId: 1, medium: 1 }, { unique: true });
ChapterPdfSchema.index({ bookId: 1, status: 1 });
ChapterPdfSchema.index({ classId: 1, bookId: 1, status: 1 });
var ChapterPdf = mongoose21.model("ChapterPdf", ChapterPdfSchema);
var chapterPdf_model_default = ChapterPdf;

// src/repository/chapterPdf.repository.ts
var ChapterPdfRepository = class extends BaseRepository {
  constructor() {
    super(chapterPdf_model_default);
  }
  async findByChapter(chapterId) {
    return this.findAll({ query: { chapterId, status: "active" } });
  }
  async findByBook(bookId) {
    return this.findAll({ query: { bookId, status: "active" } });
  }
};
var chapterPdfRepository = new ChapterPdfRepository();

// src/routers/public/bookDetailByClassAndBookSlug.ts
import { buildMatch as buildMatch30 } from "@muzammil328/db";
var pdfProject = { _id: 0, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 };
var bookDetailByClassAndBookSlug = publicProcedure.input(
  z32.object({
    classSlug: z32.string().min(1),
    bookSlug: z32.string().min(1)
  })
).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim().toLowerCase();
    const bookSlug = input.bookSlug.trim().toLowerCase();
    const [bookDoc] = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(buildMatch30({ slug: bookSlug, status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "class.slug": classSlug, "class.status": "active" }).project({ bookId: "$_id", name: 1, slug: 1, description: 1, image: 1, pages: 1, externalLinks: 1 }).build()
    });
    if (!bookDoc) throw AppError45.notFound("Book not found");
    const bookId = bookDoc.bookId;
    const [fullBookPdfs, chapters, allChapterPdfs] = await Promise.all([
      bookPdfRepository.aggregate({
        pipeline: bookPdfRepository.pipeline().match(buildMatch30({ bookId, status: "active" })).project(pdfProject).build()
      }),
      chapterRepository.aggregate({
        pipeline: chapterRepository.pipeline().match(buildMatch30({ bookId, status: "active" })).project({ _id: 1, name: 1, slug: 1, order: 1 }).build()
      }),
      chapterPdfRepository.aggregate({
        pipeline: chapterPdfRepository.pipeline().match(buildMatch30({ bookId, status: "active" })).project({ _id: 0, chapterId: 1, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 }).build()
      })
    ]);
    const pdfMap = /* @__PURE__ */ new Map();
    for (const pdf of allChapterPdfs ?? []) {
      const key = pdf.chapterId.toString();
      if (!pdfMap.has(key)) pdfMap.set(key, []);
      const { chapterId: _c, ...rest } = pdf;
      pdfMap.get(key).push(rest);
    }
    const chaptersWithPdfs = (chapters ?? []).map((ch) => ({
      name: ch.name,
      slug: ch.slug,
      order: ch.order,
      pdfs: pdfMap.get(ch._id.toString()) ?? []
    }));
    const b = bookDoc;
    return {
      success: true,
      message: "Book detail fetched successfully",
      data: {
        book: { name: b.name, slug: b.slug, description: b.description, image: b.image, pages: b.pages, externalLinks: b.externalLinks ?? [] },
        fullBookPdfs: fullBookPdfs ?? [],
        chapters: chaptersWithPdfs
      }
    };
  } catch (e) {
    throw toTrpcError62(e);
  }
});

// src/routers/public/chapterDetailByClassBookChapterSlug.ts
import { AppError as AppError46 } from "@muzammil328/server";
import { toTrpcError as toTrpcError63 } from "@muzammil328/trpc";
import { z as z33 } from "zod";
import { buildMatch as buildMatch31 } from "@muzammil328/db";
var pdfProject2 = { _id: 0, medium: 1, fileUrl: 1, fileId: 1, pages: 1, fileSize: 1 };
var chapterDetailByClassBookChapterSlug = publicProcedure.input(
  z33.object({
    classSlug: z33.string().min(1),
    bookSlug: z33.string().min(1),
    chapterSlug: z33.string().min(1)
  })
).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim().toLowerCase();
    const bookSlug = input.bookSlug.trim().toLowerCase();
    const chapterSlug = input.chapterSlug.trim().toLowerCase();
    const [chapterDoc] = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(buildMatch31({ slug: chapterSlug, status: "active" })).lookupOne({
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "book.slug": bookSlug, "book.status": "active" }).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "class.slug": classSlug, "class.status": "active" }).project({ chapterId: "$_id", bookId: 1, name: 1, slug: 1, description: 1, order: 1 }).build()
    });
    if (!chapterDoc) throw AppError46.notFound("Chapter not found");
    const { chapterId, bookId } = chapterDoc;
    const [chapterPdfs, fullBookPdfs, otherChapters] = await Promise.all([
      chapterPdfRepository.aggregate({
        pipeline: chapterPdfRepository.pipeline().match(buildMatch31({ chapterId, status: "active" })).project(pdfProject2).build()
      }),
      bookPdfRepository.aggregate({
        pipeline: bookPdfRepository.pipeline().match(buildMatch31({ bookId, status: "active" })).project(pdfProject2).build()
      }),
      chapterRepository.aggregate({
        pipeline: chapterRepository.pipeline().match({ ...buildMatch31({ bookId, status: "active" }), _id: { $ne: chapterId } }).project({ _id: 0, name: 1, slug: 1, order: 1 }).build()
      })
    ]);
    const c = chapterDoc;
    return {
      success: true,
      message: "Chapter detail fetched successfully",
      data: {
        chapter: { name: c.name, slug: c.slug, description: c.description, order: c.order },
        pdfs: chapterPdfs ?? [],
        fullBookPdfs: fullBookPdfs ?? [],
        otherChapters: otherChapters ?? []
      }
    };
  } catch (e) {
    throw toTrpcError63(e);
  }
});

// src/routers/public/boardsByClassAndService.ts
import { z as z34 } from "zod";
import { toTrpcError as toTrpcError64 } from "@muzammil328/trpc";
import { buildMatch as buildMatch32 } from "@muzammil328/db";
var boardsByClassAndService = publicProcedure.input(z34.object({ classSlug: z34.string().min(1), serviceSlug: z34.string().min(1) })).query(async ({ input }) => {
  try {
    const { classSlug, serviceSlug } = input;
    const result = await boardRepository.aggregate({
      pipeline: boardRepository.pipeline().match(buildMatch32({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "class.slug": classSlug, "class.status": "active" }).lookupOne({
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "service.slug": serviceSlug, "service.status": "active" }).project({ _id: 0, name: 1, slug: 1, description: 1 }).build()
    });
    return {
      success: true,
      message: "Boards fetched successfully",
      data: result ?? []
    };
  } catch (e) {
    throw toTrpcError64(e);
  }
});

// src/routers/public/resultByClassAndBoard.ts
import { z as z35 } from "zod";
import { toTrpcError as toTrpcError65 } from "@muzammil328/trpc";

// src/models/result.model.ts
import mongoose22, { Schema as Schema21 } from "mongoose";
var ResultSchema = new Schema21(
  {
    name: { type: String },
    slug: { type: String },
    description: { type: String },
    classId: { type: Schema21.Types.ObjectId, ref: "Class", required: true, index: true },
    boardId: { type: Schema21.Types.ObjectId, ref: "Board", required: true, index: true },
    year: { type: Number, required: true, default: (/* @__PURE__ */ new Date()).getFullYear() },
    fileId: { type: String, required: true },
    fileUrl: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
ResultSchema.index({ classId: 1, boardId: 1, year: 1 }, { unique: true });
var result_model_default = mongoose22.model("Result", ResultSchema);

// src/routers/public/resultByClassAndBoard.ts
import { AppError as AppError47 } from "@muzammil328/server";
var resultByClassAndBoard = publicProcedure.input(z35.object({ classSlug: z35.string().min(1), boardSlug: z35.string().min(1) })).query(async ({ input }) => {
  try {
    const { classSlug, boardSlug } = input;
    const classDoc = await class_model_default.findOne({ slug: classSlug, status: "active" });
    if (!classDoc) throw AppError47.notFound("Class not found");
    const boardDoc = await board_model_default.findOne({ slug: boardSlug, classId: classDoc._id, status: "active" });
    if (!boardDoc) throw AppError47.notFound("Board not found");
    const result = await result_model_default.findOne({
      classId: classDoc._id,
      boardId: boardDoc._id,
      status: "active"
    }).sort({ year: -1 });
    return {
      success: true,
      message: result ? "Result fetched successfully" : "No result found",
      data: result ? {
        year: result.year,
        fileId: result.fileId,
        fileUrl: result.fileUrl,
        boardName: boardDoc.name
      } : null
    };
  } catch (e) {
    throw toTrpcError65(e);
  }
});

// src/routers/public/pairingSchemeByClassAndBoard.ts
import { z as z36 } from "zod";
import { toTrpcError as toTrpcError66 } from "@muzammil328/trpc";

// src/models/pairingScheme.model.ts
import mongoose23, { Schema as Schema22 } from "mongoose";
var PairingSchemeSchema2 = new Schema22(
  {
    classId: { type: Schema22.Types.ObjectId, ref: "Class", required: true, index: true },
    boardId: { type: Schema22.Types.ObjectId, ref: "Board", required: true, index: true },
    year: { type: Number, required: true, default: (/* @__PURE__ */ new Date()).getFullYear() },
    image: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
PairingSchemeSchema2.index({ classId: 1, boardId: 1, year: 1 }, { unique: true });
var pairingScheme_model_default = mongoose23.model("PairingScheme", PairingSchemeSchema2);

// src/routers/public/pairingSchemeByClassAndBoard.ts
import { AppError as AppError48 } from "@muzammil328/server";
var pairingSchemeByClassAndBoard = publicProcedure.input(z36.object({ classSlug: z36.string().min(1), boardSlug: z36.string().min(1) })).query(async ({ input }) => {
  try {
    const { classSlug, boardSlug } = input;
    const classDoc = await class_model_default.findOne({ slug: classSlug, status: "active" });
    if (!classDoc) throw AppError48.notFound("Class not found");
    const boardDoc = await board_model_default.findOne({ slug: boardSlug, classId: classDoc._id, status: "active" });
    if (!boardDoc) throw AppError48.notFound("Board not found");
    const scheme = await pairingScheme_model_default.findOne({
      classId: classDoc._id,
      boardId: boardDoc._id,
      status: "active"
    }).sort({ year: -1 });
    return {
      success: true,
      message: scheme ? "Pairing scheme fetched successfully" : "No pairing scheme found",
      data: scheme ? {
        year: scheme.year,
        image: scheme.image,
        boardName: boardDoc.name
      } : null
    };
  } catch (e) {
    throw toTrpcError66(e);
  }
});

// src/routers/public/dateSheetByClassAndBoard.ts
import { z as z37 } from "zod";
import { toTrpcError as toTrpcError67 } from "@muzammil328/trpc";

// src/models/dateSheet.model.ts
import mongoose24, { Schema as Schema23 } from "mongoose";
var DateSheetSchema = new Schema23(
  {
    classId: { type: Schema23.Types.ObjectId, ref: "Class", required: true, index: true },
    boardId: { type: Schema23.Types.ObjectId, ref: "Board", required: true, index: true },
    year: { type: Number, required: true, default: (/* @__PURE__ */ new Date()).getFullYear() },
    image: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active }
  },
  { timestamps: true }
);
DateSheetSchema.index({ classId: 1, boardId: 1, year: 1 }, { unique: true });
var dateSheet_model_default = mongoose24.model("DateSheet", DateSheetSchema);

// src/routers/public/dateSheetByClassAndBoard.ts
import { AppError as AppError49 } from "@muzammil328/server";
var dateSheetByClassAndBoard = publicProcedure.input(z37.object({ classSlug: z37.string().min(1), boardSlug: z37.string().min(1) })).query(async ({ input }) => {
  try {
    const { classSlug, boardSlug } = input;
    const classDoc = await class_model_default.findOne({ slug: classSlug, status: "active" });
    if (!classDoc) throw AppError49.notFound("Class not found");
    const boardDoc = await board_model_default.findOne({ slug: boardSlug, classId: classDoc._id, status: "active" });
    if (!boardDoc) throw AppError49.notFound("Board not found");
    const sheet = await dateSheet_model_default.findOne({
      classId: classDoc._id,
      boardId: boardDoc._id,
      status: "active"
    }).sort({ year: -1 });
    return {
      success: true,
      message: sheet ? "Date sheet fetched successfully" : "No date sheet found",
      data: sheet ? { year: sheet.year, image: sheet.image, boardName: boardDoc.name } : null
    };
  } catch (e) {
    throw toTrpcError67(e);
  }
});

// src/routers/public/booksByClassWithChapters.ts
import { z as z38 } from "zod";
import { toTrpcError as toTrpcError68 } from "@muzammil328/trpc";
import { buildMatch as buildMatch33 } from "@muzammil328/db";
var booksByClassWithChapters = publicProcedure.input(z38.object({ classSlug: z38.string().min(1) })).query(async ({ input }) => {
  try {
    const classSlug = input.classSlug.trim().toLowerCase();
    const books = await bookRepository.aggregate({
      pipeline: bookRepository.pipeline().match(buildMatch33({ status: "active" })).lookupOne({
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
        pick: ["slug", "status"],
        unwind: false
      }).match({ "class.slug": classSlug, "class.status": "active" }).project({ bookId: "$_id", name: 1, slug: 1, description: 1, image: 1 }).build()
    });
    if (!books?.length) {
      return { success: true, message: "No books found", data: [] };
    }
    const bookIds = books.map((b) => b.bookId);
    const chapters = await chapterRepository.aggregate({
      pipeline: chapterRepository.pipeline().match(buildMatch33({ bookId: { $in: bookIds }, status: "active" })).project({ _id: 0, chapterId: "$_id", bookId: 1, name: 1, slug: 1, order: 1 }).build()
    });
    const chaptersByBook = /* @__PURE__ */ new Map();
    for (const ch of chapters ?? []) {
      const key = ch.bookId.toString();
      if (!chaptersByBook.has(key)) chaptersByBook.set(key, []);
      chaptersByBook.get(key).push(ch);
    }
    const data = books.map((book) => ({
      name: book.name,
      slug: book.slug,
      description: book.description,
      image: book.image,
      chapters: (chaptersByBook.get(book.bookId.toString()) ?? []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((ch) => ({ name: ch.name, slug: ch.slug }))
    }));
    return { success: true, message: "Books with chapters fetched", data };
  } catch (e) {
    throw toTrpcError68(e);
  }
});

// src/routers/public/public.router.ts
var publicRouter = createTRPCRouter({
  getServiceByClassSlug: serviceByClassSlug,
  getBookByClassAndServiceSlug: bookGetByClassAndServiceSlug,
  getChapterByClassAndServiceAndSubjectSlug: chapterGetByClassAndServiceAndSubjectSlug,
  getByHeadingClassAndServiceAndSubjectAndChapterSlug: headingGetByClassAndServiceAndSubjectAndChapterSlug,
  getBySubHeadingClassAndServiceAndSubjectAndChapterAndHeadingSlug: subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug,
  getMcqsBySlug: mcqsBySlug,
  getMcqsSetsBySlug: mcqsSetsBySlug,
  getMcqBySlug,
  getByBoardSlug: boardGetBySlug,
  getByClassServiceSlug: classGetByServiceSlug,
  // Boards & Results
  getBoardsByClassAndService: boardsByClassAndService,
  getResultByClassAndBoard: resultByClassAndBoard,
  getPairingSchemeByClassAndBoard: pairingSchemeByClassAndBoard,
  getDateSheetByClassAndBoard: dateSheetByClassAndBoard,
  getBooksByClassWithChapters: booksByClassWithChapters,
  // Books public API
  getBooksByClass: booksByClassSlug,
  getBookDetail: bookDetailByClassAndBookSlug,
  getChapterDetail: chapterDetailByClassBookChapterSlug,
  // Sitemap
  sitemapStatic,
  sitemapClasses,
  sitemapBooks,
  sitemapChapters,
  sitemapBoards,
  sitemapHeadings,
  sitemapSubHeadings,
  sitemapOnlineTest,
  sitemapVu
});

// src/trpc/router.ts
var appRouter = createTRPCRouter({
  auth: authRouter,
  user: authRouter2,
  class: classRouter,
  book: bookRouter,
  chapter: chapterRouter,
  heading: headingRouter,
  subHeading: subHeadingRouter,
  service: serviceRouter,
  board: boardRouter,
  mcqs: mcqsRouter,
  mcqAttempt: mcqAttemptRouter,
  institution: institutionRouter,
  feedback: feedbackRouter,
  comment: commentRouter,
  student: studentRouter,
  public: publicRouter,
  userProgress: userProgressRouter,
  adaptiveMcq: adaptiveMcqRouter,
  analytics: analyticsRouter,
  payment: paymentRouter,
  bulkImport: bulkImportRouter
});

// src/trpc/context.ts
import { createJwt as createJwt2 } from "@muzammil328/services";
var jwt = createJwt2({
  accessSecret: config.JWT_ACCESS_TOKEN_SECRET_KEY ?? "your-secret-key",
  refreshSecret: config.JWT_REFRESH_TOKEN_SECRET_KEY ?? "your-refresh-secret"
});
var verifyAccessToken = async (token) => {
  const verification = jwt.verifyAccess(token);
  if (!verification.valid || !verification.payload) {
    return null;
  }
  const payload = verification.payload;
  const rawUserId = payload["userId"] ?? payload["id"];
  if (!rawUserId) {
    return null;
  }
  const id = String(rawUserId);
  const email = payload["email"] ? String(payload["email"]) : void 0;
  const role = payload["role"] ? String(payload["role"]) : "guest";
  const user = await user_model_default.findById(id).select("subscriptionPlan subscriptionExpiresAt institutionId").lean();
  return {
    userId: id,
    email,
    role,
    subscriptionPlan: user?.subscriptionPlan ?? "free",
    subscriptionExpiresAt: user?.subscriptionExpiresAt ?? void 0,
    institutionId: user?.institutionId?.toString()
  };
};
var extractToken = (req) => {
  const cookies = req.cookies;
  const cookie = cookies?.["token"];
  if (cookie) return cookie;
  const headers = req.headers;
  const authHeader = headers["authorization"];
  const header = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7);
  }
  return null;
};
var createTRPCContext = async (opts) => {
  const token = extractToken(opts.req);
  const user = token ? await verifyAccessToken(token) : null;
  return { user, req: opts.req, res: opts.res };
};

// src/core/servers/routes.ts
function registerRoutes(app2) {
  app2.get("/health", (_req, res) => {
    res.status(StatusCode3.OK).json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime()
    });
  });
  app2.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext
    })
  );
  app2.use((req, res) => {
    res.status(StatusCode3.NOT_FOUND).json({
      message: "Route not found",
      path: req.path,
      method: req.method
    });
  });
}

// src/core/servers/express.ts
import express from "express";
import { globalErrorHandler } from "@muzammil328/server";
import { createHelmet, httpLogger, createCsrf, createApiRateLimiter } from "@muzammil328/services";
var helmetMiddleware = createHelmet();
var corsMiddleware = cors({
  origin: config.CORS_ORIGIN.split(",").filter(Boolean),
  credentials: true
});
var csrfProtection = createCsrf();
var apiRateLimiter = createApiRateLimiter();
function createExpressApp() {
  const app2 = express();
  app2.use(helmetMiddleware);
  app2.use(corsMiddleware);
  app2.use(express.json());
  app2.use(express.urlencoded({ extended: true }));
  app2.use(cookieParser());
  app2.use(httpLogger);
  app2.use(apiRateLimiter);
  app2.use(csrfProtection);
  app2.get("/csrf-token", (req, res) => {
    res.json({ token: req.csrfToken?.() });
  });
  registerRoutes(app2);
  app2.use((err, req, res, next) => {
    globalErrorHandler(err, req, res, next);
  });
  return app2;
}

// src/core/lifecycle/on-startup.ts
import { logTreeStep as logTreeStep3 } from "@muzammil328/services";

// src/config/redis.config.ts
import {
  createRedisClient,
  getRedisClient,
  closeRedisClient,
  cacheSet,
  cacheGet,
  cacheDelete,
  cacheDeletePattern,
  cacheGetOrSet,
  checkRateLimit,
  checkSlidingRateLimit
} from "@muzammil328/db";
async function initRedis() {
  try {
    const existing = getRedisClient();
    existing.ping();
    return;
  } catch {
    const client = createRedisClient({
      url: config.REDIS_URL,
      enableOfflineQueue: true,
      maxRetries: 10,
      retryDelayMs: 200
    });
    try {
      await client.ping();
    } catch {
    }
  }
}

// src/core/lifecycle/on-startup.ts
import { initializeAuthServer } from "@muzammil328/services";
async function initializeServices() {
  try {
    logTreeStep3("Initializing services...");
    const redisInit = initRedis().then(() => logTreeStep3("Redis connected successfully")).catch((redisError) => {
      const err = redisError instanceof Error ? redisError.message : String(redisError);
      logTreeStep3(`\u26A0\uFE0F Redis connection failed, continuing without Redis: ${err}`);
    });
    await Promise.all([
      connectMongo({ uri: config.MONGODB_URI }),
      redisInit
    ]);
    const accessSecret = config.JWT_ACCESS_TOKEN_SECRET_KEY ?? config.JWT_REFRESH_TOKEN_SECRET_KEY;
    const refreshSecret = config.JWT_REFRESH_TOKEN_SECRET_KEY;
    initializeAuthServer({
      accessSecret,
      refreshSecret,
      accessExpiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN ?? "1d",
      refreshExpiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN
    });
    logTreeStep3("Token service initialized");
    logTreeStep3("\u2705 Services initialized");
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logTreeStep3(`\u274C Failed to initialize services: ${err.message}`);
    throw error;
  }
}

// api/_handler.ts
import { registerGlobalErrorHandlers, logger } from "@muzammil328/services";
registerGlobalErrorHandlers(logger);
var app = createExpressApp();
var initialized = false;
async function handler(req, res) {
  if (!initialized) {
    initialized = true;
    initializeServices().catch((err) => {
      logger.error("Failed to initialize services:", err);
    });
  }
  app(req, res);
}
export {
  handler as default
};
