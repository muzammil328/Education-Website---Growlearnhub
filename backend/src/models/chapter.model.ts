import mongoose, { Schema } from 'mongoose';
import type { IChapter } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

const ChapterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    description: { type: String },
    content: { type: String },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number },
  },
  { timestamps: true }
);

export const Chapter = mongoose.model<IChapter>('Chapter', ChapterSchema);
export default Chapter;
