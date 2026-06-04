import { Types } from 'mongoose';
import { resultRepository } from '../repository/result.repository';
import { AppError } from '@muzammil328/core';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetResultsInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
}

export interface CreateResultInput {
  name: string;
  classId: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateResultInput {
  id: string;
  name?: string;
  classId?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export const resultService = {
  async getAll(input: GetResultsInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    const sort = input.sort ?? 'name';
    const match: Record<string, unknown> = { status: input.status ?? 'active' };

    const classIdObj = parseObjectId(input.classId);
    if (classIdObj) {
      match.classId = classIdObj;
    }

    if (input.search) {
      const searchRegex = escapeRegex(input.search);
      match.name = { $regex: searchRegex, $options: 'i' };
    }

    return resultRepository.aggregatePaginate({
      pipeline: [
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'classDoc',
          },
        },
        {
          $unwind: {
            path: '$classDoc',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            resultId: '$_id',
            name: 1,
            slug: 1,
            description: 1,
            status: 1,
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
      throw AppError.badRequest('Invalid result ID format');
    }

    const result = await resultRepository.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      {
        $unwind: {
          path: '$classDoc',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          resultId: '$_id',
          name: 1,
          slug: 1,
          description: 1,
          status: 1,
          class: {
            classId: '$classDoc._id',
            className: '$classDoc.name',
          },
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw AppError.notFound('Result not found');
    }

    return result[0];
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Slug is required');
    }

    const result = await resultRepository.findBySlug(slug);

    if (!result) {
      throw AppError.notFound('Result not found');
    }

    return result;
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId);
    const formatSearch = escapeRegex(search);

    return resultRepository.aggregate([
      {
        $match: {
          name: { $regex: formatSearch, $options: 'i' },
          status: 'active',
          ...(classId ? { classId } : {}),
        },
      },
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);
  },

  async getByClassName(className: string) {
    if (!className) {
      throw AppError.badRequest('Class name is required');
    }

    return resultRepository.aggregate([
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: 'name',
          as: 'classDoc',
        },
      },
      {
        $match: {
          'classDoc.name': className,
        },
      },
    ]);
  },

  async create(input: CreateResultInput) {
    const { name, classId, description, status = 'active' } = input;

    if (!name || !classId) {
      throw AppError.badRequest('Name and class are required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existingResult = await resultRepository.findOne({
      $or: [{ slug }, { name }],
    });

    if (existingResult) {
      throw AppError.badRequest('Result already exists');
    }

    return resultRepository.create({
      name,
      slug,
      classId: parseObjectId(classId),
      description,
      status,
    });
  },

  async update(input: UpdateResultInput) {
    const { id, name, classId, description, status } = input;

    if (!id) {
      throw AppError.badRequest('Invalid result ID');
    }

    if (name) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const duplicate = await resultRepository.findOne({
        $or: [{ slug }, { name }],
        _id: { $ne: new Types.ObjectId(id) },
      });

      if (duplicate) {
        throw AppError.badRequest('Result already exists');
      }
    }

    const updateData: Record<string, unknown> = {};

    if (name) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-');
    }
    if (classId) updateData.classId = parseObjectId(classId);
    if (description !== undefined) updateData.description = description;
    if (status) updateData.status = status;

    const updated = await resultRepository.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      throw AppError.notFound('Result not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid result ID');
    }

    const deleted = await resultRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('Result not found');
    }

    return deleted;
  },

  async getActive() {
    return resultRepository.findActive();
  },
};
