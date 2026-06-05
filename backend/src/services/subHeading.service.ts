import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { subHeadingRepository } from '../repository/subHeading.repository';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetSubHeadingsInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
}

export interface CreateSubHeadingInput {
  name: string;
  status: 'active' | 'inactive';
  classId: string;
  bookId: string;
  chapterId: string;
  headingId: string;
  order?: number;
}

export interface UpdateSubHeadingInput {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
  order?: number;
}

export const subHeadingService = {
  async getAll(input: GetSubHeadingsInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: {
      status: string;
      classId?: Types.ObjectId;
      bookId?: Types.ObjectId;
      chapterId?: Types.ObjectId;
      headingId?: Types.ObjectId;
    } = { status: input.status ?? 'active' };

    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);
    const headingId = parseObjectId(input.headingId);

    if (classId) match.classId = classId;
    if (bookId) match.bookId = bookId;
    if (chapterId) match.chapterId = chapterId;
    if (headingId) match.headingId = headingId;

    return subHeadingRepository.aggregatePaginate({
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
          $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true },
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
          $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'chapters',
            localField: 'chapterId',
            foreignField: '_id',
            as: 'chapterDoc',
          },
        },
        {
          $unwind: { path: '$chapterDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'headings',
            localField: 'headingId',
            foreignField: '_id',
            as: 'headingDoc',
          },
        },
        {
          $unwind: { path: '$headingDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            _id: 0,
            subHeadingId: '$_id',
            name: 1,
            status: 1,
            className: '$classDoc.name',
            bookName: '$bookDoc.name',
            chapterName: '$chapterDoc.name',
            headingName: '$headingDoc.name',
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid subheading ID format');
    }

    const result = await subHeadingRepository.aggregate([
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
        $lookup: {
          from: 'chapters',
          localField: 'chapterId',
          foreignField: '_id',
          pipeline: [{ $project: { name: 1 } }],
          as: 'chapterData',
        },
      },
      {
        $lookup: {
          from: 'headings',
          localField: 'headingId',
          foreignField: '_id',
          pipeline: [{ $project: { name: 1 } }],
          as: 'headingData',
        },
      },
      {
        $project: {
          _id: 0,
          subHeadingId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          order: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          headingId: 1,
          className: { $arrayElemAt: ['$classData.name', 0] },
          bookName: { $arrayElemAt: ['$bookData.name', 0] },
          chapterName: { $arrayElemAt: ['$chapterData.name', 0] },
          headingName: { $arrayElemAt: ['$headingData.name', 0] },
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw AppError.notFound('SubHeading not found');
    }

    return result[0];
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);
    const headingId = parseObjectId(input.headingId);
    const formatSearch = escapeRegex(search);

    return subHeadingRepository.aggregate([
      {
        $match: {
          name: { $regex: formatSearch, $options: 'i' },
          status: 'active',
          ...(classId ? { classId } : {}),
          ...(bookId ? { bookId } : {}),
          ...(chapterId ? { chapterId } : {}),
          ...(headingId ? { headingId } : {}),
        },
      },
      { $sort: { name: 1 } },
      { $project: { _id: 1, name: 1 } },
    ]);
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('SubHeading slug is required');
    }

    const subHeading = await subHeadingRepository.findOne({ slug: slug.toLowerCase() });

    if (!subHeading) {
      throw AppError.notFound('SubHeading not found');
    }

    const populated = await subHeading.populate([
      { path: 'classId', select: 'name slug' },
      { path: 'bookId', select: 'name slug' },
      { path: 'chapterId', select: 'name slug' },
      { path: 'headingId', select: 'name slug' },
    ]);

    return {
      subHeadingId: String(populated._id),
      name: populated.name,
      slug: populated.slug,
      status: populated.status,
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
      chapter: {
        chapterId: String((populated.chapterId as unknown as { _id: unknown; name: string; slug: string })._id),
        name: (populated.chapterId as unknown as { _id: unknown; name: string; slug: string }).name,
        slug: (populated.chapterId as unknown as { _id: unknown; name: string; slug: string }).slug,
      },
      heading: {
        headingId: String((populated.headingId as unknown as { _id: unknown; name: string; slug: string })._id),
        name: (populated.headingId as unknown as { _id: unknown; name: string; slug: string }).name,
        slug: (populated.headingId as unknown as { _id: unknown; name: string; slug: string }).slug,
      },
    };
  },

  async create(input: CreateSubHeadingInput) {
    const { name, status, classId, bookId, chapterId, headingId, order } = input;

    if (!name || !status || !classId || !bookId || !chapterId || !headingId) {
      throw AppError.badRequest(
        'Name, status, classId, bookId, chapterId and headingId are required'
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existing = await subHeadingRepository.findOne({
      slug,
      headingId: new Types.ObjectId(headingId),
    });

    if (existing) {
      throw AppError.badRequest('SubHeading already exists');
    }

    return subHeadingRepository.create({
      name,
      slug,
      status,
      classId: new Types.ObjectId(classId),
      bookId: new Types.ObjectId(bookId),
      chapterId: new Types.ObjectId(chapterId),
      headingId: new Types.ObjectId(headingId),
      order: order ?? 0,
    });
  },

  async update(input: UpdateSubHeadingInput) {
    const { id, name, status, classId, bookId, chapterId, headingId, order } = input;

    if (!id) {
      throw AppError.badRequest('Invalid subheading ID');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const headingData: Record<string, unknown> = {
      name,
      slug,
      status,
      order,
    };

    if (classId) headingData.classId = new Types.ObjectId(classId);
    if (bookId) headingData.bookId = new Types.ObjectId(bookId);
    if (chapterId) headingData.chapterId = new Types.ObjectId(chapterId);
    if (headingId) headingData.headingId = new Types.ObjectId(headingId);

    const updated = await subHeadingRepository.findByIdAndUpdate(id, headingData, { new: true });

    if (!updated) {
      throw AppError.notFound('SubHeading not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid subheading ID');
    }

    const deleted = await subHeadingRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('SubHeading not found');
    }

    return deleted;
  },
};
