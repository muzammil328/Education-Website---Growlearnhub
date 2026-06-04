import BoardModel from '../models/board.model';
import { IBoard } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

export class BoardRepository extends BaseRepository<IBoard> {
  constructor() {
    super(BoardModel);
  }

  async findBySlug(slug: string) {
    return this.findOne({ slug: slug.toLowerCase() });
  }

  async findActive() {
    return this.findAll({ query: { status: 'active' } });
  }
}

export const boardRepository = new BoardRepository();
