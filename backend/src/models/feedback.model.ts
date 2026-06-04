import mongoose, { Schema } from 'mongoose';
import type { IFeedback } from '@muzammil328/education-packages/types';
import { FeedbackTypeEnum, FeedbackStatusEnum } from '@muzammil328/education-packages/enums';

const FeedbackSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(FeedbackTypeEnum),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(FeedbackStatusEnum),
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

FeedbackSchema.index({ createdAt: -1 });

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
