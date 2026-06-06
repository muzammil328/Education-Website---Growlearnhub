import mongoose, { Schema } from 'mongoose';
import type { IHeading } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const HeadingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number },
  },
  { timestamps: true }
);

// save slug from name if not provided
HeadingSchema.pre<IHeading>('validate', function (this: IHeading, next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export const Heading = mongoose.model<IHeading>('Heading', HeadingSchema);
export default Heading;
