import mongoose, { Schema } from 'mongoose';
import type { IBook } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const VUAssessmentComponentSchema = new Schema(
  {
    title: { type: String, required: true },
    weight: { type: Number, required: true, min: 0, max: 100 },
    description: { type: String },
  },
  { _id: false }
);

const BookSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    creditHours: { type: Number },
    fileId: { type: String },
    pages: { type: Number },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    image: { type: String },
    totalWeight: { type: Number, default: 100 },
    components: [VUAssessmentComponentSchema],
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;
