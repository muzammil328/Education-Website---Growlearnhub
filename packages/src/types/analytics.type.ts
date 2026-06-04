import type { DifficultyValue } from '../enums';
import { Document, Types } from 'mongoose';

export interface IOfflineAttempt {
  question: Types.ObjectId;
  selectedAnswer: string;
  correct: boolean;
  timestamp: Date;
}

export interface IAnalytics extends Document {
  user: Types.ObjectId;
  question?: Types.ObjectId;
  chapterId?: Types.ObjectId;
  headingId?: Types.ObjectId;
  subHeadingId?: Types.ObjectId;
  score: number;
  correct: number;
  incorrect: number;
  timeTakenMinutes?: number;
  difficultyLevel?: DifficultyValue;
  topicWeaknessScore?: number;
  attemptCount?: number;
  offlineAttempts: IOfflineAttempt[];
  lastSyncedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
