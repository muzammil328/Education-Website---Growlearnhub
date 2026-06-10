import { AppError } from '@muzammil328/server';
import { Types, type PipelineStage } from 'mongoose';
import { chapterRepository } from '../repository/chapter.repository';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetChaptersInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
  bookId?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
  bookId?: string;
}

export interface CreateChapterInput {
  name: string;
  status: 'active' | 'inactive';
  bookId: string;
  classId: string;
  order?: number;
  description?: string;
  content?: string;
}

export interface UpdateChapterInput {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  bookId?: string;
  classId?: string;
  order?: number;
  description?: string;
  content?: string;
}

export const chapterService = {
  async getAll(input: GetChaptersInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: Record<string, unknown> = { status: input.status ?? 'active' };

    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);

    if (classId) {
      match.classId = classId;
    }

    if (bookId) {
      match.bookId = bookId;
    }

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
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      {
        $unwind: {
          path: '$bookDoc',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          chapterId: '$_id',
          name: 1,
          status: 1,
          className: '$classDoc.name',
          bookName: '$bookDoc.name',
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    if (input.search) {
      const searchRegex = { $regex: escapeRegex(input.search), $options: 'i' };
      pipeline.push({
        $match: {
          $or: [{ name: searchRegex }, { className: searchRegex }, { bookName: searchRegex }],
        },
      });
    }

    pipeline.push({ $sort: { [sort]: sortOrder } });

    return chapterRepository.aggregate({
      pipeline,
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid chapter ID format');
    }

    const result = await chapterRepository.aggregate({pipeline: [
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          pipeline: [{ $project: { name: 1 } }],
          as: 'classData',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          pipeline: [{ $project: { name: 1 } }],
          as: 'bookData',
        },
      },
      {
        $project: {
          _id: 0,
          chapterId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          description: 1,
          content: 1,
          order: 1,
          classId: 1,
          bookId: 1,
          className: { $arrayElemAt: ['$classData.name', 0] },
          bookName: { $arrayElemAt: ['$bookData.name', 0] },
        },
      },
    ]});

    if (!result || result.length === 0) {
      throw AppError.notFound('Chapter not found');
    }

    return result[0];
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const formatSearch = escapeRegex(search);

    return chapterRepository.aggregate({pipeline: [
      {
        $match: {
          name: { $regex: formatSearch, $options: 'i' },
          status: 'active',
          ...(classId ? { classId } : {}),
          ...(bookId ? { bookId } : {}),
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

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Chapter slug is required');
    }

    const chapter = await chapterRepository.findOne({ slug: slug.toLowerCase() });

    if (!chapter) {
      throw AppError.notFound('Chapter not found');
    }

    const populated = await chapter.populate([
      { path: 'classId', select: 'name slug' },
      { path: 'bookId', select: 'name slug' },
    ]);

    return {
      chapterId: String(populated._id),
      name: populated.name,
      slug: populated.slug,
      status: populated.status,
      description: populated.description,
      content: populated.content,
      order: populated.order,
      class: {
        classId: String((populated.classId as unknown as { _id: unknown; name: string; slug: string })._id),
        name: (populated.classId as unknown as { _id: unknown; name: string; slug: string }).name,
        slug: (populated.classId as unknown as { _id: unknown; name: string; slug: string }).slug,
      },
      book: {
        bookId: String((populated.bookId as unknown as { _id: unknown; name: string; slug: string })._id),
        name: (populated.bookId as unknown as { _id: unknown; name: string; slug: string }).name,
        slug: (populated.bookId as unknown as { _id: unknown; name: string; slug: string }).slug,
      },
    };
  },

  async getByClassSlugAndChapterSlug(classSlug: string, chapterSlug: string) {
    if (!classSlug || !chapterSlug) {
      throw AppError.badRequest('Class slug and chapter slug are required');
    }

    const result = (await chapterRepository.findByClassSlugAndChapterSlug(
      classSlug,
      chapterSlug
    )) as {
      chapterId: unknown;
      name: string;
      slug: string;
      status: string;
      description?: string;
      content?: string;
      order?: number;
      classId?: unknown;
      bookId?: unknown;
      className?: string;
      bookName?: string;
    } | null;

    if (!result) {
      throw AppError.notFound('Chapter not found');
    }

    return {
      chapterId: String(result.chapterId),
      name: result.name,
      slug: result.slug,
      status: result.status,
      description: result.description,
      content: result.content,
      order: result.order,
      classId: result.classId ? String(result.classId) : undefined,
      bookId: result.bookId ? String(result.bookId) : undefined,
      className: result.className,
      bookName: result.bookName,
    };
  },

  async getByClassAndBookName(className: string, bookName: string) {
    if (!className || !bookName) {
      throw AppError.badRequest('Class name and book name are required');
    }

    const result = await chapterRepository.getChapterByClassAndBookName(className, bookName);

    return result;
  },

  async create(input: CreateChapterInput) {
    const { name, status, bookId, classId, order, description, content } = input;

    if (!name || !status || !bookId || !classId) {
      throw AppError.badRequest('Name, status, bookId and classId are required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existingChapter = await chapterRepository.findOne({
      slug,
      bookId: new Types.ObjectId(bookId),
    });

    if (existingChapter) {
      throw AppError.badRequest('Chapter already exists');
    }

    return chapterRepository.create({
      name,
      slug,
      status,
      bookId: new Types.ObjectId(bookId),
      classId: new Types.ObjectId(classId),
      order: order ?? 0,
      description,
      content,
    });
  },

  async update(input: UpdateChapterInput) {
    const { id, name, status, bookId, classId, order, description, content } = input;

    if (!id) {
      throw AppError.badRequest('Invalid chapter ID');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const chapterData: Record<string, unknown> = {
      name,
      slug,
      status,
      order,
      description,
      content,
    };

    if (bookId) {
      chapterData.bookId = new Types.ObjectId(bookId);
    }
    if (classId) {
      chapterData.classId = new Types.ObjectId(classId);
    }

    const updated = await chapterRepository.findByIdAndUpdate(new Types.ObjectId(id), chapterData, { new: true });

    if (!updated) {
      throw AppError.notFound('Chapter not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid chapter ID');
    }

    const deleted = await chapterRepository.findByIdAndDelete(new Types.ObjectId(id));

    if (!deleted) {
      throw AppError.notFound('Chapter not found');
    }

    return deleted;
  },
};
