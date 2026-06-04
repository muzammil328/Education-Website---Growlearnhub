/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import ChapterModel from '../models/chapter.model';
import { IChapter } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

export class ChapterRepository extends BaseRepository<IChapter> {
  constructor() {
    super(ChapterModel);
  }

  async findBySlug(slug: string, bookId?: Types.ObjectId) {
    const query: any = { slug: slug.toLowerCase() };
    if (bookId) query.bookId = bookId;
    return this.findOne(query);
  }

  async findByBook(bookId: Types.ObjectId, status?: string) {
    const query: any = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByClass(classId: Types.ObjectId, status?: string) {
    const query: any = { classId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByClassSlugAndChapterSlug(classSlug: string, chapterSlug: string) {
    const normalizedClass = classSlug.trim().toLowerCase();
    const normalizedChapter = chapterSlug.trim().toLowerCase();
    const escapedClass = classSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const result = await this.aggregate([
      {
        $match: {
          slug: normalizedChapter,
          status: 'active',
        },
      },
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
            { 'classDoc.slug': normalizedClass },
            { 'classDoc.name': { $regex: `^${escapedClass}$`, $options: 'i' } },
          ],
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
      { $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true } },
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
          classId: '$classDoc._id',
          bookId: '$bookDoc._id',
          className: '$classDoc.name',
          bookName: '$bookDoc.name',
        },
      },
      { $limit: 1 },
    ]);

    return result[0] || null;
  }

  async getChapterByClassAndBookName(className: string, bookName: string) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate<{ name: string; slug: string }>([
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
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      { $unwind: '$bookDoc' },
      {
        $match: {
          'classDoc.status': 'active',
          'bookDoc.status': 'active',
          $and: [
            {
              $or: [
                { 'classDoc.slug': normalizedClass },
                { 'classDoc.name': { $regex: `^${escapedClass}$`, $options: 'i' } },
              ],
            },
            {
              $or: [
                { 'bookDoc.slug': normalizedBook },
                { 'bookDoc.name': { $regex: `^${escapedBook}$`, $options: 'i' } },
              ],
            },
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
      { $sort: { order: 1, name: 1 } },
    ]);
  }
}

export const chapterRepository = new ChapterRepository();
