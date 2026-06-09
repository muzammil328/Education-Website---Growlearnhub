import mongoose, { Schema, Document, Types } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';

export type PdfMedium = 'english' | 'urdu';

export interface IBookPdf extends Document {
  classId:   Types.ObjectId;
  bookId:    Types.ObjectId;
  medium:    PdfMedium;
  fileId:    string;
  fileUrl:   string;
  pages?:    number;
  fileSize?: number;
  status:    'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const BookPdfSchema = new Schema<IBookPdf>(
  {
    classId:  { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    bookId:   { type: Schema.Types.ObjectId, ref: 'Book',  required: true },
    medium:   { type: String, enum: ['english', 'urdu'], required: true },
    fileId:   { type: String, required: true },
    fileUrl:  { type: String, required: true },
    pages:    { type: Number },
    fileSize: { type: Number },
    status:   { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

BookPdfSchema.index({ bookId: 1, medium: 1 }, { unique: true });
BookPdfSchema.index({ classId: 1, status: 1 });

export const BookPdf = mongoose.model<IBookPdf>('BookPdf', BookPdfSchema);
export default BookPdf;
