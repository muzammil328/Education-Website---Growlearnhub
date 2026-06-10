import { Types } from 'mongoose';
import AnalyticsModel from '../models/analytics.model';
import { IAnalytics } from '@muzammil328/education-packages/types';
import { BaseRepository, DocumentId } from '@/config/db.config';

export class AnalyticsRepository extends BaseRepository<IAnalytics> {
  constructor() {
    super(AnalyticsModel);
  }

  async recordAttempt(
    userId: DocumentId,
    questionId: DocumentId,
    _selectedAnswer: string,
    correct: boolean,
    timeTaken?: number,
    chapterId?: DocumentId,
    headingId?: DocumentId,
    subHeadingId?: DocumentId
  ) {
    const existing = await this.findOne({ user: userId, question: questionId } as any);

    if (existing) {
      return this.findByIdAndUpdate(
        existing._id as any,
        {
          $inc: {
            correct: correct ? 1 : 0,
            incorrect: correct ? 0 : 1,
            attemptCount: 1,
          },
          $set: {
            lastSyncedAt: new Date(),
            timeTakenMinutes: timeTaken,
          },
        } as any
      );
    }

    return this.create({
      user: new Types.ObjectId(userId),
      question: new Types.ObjectId(questionId),
      chapterId: chapterId ? new Types.ObjectId(chapterId) : undefined,
      headingId: headingId ? new Types.ObjectId(headingId) : undefined,
      subHeadingId: subHeadingId ? new Types.ObjectId(subHeadingId) : undefined,
      score: correct ? 100 : 0,
      correct: correct ? 1 : 0,
      incorrect: correct ? 0 : 1,
      attemptCount: 1,
      timeTakenMinutes: timeTaken,
      offlineAttempts: [],
    });
  }

  async getUserAttempts(userId: DocumentId, chapterId?: DocumentId, limit = 10) {
    const query: any = { user: new Types.ObjectId(userId) };
    if (chapterId) query.chapterId = new Types.ObjectId(chapterId);

    return this.findAll({ query, limit });
  }

  async getUserStats(userId: DocumentId) {
    const pipeline = [
      { $match: { user: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: '$attemptCount' },
          totalCorrect: { $sum: '$correct' },
          totalIncorrect: { $sum: '$incorrect' },
          avgScore: { $avg: '$score' },
        },
      },
    ];

    const result = await this.aggregate({pipeline});
    return result[0] || { totalAttempts: 0, totalCorrect: 0, totalIncorrect: 0, avgScore: 0 };
  }

  async getChapterStats(userId: DocumentId, chapterId: DocumentId) {
    const pipeline = [
      { $match: { user: new Types.ObjectId(userId), chapterId: new Types.ObjectId(chapterId) } },
      {
        $group: {
          _id: '$chapterId',
          totalAttempts: { $sum: '$attemptCount' },
          totalCorrect: { $sum: '$correct' },
          totalIncorrect: { $sum: '$incorrect' },
          avgScore: { $avg: '$score' },
        },
      },
    ];

    const result = await this.aggregate({pipeline});
    return result[0] || { totalAttempts: 0, totalCorrect: 0, totalIncorrect: 0, avgScore: 0 };
  }

  async getWeakTopics(userId: DocumentId, threshold = 50) {
    const pipeline: any = [
      { $match: { user: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$chapterId',
          avgScore: { $avg: '$score' },
          totalAttempts: { $sum: '$attemptCount' },
        },
      },
      { $match: { avgScore: { $lt: threshold } } },
      { $sort: { avgScore: 1 } },
    ];

    return this.aggregate({pipeline});
  }

  async getStrongTopics(userId: DocumentId, threshold = 80) {
    const pipeline: any = [
      { $match: { user: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$chapterId',
          avgScore: { $avg: '$score' },
          totalAttempts: { $sum: '$attemptCount' },
        },
      },
      { $match: { avgScore: { $gte: threshold } } },
      { $sort: { avgScore: -1 } },
    ];

    return this.aggregate({pipeline});
  }

  async getProgressOverTime(userId: DocumentId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const pipeline: any = [
      {
        $match: {
          user: new Types.ObjectId(userId),
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalCorrect: { $sum: '$correct' },
          totalIncorrect: { $sum: '$incorrect' },
          avgScore: { $avg: '$score' },
        },
      },
      { $sort: { _id: 1 } },
    ];

    return this.aggregate({pipeline});
  }
}
