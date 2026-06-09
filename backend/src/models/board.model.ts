import mongoose, { Schema } from 'mongoose';
import type { IBoard } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const BoardSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    classId: [{ type: Schema.Types.ObjectId, ref: 'Class', required: true }],
    serviceId: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    description: { type: String },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

// save slug from name if not provided
BoardSchema.pre<IBoard>('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

BoardSchema.index({ slug: 1, classId: 1 }, { unique: true });

export default mongoose.model<IBoard>('Board', BoardSchema);
