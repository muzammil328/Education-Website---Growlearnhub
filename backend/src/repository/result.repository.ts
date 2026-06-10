import { Types } from 'mongoose';
import ResultModel from '../models/result.model';
import type { IResultPdf } from '../models/result.model';
import { BaseRepository } from '@/config/db.config';

export class ResultRepository extends BaseRepository<IResultPdf> {
  constructor() {
    super(ResultModel);
  }

  async findBySlug(slug: string) {
    return this.findOne({ slug: slug.toLowerCase() });
  }

  async findActive() {
    return this.findAll({ query: { status: 'active' } });
  }
}

export const resultRepository = new ResultRepository();
