/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import HeadingModel from '../models/heading.model';
import { IHeading } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@/config/db.config';

export class HeadingRepository extends BaseRepository<IHeading> {
  constructor() {
    super(HeadingModel);
  }

  async findBySlug(slug: string, chapterId?: Types.ObjectId) {
    const query: any = { slug: slug.toLowerCase() };
    if (chapterId) query.chapterId = chapterId;
    return this.findOne(query);
  }

  async findByChapter(chapterId: Types.ObjectId, status?: string) {
    const query: any = { chapterId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByBook(bookId: Types.ObjectId, status?: string) {
    const query: any = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async getHeadingByName(name: string) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate([
      {
        $match: {
          status: 'active',
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: 'i' } }],
        },
      },
      {
        $project: {
          _id: 0,
          headingId: '$_id',
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
        },
      },
      { $sort: { name: 1 } },
    ]);
  }

  async getHeadingByClassAndBookAndChapterName(
    className: string,
    bookName: string,
    chapterName: string
  ) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const normalizedChapter = chapterName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedChapter = chapterName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate([
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
        $lookup: {
          from: 'chapters',
          localField: 'chapterId',
          foreignField: '_id',
          as: 'chapterDoc',
        },
      },
      { $unwind: '$chapterDoc' },
      {
        $match: {
          'classDoc.status': 'active',
          'bookDoc.status': 'active',
          'chapterDoc.status': 'active',
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
            {
              $or: [
                { 'chapterDoc.slug': normalizedChapter },
                { 'chapterDoc.name': { $regex: `^${escapedChapter}$`, $options: 'i' } },
              ],
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          headingId: '$_id',
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
        },
      },
      { $sort: { order: 1, name: 1 } },
    ]);
  }
}

export const headingRepository = new HeadingRepository();
