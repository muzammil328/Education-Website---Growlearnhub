import { Types } from 'mongoose';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, superAdminProcedure } from '@/trpc/trpc';
import Payment from '@/models/payment.model';
import Institution from '@/models/institution.model';
import User from '@/models/user.model';
import { PaymentStatusEnum, PaymentTypeEnum, SubscriptionPlanEnum } from '@muzammil328/education-packages/enums';

const PLAN_PRICES: Record<string, { amount: number; durationDays: number; maxStudents: number; maxTeachers: number }> = {
  basic: { amount: 2999, durationDays: 30, maxStudents: 200, maxTeachers: 10 },
  premium: { amount: 7999, durationDays: 30, maxStudents: 1000, maxTeachers: 50 },
  enterprise: { amount: 19999, durationDays: 30, maxStudents: 10000, maxTeachers: 200 },
};

export const paymentRouter = createTRPCRouter({
  /** Initiate a subscription purchase (mock — no real gateway; records as pending) */
  initSubscription: protectedProcedure
    .input(z.object({
      plan: z.enum(['basic', 'premium', 'enterprise']),
      institutionId: z.string().optional(),
      transactionId: z.string().optional(), // provided by client after gateway handoff
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.userId;
      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const meta = PLAN_PRICES[input.plan];
      if (!meta) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Unknown plan' });

      const payment = await Payment.create({
        user: new Types.ObjectId(userId),
        amount: meta.amount,
        currency: 'PKR',
        type: input.institutionId ? PaymentTypeEnum.Institution : PaymentTypeEnum.Subscription,
        status: input.transactionId ? PaymentStatusEnum.Completed : PaymentStatusEnum.Pending,
        transactionId: input.transactionId,
        provider: 'manual',
        startDate: new Date(),
        endDate: new Date(Date.now() + meta.durationDays * 86400000),
      });

      // If completed and institution-linked, update institution plan
      if (input.transactionId && input.institutionId && Types.ObjectId.isValid(input.institutionId)) {
        await Institution.findByIdAndUpdate(input.institutionId, {
          subscriptionPlan: input.plan,
          subscriptionExpiresAt: payment.endDate,
          maxStudents: meta.maxStudents,
          maxTeachers: meta.maxTeachers,
        });
      }

      return {
        success: true,
        paymentId: String(payment._id),
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        expiresAt: payment.endDate?.toISOString(),
      };
    }),

  /** Confirm a pending payment (called by webhook or admin) */
  confirmPayment: superAdminProcedure
    .input(z.object({
      paymentId: z.string(),
      transactionId: z.string(),
      institutionId: z.string().optional(),
      plan: z.enum(['basic', 'premium', 'enterprise']).optional(),
    }))
    .mutation(async ({ input }) => {
      if (!Types.ObjectId.isValid(input.paymentId)) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
      const payment = await Payment.findByIdAndUpdate(input.paymentId, {
        status: PaymentStatusEnum.Completed,
        transactionId: input.transactionId,
      }, { new: true });

      if (!payment) throw new TRPCError({ code: 'NOT_FOUND', message: 'Payment not found' });

      if (input.institutionId && input.plan && Types.ObjectId.isValid(input.institutionId)) {
        const meta = PLAN_PRICES[input.plan];
        if (meta) {
          await Institution.findByIdAndUpdate(input.institutionId, {
            subscriptionPlan: input.plan,
            subscriptionExpiresAt: payment.endDate,
            maxStudents: meta.maxStudents,
            maxTeachers: meta.maxTeachers,
          });
        }
      }

      return { success: true };
    }),

  /** Student's own payment history */
  myHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.userId;
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    const payments = await Payment.find({ user: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return {
      data: payments.map(p => ({
        id: String(p._id),
        amount: p.amount,
        currency: p.currency,
        type: p.type,
        status: p.status,
        transactionId: p.transactionId,
        startDate: p.startDate?.toISOString(),
        endDate: p.endDate?.toISOString(),
        createdAt: (p as unknown as { createdAt: Date }).createdAt?.toISOString(),
      })),
    };
  }),

  /** Admin — all payments with pagination */
  adminList: superAdminProcedure
    .input(z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().max(100).default(20),
      status: z.enum(['all', 'pending', 'completed', 'failed', 'refunded']).default('all'),
    }))
    .query(async ({ input }) => {
      const filter: Record<string, unknown> = {};
      if (input.status !== 'all') filter.status = input.status;
      const skip = (input.page - 1) * input.limit;
      const [data, total] = await Promise.all([
        Payment.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(input.limit)
          .populate('user', 'username email')
          .lean(),
        Payment.countDocuments(filter),
      ]);

      return {
        data: (data as Array<Record<string, unknown> & { user?: { username?: string; email?: string } }>).map(p => ({
          id: String(p._id),
          user: p.user ? { username: (p.user as { username?: string }).username, email: (p.user as { email?: string }).email } : null,
          amount: p.amount as number,
          currency: p.currency as string,
          type: p.type as string,
          status: p.status as string,
          transactionId: p.transactionId as string | undefined,
          startDate: (p.startDate as Date | undefined)?.toISOString(),
          endDate: (p.endDate as Date | undefined)?.toISOString(),
          createdAt: (p.createdAt as Date | undefined)?.toISOString(),
        })),
        pagination: { total, page: input.page, pages: Math.ceil(total / input.limit) },
      };
    }),

  /** Admin — revenue summary */
  revenueSummary: superAdminProcedure.query(async () => {
    const [totalRevenue, monthRevenue, pendingCount, completedCount] = await Promise.all([
      Payment.aggregate([
        { $match: { status: PaymentStatusEnum.Completed } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.aggregate([
        {
          $match: {
            status: PaymentStatusEnum.Completed,
            createdAt: { $gte: new Date(Date.now() - 30 * 86400000) },
          },
        },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.countDocuments({ status: PaymentStatusEnum.Pending }),
      Payment.countDocuments({ status: PaymentStatusEnum.Completed }),
    ]);

    return {
      totalRevenuePKR: totalRevenue[0]?.total ?? 0,
      monthRevenuePKR: monthRevenue[0]?.total ?? 0,
      pendingCount,
      completedCount,
    };
  }),

  /** Plan metadata (public — no auth needed for pricing page) */
  plans: protectedProcedure.query(() => {
    return {
      plans: [
        {
          key: 'free',
          label: 'Free',
          price: 0,
          currency: 'PKR',
          durationDays: null,
          features: ['Up to 50 students', 'Basic MCQ access', 'Student dashboard'],
          maxStudents: 50,
          maxTeachers: 5,
        },
        {
          key: 'basic',
          label: 'Basic',
          price: PLAN_PRICES.basic.amount,
          currency: 'PKR',
          durationDays: 30,
          features: ['Up to 200 students', 'Adaptive MCQ engine', 'Teacher dashboard', 'Distractor intelligence', 'Student progress tracking'],
          maxStudents: 200,
          maxTeachers: 10,
        },
        {
          key: 'premium',
          label: 'Premium',
          price: PLAN_PRICES.premium.amount,
          currency: 'PKR',
          durationDays: 30,
          features: ['Up to 1,000 students', 'All Basic features', 'Analytics platform', 'Exam countdown', 'Gamification & badges', 'Bulk MCQ import'],
          maxStudents: 1000,
          maxTeachers: 50,
        },
        {
          key: 'enterprise',
          label: 'Enterprise',
          price: PLAN_PRICES.enterprise.amount,
          currency: 'PKR',
          durationDays: 30,
          features: ['Unlimited students', 'All Premium features', 'Dedicated support', 'Custom branding', 'API access'],
          maxStudents: 10000,
          maxTeachers: 200,
        },
      ],
    };
  }),
});
