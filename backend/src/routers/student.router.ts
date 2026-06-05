import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Types } from 'mongoose';
import { createTRPCRouter, protectedProcedure } from '@/trpc/trpc';
import { userRepository } from '../repository/user.repository';
import { classGroupRepository } from '../repository/classGroup.repository';
import { createBcrypt } from '@muzammil328/services';
import { emailSchema } from '@muzammil328/types';
import { RoleEnum } from '@muzammil328/education-packages/enums';

const studentSchema = z.object({
  username: z.string().min(3),
  email: emailSchema,
  password: z.string().min(6),
});

const addStudentsSchema = z.object({
  students: z.array(studentSchema).min(1).max(100),
});

const classGroupSchema = z.object({
  name: z.string().min(1),
  classIds: z.array(z.string()).optional(),
});

interface StudentListItem {
  userId: Types.ObjectId;
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt?: Date;
}

export const studentRouter = createTRPCRouter({
  addStudent: protectedProcedure.input(studentSchema).mutation(async ({ input }) => {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Email already exists' });
    }

    const hashedPassword = await createBcrypt().hash(input.password, 12);

    const student = await userRepository.create({
      ...input,
      password: hashedPassword,
      role: RoleEnum.Student,
    });

    return {
      success: true,
      message: 'Student added successfully',
      data: {
        userId: String(student._id),
        username: student.username,
        email: student.email,
      },
    };
  }),

  addStudents: protectedProcedure.input(addStudentsSchema).mutation(async ({ input }) => {
    const results = {
      success: [] as string[],
      failed: [] as { email: string; reason: string }[],
    };

    for (const student of input.students) {
      try {
        const existingUser = await userRepository.findByEmail(student.email);
        if (existingUser) {
          results.failed.push({ email: student.email, reason: 'Email already exists' });
          continue;
        }

        const hashedPassword = await createBcrypt().hash(student.password, 12);
        await userRepository.create({
          ...student,
          password: hashedPassword,
          role: RoleEnum.Student,
        });

        results.success.push(student.email);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        results.failed.push({ email: student.email, reason: 'Failed to create student' });
      }
    }

    return {
      success: results.failed.length === 0,
      message: `Added ${results.success.length} students, ${results.failed.length} failed`,
      data: results,
    };
  }),

  getStudents: protectedProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const match: Record<string, unknown> = { role: RoleEnum.Student };

      if (input.search) {
        match.$or = [
          { username: { $regex: input.search, $options: 'i' } },
          { email: { $regex: input.search, $options: 'i' } },
        ];
      }

      const result = await userRepository.aggregatePaginate<StudentListItem>({
        pipeline: [
          { $match: match },
          { $sort: { createdAt: -1 } },
          {
            $project: {
              _id: 0,
              userId: '$_id',
              username: 1,
              email: 1,
              role: 1,
              isEmailVerified: 1,
              createdAt: 1,
            },
          },
        ],
        page: input.page,
        limit: input.limit,
      });

      return {
        success: true,
        message: 'Students fetched successfully',
        data: (result.data || []).map(item => ({
          userId: String(item.userId),
          username: item.username,
          email: item.email,
          role: item.role,
          isEmailVerified: item.isEmailVerified,
          createdAt: item.createdAt,
        })),
        pagination: result.pagination,
      };
    }),

  deleteStudent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const deleted = await userRepository.findByIdAndDelete(input.id);
      if (!deleted) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Student not found' });
      }

      return {
        success: true,
        message: 'Student deleted successfully',
      };
    }),

  createClassGroup: protectedProcedure.input(classGroupSchema).mutation(async ({ ctx, input }) => {
    const group = await classGroupRepository.create({
      name: input.name,
      admin: new Types.ObjectId(ctx.user?.userId),
      members: [],
      classIds: input.classIds?.map(id => new Types.ObjectId(id)) || [],
    });

    return {
      success: true,
      message: 'Class group created successfully',
      data: {
        groupId: String(group._id),
        name: group.name,
      },
    };
  }),

  addStudentsToClassGroup: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        studentIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const group = await classGroupRepository.findById(input.groupId);
      if (!group) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Class group not found' });
      }

      const newMembers = input.studentIds
        .filter(
          id => !group.members.map((m: { toString: () => unknown }) => m.toString()).includes(id)
        )
        .map(id => new Types.ObjectId(id));

      const updated = await classGroupRepository.findByIdAndUpdate(
        input.groupId,
        { $addToSet: { members: { $each: newMembers } } },
        { new: true }
      );

      return {
        success: true,
        message: 'Students added to class group',
        data: {
          groupId: String(updated?._id),
          memberCount: updated?.members.length || 0,
        },
      };
    }),

  getClassGroups: protectedProcedure.query(async ({ ctx }) => {
    const groups = await classGroupRepository.findAll({
      query: { admin: new Types.ObjectId(ctx.user?.userId) },
    });

    return {
      success: true,
      message: 'Class groups fetched successfully',
      data: groups.map(group => ({
        groupId: String(group._id),
        name: group.name,
        memberCount: group.members.length,
        createdAt: group.createdAt,
      })),
    };
  }),

  getClassGroupDetails: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ input }) => {
      const group = await classGroupRepository.aggregate([
        { $match: { _id: new Types.ObjectId(input.groupId) } },
        {
          $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'memberDetails',
          },
        },
        {
          $project: {
            _id: 0,
            groupId: '$_id',
            name: 1,
            memberCount: { $size: '$members' },
            members: {
              $map: {
                input: '$memberDetails',
                as: 'member',
                in: {
                  userId: { $toString: '$$member._id' },
                  username: '$$member.username',
                  email: '$$member.email',
                },
              },
            },
            createdAt: 1,
          },
        },
      ]);

      if (!group.length) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Class group not found' });
      }

      return {
        success: true,
        data: group[0],
      };
    }),
});
