import mongoose, { Schema } from 'mongoose';
import type { IResult } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const ResultSchema: Schema<IResult> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

ResultSchema.index({ slug: 1, classId: 1 }, { unique: true });

export default mongoose.model<IResult>('Result', ResultSchema);
