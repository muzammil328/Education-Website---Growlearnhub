import { Document, Types } from 'mongoose';

export interface IUserProgress extends Document {
  user: Types.ObjectId;
  classId?: Types.ObjectId;
  bookId?: Types.ObjectId;
  chapterId: Types.ObjectId;
  headingId?: Types.ObjectId;
  subHeadingId?: Types.ObjectId;
  correct: number;
  incorrect: number;
  masteryScore: number;
  lastAttempt?: Date;
  masteryBand?: 'weak' | 'developing' | 'strong';
  currentDifficultyBand?: 'easy' | 'medium' | 'hard';
  nextReviewAt?: Date;
  spacedRepetitionInterval?: number;
  retryCount?: number;
  confidentMistakeCount?: number;
  openLoopCount?: number;
  totalAttempts?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
