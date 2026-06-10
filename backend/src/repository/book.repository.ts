import { Types } from 'mongoose';
import BookModel, { IBook } from '../models/book.model';
import { BaseRepository } from '@/config/db.config';

export class BookRepository extends BaseRepository<IBook> {
  constructor() {
    super(BookModel);
  }

  async findBySlug(slug: string, classId?: Types.ObjectId) {
    const query = {
      slug: slug.toLowerCase(),
      classId: classId ? classId : undefined,
    };
    if (classId) query.classId = classId;
    return this.findOne(query);
  }

  async findByClass(classId: Types.ObjectId, status?: string) {
    const query = {
      classId,
      status: status ? status.toLowerCase() : undefined,
    };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async getBookByName(name: string) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const result = await this.aggregate({pipeline: [
      {
        $match: {
          status: 'active',
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: 'i' } }],
        },
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classId',
        },
      },
      {
        $unwind: '$classId',
      },
      {
        $project: {
          _id: 0,
          bookId: '$_id',
          name: 1,
          slug: 1,
          code: 1,
          status: 1,
          description: 1,
          creditHours: 1,
          totalWeight: 1,
          pages: 1,
          components: 1,
          class: {
            classId: '$classId._id',
            className: '$classId.name',
          },
          image: 1,
          keywords: 1,
        },
      },
      { $limit: 1 },
    ]});

    return result[0] || null;
  }

  async getBookByClassName(className: string) {
    const normalized = className.trim().toLowerCase();
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate<{ name: string; slug: string }>({pipeline: [
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      { $unwind: '$classDoc' },
      {
        $match: {
          'classDoc.status': 'active',
          $or: [
            { 'classDoc.slug': normalized },
            { 'classDoc.name': { $regex: `^${escaped}$`, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
        },
      },
      { $sort: { name: 1 } },
    ]});
  }

  async findByClassSlug(classSlug: string) {
    const normalized = classSlug.trim().toLowerCase();
    const escaped = classSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate<{ name: string; slug: string }>({pipeline: [
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      { $unwind: '$classDoc' },
      {
        $match: {
          'classDoc.status': 'active',
          $or: [
            { 'classDoc.slug': normalized },
            { 'classDoc.name': { $regex: `^${escaped}$`, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
        },
      },
      { $sort: { name: 1 } },
    ]});
  }

  async getBookByServiceName(serviceName: string) {
    const normalized = serviceName.trim().toLowerCase();
    const escaped = serviceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate<{ name: string; slug: string }>({pipeline: [
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      { $unwind: '$classDoc' },
      { $match: { 'classDoc.status': 'active' } },
      {
        $lookup: {
          from: 'services',
          let: { serviceIds: '$classDoc.serviceId' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$serviceIds'] },
                status: 'active',
                $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: 'i' } }],
              },
            },
            { $project: { _id: 1 } },
          ],
          as: 'matchedServices',
        },
      },
      {
        $match: {
          'matchedServices.0': { $exists: true },
        },
      },
      {
        $group: {
          _id: '$slug',
          name: { $first: '$name' },
          slug: { $first: '$slug' },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
        },
      },
      { $sort: { name: 1 } },
    ]});
  }
}

export const bookRepository = new BookRepository();
