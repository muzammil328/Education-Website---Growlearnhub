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
  createdAt?: Date;
  updatedAt?: Date;
}
