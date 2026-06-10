import { TRPCError } from '@trpc/server';
import { Types } from 'mongoose';
import { classGroupRepository } from '../repository/classGroup.repository';

interface CreateClassGroupInput {
  name: string;
  classIds?: string[];
}

interface AddStudentsToClassGroupInput {
  groupId: string;
  studentIds: string[];
}

export interface ClassGroupDetail {
  groupId: string;
  name: string;
  memberCount: number;
  members: Array<{
    userId: string;
    username: string;
    email: string;
  }>;
  createdAt?: Date;
}

export const classGroupService = {
  async create(adminId: string, input: CreateClassGroupInput) {
    const group = await classGroupRepository.create({
      name: input.name,
      admin: new Types.ObjectId(adminId),
      members: [],
      classIds: input.classIds?.map((id: string) => new Types.ObjectId(id)) || [],
    });

    return {
      groupId: String(group._id),
      name: group.name,
    };
  },

  async addStudents(input: AddStudentsToClassGroupInput) {
    const group = await classGroupRepository.findById(new Types.ObjectId(input.groupId));
    if (!group) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Class group not found' });
    }

    const existingMemberIds = group.members.map((m: { toString: () => string }) => m.toString());
    const newMembers = input.studentIds
      .filter((id: string) => !existingMemberIds.includes(id))
      .map((id: string) => new Types.ObjectId(id));

    const updated = await classGroupRepository.findByIdAndUpdate(new Types.ObjectId(input.groupId),
      { $addToSet: { members: { $each: newMembers } } },
      { new: true }
    );

    return {
      groupId: String(updated?._id),
      memberCount: updated?.members.length || 0,
    };
  },

  async getAll(adminId: string) {
    const groups = await classGroupRepository.findAll({
      query: { admin: new Types.ObjectId(adminId) },
    });

    return groups.map(group => ({
      groupId: String(group._id),
      name: group.name,
      memberCount: group.members.length,
      createdAt: group.createdAt,
    }));
  },

  async getById(groupId: string) {
    const result = await classGroupRepository.aggregate<ClassGroupDetail>({pipeline: [
      { $match: { _id: new Types.ObjectId(groupId) } },
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
    ]});

    if (!result.length) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Class group not found' });
    }

    return result[0];
  },
};
