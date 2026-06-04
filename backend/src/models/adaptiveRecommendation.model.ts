import mongoose, { Schema } from 'mongoose';
import type { IAdaptiveRecommendation } from '@muzammil328/education-packages/types';

const AdaptiveRecommendationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recommendedQuestions: [{ type: Schema.Types.ObjectId, ref: 'Mcqs' }],
    recommendedChapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    reason: { type: String },
  },
  { timestamps: true }
);

AdaptiveRecommendationSchema.index({ user: 1 });

export default mongoose.model<IAdaptiveRecommendation>(
  'AdaptiveRecommendation',
  AdaptiveRecommendationSchema
);
