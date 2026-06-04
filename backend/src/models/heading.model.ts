import mongoose, { Schema } from 'mongoose';
import type { IHeading } from '@muzammil328/education-packages/types';
import { EntityStatus, ENTITY_STATUS_VALUES } from '@muzammil328/education-packages/enums';

const HeadingSchema: Schema<IHeading> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: ENTITY_STATUS_VALUES, default: EntityStatus.ACTIVE },
    order: { type: Number },
  },
  { timestamps: true }
);

HeadingSchema.index({ slug: 1, chapterId: 1 }, { unique: true });

export const Heading = mongoose.model<IHeading>('Heading', HeadingSchema);
export default Heading;
