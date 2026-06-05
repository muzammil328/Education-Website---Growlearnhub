import { Types, FilterQuery } from 'mongoose';
import type { DifficultyValue } from '@muzammil328/education-packages/enums';
import type { Status } from '@muzammil328/education-packages/types';
import { IMcqs } from '@muzammil328/education-packages/types';
import McqsModel from '../models/mcqs.model';
import { BaseRepository } from '@/config/db.config';

interface McqsFilters {
  classId?: Types.ObjectId;
  bookId?: Types.ObjectId;
  chapterId?: Types.ObjectId;
  headingId?: Types.ObjectId;
  subHeadingId?: Types.ObjectId;
  difficulty?: DifficultyValue;
  status?: Status;
}

export class McqsRepository extends BaseRepository<IMcqs> {
  constructor() {
    super(McqsModel);
  }

  async findByFilters(filters: McqsFilters) {
    const query: FilterQuery<IMcqs> = {};
    if (filters.classId) query.classId = filters.classId;
    if (filters.bookId) query.bookId = filters.bookId;
    if (filters.chapterId) query.chapterId = filters.chapterId;
    if (filters.headingId) query.headingId = filters.headingId;
    if (filters.subHeadingId) query.subHeadingId = filters.subHeadingId;
    if (filters.difficulty) query.difficulty = filters.difficulty;
    if (filters.status) query.status = filters.status;

    return this.findAll({ query });
  }

  async findByChapter(chapterId: Types.ObjectId, status?: Status) {
    const query: FilterQuery<IMcqs> = { chapterId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByBook(bookId: Types.ObjectId, status?: Status) {
    const query: FilterQuery<IMcqs> = { bookId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByClass(classId: Types.ObjectId, status?: Status) {
    const query: FilterQuery<IMcqs> = { classId };
    if (status) query.status = status;
    return this.findAll({ query });
  }

  async findByDifficulty(difficulty: DifficultyValue, chapterId?: Types.ObjectId) {
    const query: FilterQuery<IMcqs> = { difficulty };
    if (chapterId) query.chapterId = chapterId;
    return this.findAll({ query });
  }

  async createBulk(questions: Partial<IMcqs>[]) {
    return McqsModel.insertMany(questions, { ordered: false });
  }

  async countByChapter(chapterId: Types.ObjectId) {
    return this.count({ chapterId });
  }

  async countByBook(bookId: Types.ObjectId) {
    return this.count({ bookId });
  }

  async countByDifficulty(difficulty: DifficultyValue) {
    return this.count({ difficulty });
  }
}

export const mcqsRepository = new McqsRepository();
