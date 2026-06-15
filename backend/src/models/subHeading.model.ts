import mongoose, { Schema } from 'mongoose';
import type { ISubHeading } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { slugify } from '@/utils';

const SubHeadingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    headingId: { type: Schema.Types.ObjectId, ref: 'Heading', required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number },
  },
  { timestamps: true }
);

// save slug from name if not provided
SubHeadingSchema.pre<ISubHeading>('validate', function (this: ISubHeading, next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

export const SubHeading = mongoose.model<ISubHeading>('SubHeading', SubHeadingSchema);
export default SubHeading;
