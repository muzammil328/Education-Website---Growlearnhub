import { AppError } from '@muzammil328/core';
import { Types } from 'mongoose';
import { z } from 'zod';
import { serviceRepository } from '../repository/service.repository';
import {
  getServicesInputSchema,
  dropdownInputSchema,
  CreateServiceRequest,
} from '@muzammil328/education-packages';

type GetServicesInput = z.infer<typeof getServicesInputSchema>;
type CreateServiceInput = CreateServiceRequest;
type UpdateServiceInput = {
  id: string;
} & Partial<CreateServiceRequest>;
type ServiceDropdownInput = z.infer<typeof dropdownInputSchema> & {
  classId?: string;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

function parseObjectIdList(values?: string[]): Types.ObjectId[] | undefined {
  if (!values?.length) return undefined;
  return values.filter(v => Types.ObjectId.isValid(v)).map(v => new Types.ObjectId(v));
}

export const serviceService = {
  async getAll(input: GetServicesInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: Record<string, unknown> = {};

    if (input.status) {
      match.status = input.status;
    }

    if (input.search) {
      match.name = { $regex: escapeRegex(input.search), $options: 'i' };
    }

    const pipeline = [
      { $match: match },
      { $sort: { [sort]: sortOrder } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDocs',
        },
      },
      {
        $project: {
          _id: 0,
          serviceId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          className: {
            $map: {
              input: '$classDocs',
              as: 'cls',
              in: '$$cls.name',
            },
          },
        },
      },
    ];

    if (input.className) {
      pipeline.push({
        $match: {
          className: { $regex: escapeRegex(input.className), $options: 'i' },
        },
      });
    }

    return serviceRepository.aggregatePaginate({
      pipeline,
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid service ID format');
    }

    const result = await serviceRepository.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'classes',
          let: { classIds: '$classId' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$classIds'] } } },
            { $project: { _id: 1, name: 1 } },
          ],
          as: 'classes',
        },
      },
      {
        $project: {
          _id: 0,
          serviceId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          description: 1,
          image: 1,
          keywords: 1,
          classId: 1,
          classes: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw AppError.notFound('Service not found');
    }

    return result[0];
  },

  async getDropdown(input: ServiceDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId as string);

    return serviceRepository.aggregate([
      {
        $match: {
          name: { $regex: escapeRegex(search), $options: 'i' },
          status: 'active',
          ...(classId ? { classId } : {}),
        },
      },
      { $sort: { name: 1 } },
      { $project: { _id: 1, name: 1 } },
    ]);
  },

  async create(input: CreateServiceInput) {
    const { name, status, classId, description, image, keywords } = input;

    if (!name) {
      throw AppError.badRequest('Service name is required');
    }

    if (!name) {
      throw AppError.badRequest('Service name is required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existing = await serviceRepository.findOne({ slug });
    if (existing) {
      throw AppError.badRequest('Service already exists');
    }

    return serviceRepository.create({
      name,
      slug,
      status,
      classId: parseObjectIdList(classId),
      description,
      image,
      keywords,
    });
  },

  async update(input: UpdateServiceInput) {
    const { id, name, status, classId, description, image, keywords } = input;

    if (!id) {
      throw AppError.badRequest('Invalid service ID');
    }

    if (!name) {
      throw AppError.badRequest('Service name is required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const duplicate = await serviceRepository.findOne({
      slug,
      _id: { $ne: new Types.ObjectId(id) },
    });

    if (duplicate) {
      throw AppError.badRequest('Service already exists');
    }

    const updated = await serviceRepository.findByIdAndUpdate(
      id,
      { name, slug, status, classId: parseObjectIdList(classId), description, image, keywords },
      { new: true }
    );

    if (!updated) {
      throw AppError.notFound('Service not found');
    }

    return updated;
  },

  async getByName(name: string) {
    if (!name) {
      throw AppError.badRequest('Service name is required');
    }

    const service = await serviceRepository.findOne({ slug: name.toLowerCase() });

    if (!service) {
      throw AppError.notFound('Service not found');
    }

    const populated = await service.populate({
      path: 'classId',
      select: 'name slug',
    });

    return {
      serviceId: String(populated._id),
      name: populated.name,
      slug: populated.slug,
      classes: ((populated.classId as unknown) as Array<{ _id: unknown; name: string; slug: string }>).map(cls => ({
        classId: String(cls._id),
        name: cls.name,
        slug: cls.slug,
      })),
    };
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Service slug is required');
    }

    const result = await serviceRepository.findBySlug(slug.toLowerCase());

    if (!result) {
      throw AppError.notFound('Service not found');
    }

    return result;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid service ID');
    }

    const deleted = await serviceRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('Service not found');
    }

    return deleted;
  },
};
