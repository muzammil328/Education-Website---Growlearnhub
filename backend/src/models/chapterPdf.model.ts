import mongoose, { Schema, Document, Types } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { PdfMedium } from './bookPdf.model';

export interface IChapterPdf extends Document {
  classId:   Types.ObjectId;
  bookId:    Types.ObjectId;
  chapterId: Types.ObjectId;
  medium:    PdfMedium;
  fileId:    string;
  fileUrl:   string;
  pages?:    number;
  fileSize?: number;
  status:    'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const ChapterPdfSchema = new Schema<IChapterPdf>(
  {
    classId:   { type: Schema.Types.ObjectId, ref: 'Class',   required: true },
    bookId:    { type: Schema.Types.ObjectId, ref: 'Book',    required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    medium:    { type: String, enum: ['english', 'urdu'], required: true },
    fileId:    { type: String, required: true },
    fileUrl:   { type: String, required: true },
    pages:     { type: Number },
    fileSize:  { type: Number },
    status:    { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

ChapterPdfSchema.index({ chapterId: 1, medium: 1 }, { unique: true });
ChapterPdfSchema.index({ bookId: 1, status: 1 });
ChapterPdfSchema.index({ classId: 1, bookId: 1, status: 1 });

export const ChapterPdf = mongoose.model<IChapterPdf>('ChapterPdf', ChapterPdfSchema);
export default ChapterPdf;
