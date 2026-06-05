import { AppError } from '@muzammil328/server';
import { slugify } from '@muzammil328/utils';
import { resolveObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';
import { classRepository } from '@/repository/class.repository';
import {
  GetClassesInput,
  GetClassDropdownInput,
  CreateClassInput,
} from '@muzammil328/education-packages';

type UpdateClassInput = {
  id: string;
  name: string;
  status: CreateClassInput['status'];
  description?: string;
  serviceId?: string[];
  image?: string;
  keywords?: string[];
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

function parseObjectIdList(values?: string[]): Types.ObjectId[] | undefined {
  if (!values?.length) return undefined;
  return values.filter(v => Types.ObjectId.isValid(v)).map(v => new Types.ObjectId(v));
}

export const classService = {
  async getAll(input: GetClassesInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: Record<string, unknown> = { status: input.status ?? 'active' };

    if (input.search) {
      match.name = { $regex: input.search, $options: 'i' };
    }

    return classRepository.aggregatePaginate<{
      classId: Types.ObjectId;
      name: string;
      status: 'active' | 'inactive';
      serviceId: Types.ObjectId[];
      serviceName: string[];
    }>({
      pipeline: [
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        {
          $lookup: {
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'serviceIds',
          },
        },
        {
          $project: {
            _id: 0,
            classId: '$_id',
            name: 1,
            status: 1,
            serviceName: {
              $map: { input: '$serviceIds', as: 'service', in: '$$service.name' },
            },
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid class ID format');
    }

    const result = await classRepository.aggregate<{
      classId: Types.ObjectId;
      name: string;
      slug: string;
      description?: string;
      image?: string;
      status: 'active' | 'inactive';
      keywords?: string[];
      serviceId?: Types.ObjectId[];
    }>([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'services',
          let: { serviceIds: '$serviceId' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$serviceIds'] } } },
            { $project: { _id: 1, name: 1 } },
          ],
          as: 'services',
        },
      },
      {
        $project: {
          _id: 0,
          classId: '$_id',
          name: 1,
          slug: 1,
          description: 1,
          image: 1,
          status: 1,
          keywords: 1,
          serviceId: 1,
        },
      },
    ]);

    if (!result.length) {
      throw AppError.notFound('Class not found');
    }

    return result[0];
  },

  async getDropdown(input: GetClassDropdownInput) {
    const serviceId = parseObjectId(input.serviceId);
    const search = input.search ?? '';

    return classRepository.aggregate<{ value: Types.ObjectId; label: string }>([
      {
        $match: {
          status: 'active',
          ...(search
            ? { name: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }
            : {}),
          ...(serviceId ? { serviceId } : {}),
        },
      },
      { $sort: { name: 1 } },
      { $project: { _id: 0, value: '$_id', label: '$name' } },
    ]);
  },

  async create(input: CreateClassInput) {
    const slug = slugify(input.name);

    const existing = await classRepository.findOne({ $or: [{ slug }, { name: input.name }] });
    if (existing) {
      throw AppError.badRequest('Class already exists');
    }

    return classRepository.create({
      ...input,
      serviceId: parseObjectIdList(input.serviceId),
      slug,
    });
  },

  async update(input: UpdateClassInput) {
    const slug = slugify(input.name);

    const duplicate = await classRepository.findOne({
      $or: [{ name: input.name }, { slug }],
      _id: { $ne: resolveObjectId(input.id) },
    });

    if (duplicate) {
      throw AppError.badRequest('Class name already exists');
    }

    const updated = await classRepository.findByIdAndUpdate(
      input.id,
      {
        name: input.name,
        slug,
        status: input.status,
        description: input.description,
        serviceId: parseObjectIdList(input.serviceId),
        image: input.image,
        keywords: input.keywords,
      },
      { new: true }
    );

    if (!updated) {
      throw AppError.notFound('Class not found');
    }

    return updated;
  },

  async delete(id: string) {
    const deleted = await classRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('Class not found');
    }

    return deleted;
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Class slug is required');
    }

    const cls = await classRepository.findOne({ slug: slug.toLowerCase() });

    if (!cls) {
      throw AppError.notFound('Class not found');
    }

    const populated = await cls.populate({
      path: 'serviceId',
      select: 'name slug',
    });

    return {
      classId: String(populated._id),
      name: populated.name,
      slug: populated.slug,
      description: populated.description,
      image: populated.image,
      status: populated.status,
      keywords: populated.keywords || [],
      services: ((populated.serviceId as unknown) as Array<{ _id: unknown; name: string; slug: string }>).map(s => ({
        serviceId: String(s._id),
        name: s.name,
        slug: s.slug,
      })),
    };
  },

  async getByServiceSlug(serviceSlug: string) {
    if (!serviceSlug) {
      throw AppError.badRequest('Service slug is required');
    }

    return classRepository.findByServiceSlug(serviceSlug);
  },
};
