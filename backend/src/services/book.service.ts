import { AppError } from '@muzammil328/server';
import { Types, PipelineStage } from 'mongoose';
import { bookRepository } from '../repository/book.repository';
import { classRepository } from '../repository/class.repository';
import type { IVUAssessmentComponent } from '../models/book.model';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetBooksInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
  className?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
}

export interface CreateBookInput {
  name: string;
  code: string;
  status?: 'active' | 'inactive';
  classId: string | string[];
  description?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  image?: string;
  order?: number;
  totalWeight?: number;
  components?: Array<{ title: string; weight: number; description?: string }>;
  keywords?: string[];
}

export interface UpdateBookInput {
  id: string;
  name: string;
  code: string;
  status?: 'active' | 'inactive';
  classId?: string | string[];
  description?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  image?: string;
  order?: number;
  totalWeight?: number;
  components?: Array<{ title: string; weight: number; description?: string }>;
  keywords?: string[];
}

export const bookService = {
  async getAll(input: GetBooksInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt'; // Default to createdAt for newly created/updated at top
    const match: {
      classId?: Types.ObjectId;
      status: string;
    } = { status: input.status ?? 'active' };

    const classIdObj = parseObjectId(input.classId);
    if (classIdObj) {
      match.classId = classIdObj;
    }

    // Build pipeline step by step
    const pipeline: PipelineStage[] = [
      { $match: match },
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
          bookId: '$_id',
          name: 1,
          status: 1,
          className: '$classDoc.name',
        },
      },
    ];

    // Add className filter if provided (after $project uses className field)
    if (input.className) {
      pipeline.push({
        $match: {
          className: { $regex: escapeRegex(input.className), $options: 'i' },
        },
      });
    }

    // Add search on both name and className
    if (input.search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: escapeRegex(input.search), $options: 'i' } },
            { className: { $regex: escapeRegex(input.search), $options: 'i' } },
          ],
        },
      });
    }

    // Sort at the end (after filters, uses className which exists in projection)
    // Handle null className by converting to empty string for sorting
    if (sort === 'className') {
      pipeline.push({
        $sort: { className: sortOrder, name: sortOrder === 1 ? 1 : -1 },
      });
    } else {
      pipeline.push({ $sort: { [sort]: sortOrder } });
    }

    return bookRepository.aggregate({
      pipeline,
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid book ID format');
    }

    const result = await bookRepository.aggregate({pipeline: [
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
          bookId: '$_id',
          name: 1,
          slug: 1,
          code: 1,
          status: 1,
          classId: '$classId',
          description: 1,
          creditHours: 1,
          fileId: 1,
          totalWeight: 1,
          pages: 1,
          components: 1,
          class: {
            classId: '$classDoc._id',
            className: '$classDoc.name',
          },
          image: 1,
          keywords: 1,
        },
      },
    ]});

    if (!result || result.length === 0) {
      throw AppError.notFound('Book not found');
    }

    return result[0];
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Book slug is required');
    }

    const result = await bookRepository.findBySlug(slug.toLowerCase());

    if (!result) {
      throw AppError.notFound('Book not found');
    }

    const classDoc = result.classId ? await classRepository.findById(result.classId) : null;

    return {
      bookId: String(result._id),
      name: result.name,
      slug: result.slug,
      code: result.code,
      status: result.status,
      description: result.description,
      creditHours: result.creditHours,
      fileId: result.fileId,
      pages: result.pages,
      image: result.image,
      totalWeight: result.totalWeight,
      components: result.components || [],
      classId: result.classId ? String(result.classId) : undefined,
      class: classDoc
        ? {
            classId: String(classDoc._id),
            className: classDoc.name,
          }
        : undefined,
      keywords: result.keywords || [],
    };
  },

  async getByClassSlug(classSlug: string) {
    if (!classSlug) {
      throw AppError.badRequest('Class slug is required');
    }

    return bookRepository.findByClassSlug(classSlug);
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId);
    const formatSearch = escapeRegex(search);

    return bookRepository.aggregate({pipeline: [
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
    ]});
  },

  async getByName(name: string) {
    if (!name) {
      throw AppError.badRequest('Book name is required');
    }

    const result = await bookRepository.getBookByName(name);

    if (!result) {
      throw AppError.notFound('Book not found');
    }

    return result;
  },

  async getByClassName(className: string) {
    if (!className) {
      throw AppError.badRequest('Class name is required');
    }

    const result = await bookRepository.getBookByClassName(className);

    return result;
  },

  async create(input: CreateBookInput) {
    const {
      name,
      code,
      status,
      classId,
      description,
      creditHours,
      fileId,
      pages,
      image,
      totalWeight,
      components,
      keywords,
    } = input;

    if (!name || !code || !status) {
      throw AppError.badRequest('Name, code and status are required');
    }

    if (!classId) {
      throw AppError.badRequest('Class is required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existingBook = await bookRepository.findOne({
      $or: [{ slug }, { code: code.toUpperCase() }],
    });

    if (existingBook) {
      throw AppError.badRequest('Book already exists');
    }

    const resolvedClassId = Array.isArray(classId) ? classId[0] : classId;
    const classIdObject = parseObjectId(resolvedClassId);

    if (!classIdObject) {
      throw AppError.badRequest('Invalid classId');
    }

    return bookRepository.create({
      name,
      slug,
      code: code.toUpperCase(),
      description,
      status,
      classId: classIdObject,
      creditHours,
      fileId,
      pages,
      image,
      totalWeight,
      components: components as IVUAssessmentComponent[],
      keywords,
    });
  },

  async update(input: UpdateBookInput) {
    const {
      id,
      name,
      code,
      status,
      classId,
      description,
      creditHours,
      fileId,
      pages,
      image,
      order,
      totalWeight,
      components,
      keywords,
    } = input;

    if (!id) {
      throw AppError.badRequest('Invalid book ID');
    }

    if (!name || !code || !status) {
      throw AppError.badRequest('Name, code and status are required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const duplicate = await bookRepository.findOne({
      $or: [{ name: name }, { slug }, { code: code.toUpperCase() }],
      _id: { $ne: new Types.ObjectId(id) },
    });

    if (duplicate) {
      throw AppError.badRequest('Book already exists');
    }

    const bookData: Record<string, unknown> = {
      name,
      slug,
      code: code.toUpperCase(),
      status,
      description,
      creditHours,
      fileId,
      pages,
      image,
      order,
      totalWeight,
      components,
      keywords,
    };

    if (classId) {
      const resolvedClassId = Array.isArray(classId) ? classId[0] : classId;
      const classIdObject = parseObjectId(resolvedClassId);

      if (!classIdObject) {
        throw AppError.badRequest('Invalid classId');
      }

      bookData.classId = classIdObject;
    }

    const updated = await bookRepository.findByIdAndUpdate(new Types.ObjectId(id), bookData, { new: true });

    if (!updated) {
      throw AppError.notFound('Book not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid book ID');
    }

    const deleted = await bookRepository.findByIdAndDelete(new Types.ObjectId(id));

    if (!deleted) {
      throw AppError.notFound('Book not found');
    }

    return deleted;
  },
};
