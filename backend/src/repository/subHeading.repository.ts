/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import SubHeadingModel from '../models/subHeading.model';
import { ISubHeading } from '../../../packages/src/types/subHeading.type';
import { BaseRepository } from '@/config/db.config';

export class SubHeadingRepository extends BaseRepository<ISubHeading> {
  constructor() {
    super(SubHeadingModel);
  }

  async findBySlug(slug: string, headingId?: Types.ObjectId) {
    const query: any = { slug: slug.toLowerCase() };
    if (headingId) query.headingId = headingId;
    return this.findOne(query);
  }

  async findByHeading(headingId: Types.ObjectId, status?: string) {
    const query: any = { headingId };
    if (status) query.status = status;
    return this.findAll({ query });
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

  async getSubHeadingByName(name: string) {
    const normalized = name.trim().toLowerCase();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate({pipeline: [
      {
        $match: {
          status: 'active',
          $or: [{ slug: normalized }, { name: { $regex: `^${escaped}$`, $options: 'i' } }],
        },
      },
      {
        $project: {
          _id: 0,
          subHeadingId: '$_id',
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          headingId: 1,
        },
      },
      { $sort: { name: 1 } },
    ]});
  }

  async getSubHeadingByClassAndBookAndChapterAndHeadingName(
    className: string,
    bookName: string,
    chapterName: string,
    headingName: string
  ) {
    const normalizedClass = className.trim().toLowerCase();
    const normalizedBook = bookName.trim().toLowerCase();
    const normalizedChapter = chapterName.trim().toLowerCase();
    const normalizedHeading = headingName.trim().toLowerCase();
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedBook = bookName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedChapter = chapterName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedHeading = headingName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate({pipeline: [
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
        $lookup: {
          from: 'headings',
          localField: 'headingId',
          foreignField: '_id',
          as: 'headingDoc',
        },
      },
      { $unwind: '$headingDoc' },
      {
        $match: {
          'classDoc.status': 'active',
          'bookDoc.status': 'active',
          'chapterDoc.status': 'active',
          'headingDoc.status': 'active',
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
            {
              $or: [
                { 'headingDoc.slug': normalizedHeading },
                { 'headingDoc.name': { $regex: `^${escapedHeading}$`, $options: 'i' } },
              ],
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          subHeadingId: '$_id',
          name: 1,
          slug: 1,
          classId: 1,
          bookId: 1,
          chapterId: 1,
          headingId: 1,
        },
      },
      { $sort: { order: 1, name: 1 } },
    ]});
  }
}

export const subHeadingRepository = new SubHeadingRepository();
