/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import AnalyticsModel from '../models/analytics.model';
import { IAnalytics } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

export class AnalyticsRepository extends BaseRepository<IAnalytics> {
  constructor() {
    super(AnalyticsModel);
  }

  async recordAttempt(
    userId: Types.ObjectId,
    questionId: Types.ObjectId,
    _selectedAnswer: string,
    correct: boolean,
    timeTaken?: number,
    chapterId?: Types.ObjectId,
    headingId?: Types.ObjectId,
    subHeadingId?: Types.ObjectId
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
      user: userId,
      question: questionId,
      chapterId,
      headingId,
      subHeadingId,
      score: correct ? 100 : 0,
      correct: correct ? 1 : 0,
      incorrect: correct ? 0 : 1,
      attemptCount: 1,
      timeTakenMinutes: timeTaken,
      offlineAttempts: [],
    });
  }

  async getUserAttempts(userId: Types.ObjectId, chapterId?: Types.ObjectId, limit = 10) {
    const query: any = { user: userId };
    if (chapterId) query.chapterId = chapterId;

    return this.findAll({ query, limit });
  }

  async getUserStats(userId: Types.ObjectId) {
    const pipeline = [
      { $match: { user: userId } },
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

    const result = await this.aggregate(pipeline);
    return result[0] || { totalAttempts: 0, totalCorrect: 0, totalIncorrect: 0, avgScore: 0 };
  }

  async getChapterStats(userId: Types.ObjectId, chapterId: Types.ObjectId) {
    const pipeline = [
      { $match: { user: userId, chapterId } },
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

    const result = await this.aggregate(pipeline);
    return result[0] || { totalAttempts: 0, totalCorrect: 0, totalIncorrect: 0, avgScore: 0 };
  }

  async getWeakTopics(userId: Types.ObjectId, threshold = 50) {
    const pipeline: any = [
      { $match: { user: userId } },
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

    return this.aggregate(pipeline);
  }

  async getStrongTopics(userId: Types.ObjectId, threshold = 80) {
    const pipeline: any = [
      { $match: { user: userId } },
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

    return this.aggregate(pipeline);
  }

  async getProgressOverTime(userId: Types.ObjectId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const pipeline: any = [
      {
        $match: {
          user: userId,
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

    return this.aggregate(pipeline);
  }
}
