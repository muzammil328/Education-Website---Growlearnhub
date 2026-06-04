import { Document, Types } from 'mongoose';

export interface IAdaptiveRecommendation extends Document {
  user: Types.ObjectId;
  recommendedQuestions: Types.ObjectId[];
  recommendedChapters: Types.ObjectId[];
  reason?: string; // e.g., weak-topic, low accuracy
  createdAt?: Date;
  updatedAt?: Date;
}
