import mongoose, { Schema } from 'mongoose';
import type { ISubHeading } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const SubHeadingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true },
    headingId: { type: Schema.Types.ObjectId, ref: 'Heading', required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number },
  },
  { timestamps: true }
);

SubHeadingSchema.index({ slug: 1 });
SubHeadingSchema.index({ headingId: 1 });
SubHeadingSchema.index({ chapterId: 1 });
SubHeadingSchema.index({ bookId: 1 });
SubHeadingSchema.index({ classId: 1 });
SubHeadingSchema.index({ headingId: 1, slug: 1 }, { unique: true });

export const SubHeading = mongoose.model<ISubHeading>('SubHeading', SubHeadingSchema);
export default SubHeading;
