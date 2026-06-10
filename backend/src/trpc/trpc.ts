import { initTRPC } from '@trpc/server';
import { TRPCError, loggerMiddleware, toTrpcError, mergeRouters } from '@muzammil328/trpc';
import type { TRPCContext } from './context';
import { RoleEnum } from '@muzammil328/education-packages/enums';

type TRPCFactory = ReturnType<typeof initTRPC.context<TRPCContext>>;
type TRPCBuilder = ReturnType<TRPCFactory['create']>;

const t: TRPCBuilder = initTRPC.context<TRPCContext>().create();
type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
type ProcedureBuilder = typeof t.procedure;

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware as any);

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed).use(loggerMiddleware as any);

const hasRole = (allowedRoles: Role[]) =>
  t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
    }

    if (!allowedRoles.includes(ctx.user.role as Role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions',
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });

const SUPER_ADMIN_ROLES: Role[] = [RoleEnum.SuperAdmin];
const TEACHER_ROLES: Role[] = [RoleEnum.Teacher, RoleEnum.SuperAdmin];
const STUDENT_ROLES: Role[] = [RoleEnum.Student, RoleEnum.Guest];

export const superAdminProcedure: ProcedureBuilder = protectedProcedure.use(
  hasRole(SUPER_ADMIN_ROLES),
);

export const teacherProcedure: ProcedureBuilder = protectedProcedure.use(hasRole(TEACHER_ROLES));

export const studentProcedure: ProcedureBuilder = protectedProcedure.use(hasRole(STUDENT_ROLES));

export const authProcedure: ProcedureBuilder = protectedProcedure;

export { TRPCError, toTrpcError, mergeRouters };
