import mongoose, { Schema } from 'mongoose';
import type { IComment } from '@muzammil328/education-packages/types';

const CommentSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, index: true },
    pageUrl:   { type: String },
    message:   { type: String, required: true },
  },
  { timestamps: true }
);

CommentSchema.index({ createdAt: -1 });

export default mongoose.model<IComment>('Comment', CommentSchema);
