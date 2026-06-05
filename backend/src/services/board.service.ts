import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { boardRepository } from '../repository/board.repository';
import { Status } from '@muzammil328/education-packages/types';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetBoardsInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
}

export interface GetDropdownInput {
  search?: string;
}

export interface CreateBoardInput {
  name: string;
  status: Status;
  classId?: string;
  description?: string;
}

export interface UpdateBoardInput {
  id: string;
  name: string;
  status: Status;
  classId?: string;
  description?: string;
}

export const boardService = {
  async getAll(input: GetBoardsInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: { status: string } = { status: input.status ?? 'active' };

    return boardRepository.aggregatePaginate({
      pipeline: [
        { $match: match },
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'classDoc',
          },
        },
        { $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true } },
        { $sort: { [sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            boardId: '$_id',
            name: 1,
            slug: 1,
            status: 1,
            description: 1,
            className: '$classDoc.name',
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid board ID format');
    }

    const result = await boardRepository.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $project: {
          _id: 0,
          boardId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          description: 1,
          classId: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw AppError.notFound('Board not found');
    }

    return result[0];
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';

    return boardRepository.aggregate([
      {
        $match: {
          name: { $regex: escapeRegex(search), $options: 'i' },
          status: 'active',
        },
      },
      { $sort: { name: 1 } },
      { $project: { _id: 1, name: 1 } },
    ]);
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Board slug is required');
    }

    const board = await boardRepository.findOne({ slug: slug.toLowerCase() });

    if (!board) {
      throw AppError.notFound('Board not found');
    }

    const populated = await board.populate({
      path: 'classId',
      select: 'name slug',
    });

    return {
      boardId: String(populated._id),
      name: populated.name,
      slug: populated.slug,
      status: populated.status,
      description: populated.description,
      class: populated.classId
        ? {
            classId: String((populated.classId as unknown as { _id: unknown; name: string; slug: string })._id),
            name: (populated.classId as unknown as { _id: unknown; name: string; slug: string }).name,
            slug: (populated.classId as unknown as { _id: unknown; name: string; slug: string }).slug,
          }
        : null,
    };
  },

  async create(input: CreateBoardInput) {
    const { name, status, classId, description } = input;

    if (!name) {
      throw AppError.badRequest('Board name is required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existing = await boardRepository.findOne({ $or: [{ slug }, { name }] });
    if (existing) {
      throw AppError.badRequest('Board already exists');
    }

    return boardRepository.create({
      name,
      slug,
      status,
      description,
      classId: parseObjectId(classId),
    });
  },

  async update(input: UpdateBoardInput) {
    const { id, name, status, classId, description } = input;

    if (!id) {
      throw AppError.badRequest('Invalid board ID');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const duplicate = await boardRepository.findOne({
      $or: [{ name }, { slug }],
      _id: { $ne: new Types.ObjectId(id) },
    });

    if (duplicate) {
      throw AppError.badRequest('Board already exists');
    }

    const updated = await boardRepository.findByIdAndUpdate(
      id,
      { name, slug, status, description, classId: parseObjectId(classId) },
      { new: true }
    );

    if (!updated) {
      throw AppError.notFound('Board not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid board ID');
    }

    const deleted = await boardRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('Board not found');
    }

    return deleted;
  },
};
