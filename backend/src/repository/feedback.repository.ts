import FeedbackModel from '../models/feedback.model';
import { IFeedback } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

export class FeedbackRepository extends BaseRepository<IFeedback> {
  constructor() {
    super(FeedbackModel);
  }

  async findByType(type: 'contact' | 'bug-report' | 'feature-request') {
    return this.findAll({ query: { type } });
  }

  async findByStatus(status: 'pending' | 'resolved' | 'rejected') {
    return this.findAll({ query: { status } });
  }
}

export const feedbackRepository = new FeedbackRepository();
