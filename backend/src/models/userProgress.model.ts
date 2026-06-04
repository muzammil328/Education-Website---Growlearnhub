import mongoose, { Schema } from 'mongoose';
import type { IUserProgress } from '@muzammil328/education-packages/types';

const UserProgressSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class' },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    headingId: { type: Schema.Types.ObjectId, ref: 'Heading' },
    subHeadingId: { type: Schema.Types.ObjectId, ref: 'SubHeading' },
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
    masteryScore: { type: Number, default: 0 },
    lastAttempt: { type: Date },
    masteryBand: { type: String, enum: ['weak', 'developing', 'strong'], default: 'weak' },
    currentDifficultyBand: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    nextReviewAt: { type: Date },
    spacedRepetitionInterval: { type: Number, default: 1 },
    retryCount: { type: Number, default: 0 },
    confidentMistakeCount: { type: Number, default: 0 },
    openLoopCount: { type: Number, default: 0 },
    totalAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserProgressSchema.index({ user: 1, chapterId: 1 });
UserProgressSchema.index({ user: 1, headingId: 1 });
UserProgressSchema.index({ user: 1, subHeadingId: 1 });
UserProgressSchema.index({ user: 1, bookId: 1, masteryBand: 1 });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
