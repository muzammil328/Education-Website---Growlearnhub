import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { headingRepository } from '../repository/heading.repository';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetHeadingsInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
  bookId?: string;
  chapterId?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
  bookId?: string;
  chapterId?: string;
}

export interface CreateHeadingInput {
  name: string;
  status: 'active' | 'inactive';
  classId: string;
  bookId: string;
  chapterId: string;
  order?: number;
}

export interface UpdateHeadingInput {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  classId?: string;
  bookId?: string;
  chapterId?: string;
  order?: number;
}

export const headingService = {
  async getAll(input: GetHeadingsInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'ASC' ? 1 : -1;
    const sort = input.sort ?? 'createdAt';
    const match: {
      chapterId: Types.ObjectId;
      bookId: Types.ObjectId;
      classId: Types.ObjectId;
      status: string;
    } = {
      status: input.status ?? 'active',
      chapterId: new Types.ObjectId(),
      bookId: new Types.ObjectId(),
      classId: new Types.ObjectId(),
    };

    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);

    if (classId) match.classId = classId;
    if (bookId) match.bookId = bookId;
    if (chapterId) match.chapterId = chapterId;

    return headingRepository.aggregate({
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
          $project: {
            _id: 0,
            headingId: '$_id',
            name: 1,
            status: 1,
            className: '$classDoc.name',
            bookName: '$bookDoc.name',
            chapterName: '$chapterDoc.name',
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid heading ID format');
    }

    const result = await headingRepository.aggregate({pipeline: [
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
        $project: {
          _id: 0,
          headingId: '$_id',
          name: 1,
          slug: 1,
          status: 1,
          order: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          className: { $arrayElemAt: ['$classData.name', 0] },
          bookName: { $arrayElemAt: ['$bookData.name', 0] },
          chapterName: { $arrayElemAt: ['$chapterData.name', 0] },
        },
      },
    ]});

    if (!result || result.length === 0) {
      throw AppError.notFound('Heading not found');
    }

    return result[0];
  },

  async getDropdown(input: GetDropdownInput) {
    const search = input.search ?? '';
    const classId = parseObjectId(input.classId);
    const bookId = parseObjectId(input.bookId);
    const chapterId = parseObjectId(input.chapterId);
    const formatSearch = escapeRegex(search);

    return headingRepository.aggregate({pipeline: [
      {
        $match: {
          name: { $regex: formatSearch, $options: 'i' },
          status: 'active',
          ...(classId ? { classId } : {}),
          ...(bookId ? { bookId } : {}),
          ...(chapterId ? { chapterId } : {}),
        },
      },
      { $sort: { name: 1 } },
      { $project: { _id: 1, name: 1 } },
    ]});
  },

  async getBySlug(slug: string) {
    if (!slug) {
      throw AppError.badRequest('Heading slug is required');
    }

    const heading = await headingRepository.findOne({ slug: slug.toLowerCase() });

    if (!heading) {
      throw AppError.notFound('Heading not found');
    }

    const populated = await heading.populate([
      { path: 'classId', select: 'name slug' },
      { path: 'bookId', select: 'name slug' },
      { path: 'chapterId', select: 'name slug' },
    ]);

    return {
      headingId: String(populated._id),
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
    };
  },

  async create(input: CreateHeadingInput) {
    const { name, status, classId, bookId, chapterId, order } = input;

    if (!name || !status || !classId || !bookId || !chapterId) {
      throw AppError.badRequest('Name, status, classId, bookId and chapterId are required');
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existing = await headingRepository.findOne({
      slug,
      chapterId: new Types.ObjectId(chapterId),
    });

    if (existing) {
      throw AppError.badRequest('Heading already exists');
    }

    return headingRepository.create({
      name,
      slug,
      status,
      classId: new Types.ObjectId(classId),
      bookId: new Types.ObjectId(bookId),
      chapterId: new Types.ObjectId(chapterId),
      order: order ?? 0,
    });
  },

  async update(input: UpdateHeadingInput) {
    const { id, name, status, classId, bookId, chapterId, order } = input;

    if (!id) {
      throw AppError.badRequest('Invalid heading ID');
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

    const updated = await headingRepository.findByIdAndUpdate(new Types.ObjectId(id), headingData, { new: true });

    if (!updated) {
      throw AppError.notFound('Heading not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid heading ID');
    }

    const deleted = await headingRepository.findByIdAndDelete(new Types.ObjectId(id));

    if (!deleted) {
      throw AppError.notFound('Heading not found');
    }

    return deleted;
  },
};
