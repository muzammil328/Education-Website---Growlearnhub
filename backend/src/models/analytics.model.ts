import mongoose, { Schema } from 'mongoose';
import type { IAnalytics } from '@muzammil328/education-packages/types';
import { Difficulty } from '@muzammil328/education-packages/enums';

const OfflineAttemptSchema: Schema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Mcqs' },
  selectedAnswer: { type: String },
  correct: { type: Boolean },
  timestamp: { type: Date, default: Date.now },
});

const AnalyticsSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Mcqs' },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    headingId: { type: Schema.Types.ObjectId, ref: 'Heading' },
    subHeadingId: { type: Schema.Types.ObjectId, ref: 'SubHeading' },
    score: { type: Number, required: true },
    correct: { type: Number, required: true },
    incorrect: { type: Number, required: true },
    timeTakenMinutes: { type: Number },
    difficultyLevel: { type: String, enum: Object.values(Difficulty) },
    topicWeaknessScore: { type: Number, min: 0, max: 100 },
    attemptCount: { type: Number, default: 1 },
    offlineAttempts: [OfflineAttemptSchema],
    lastSyncedAt: { type: Date },
  },
  { timestamps: true }
);

AnalyticsSchema.index({ user: 1, chapterId: 1 });
AnalyticsSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
