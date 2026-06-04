import mongoose, { Schema } from 'mongoose';
import type { IBoard } from '@muzammil328/education-packages/types';
import { EntityStatus } from '@muzammil328/education-packages/enums';

const BoardSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(EntityStatus), default: EntityStatus.ACTIVE },
  },
  { timestamps: true }
);

BoardSchema.index({ slug: 1, classId: 1 }, { unique: true });

export default mongoose.model<IBoard>('Board', BoardSchema);
