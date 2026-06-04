import ResultModel from '../models/result.model';
import { IResult } from '../../../packages/src/types/result.type';
import { BaseRepository } from '@muzammil328/foundation';

export class ResultRepository extends BaseRepository<IResult> {
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
