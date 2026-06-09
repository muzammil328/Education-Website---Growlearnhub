import CommentModel from '../models/comment.model';
import type { IComment } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@/config/db.config';

export class CommentRepository extends BaseRepository<IComment> {
  constructor() {
    super(CommentModel);
  }
}

export const commentRepository = new CommentRepository();
