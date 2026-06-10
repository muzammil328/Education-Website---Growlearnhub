import mongoose, { Document, Schema, Types } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';

export interface IResultPdf extends Document {
  name?: string;
  slug?: string;
  description?: string;
  classId: Types.ObjectId;
  boardId: Types.ObjectId;
  year: number;
  fileId: string;
  fileUrl: string;
  status: 'active' | 'inactive';
}

const ResultSchema = new Schema<IResultPdf>(
  {
    name: { type: String },
    slug: { type: String },
    description: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
    year: { type: Number, required: true, default: new Date().getFullYear() },
    fileId: { type: String, required: true },
    fileUrl: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

ResultSchema.index({ classId: 1, boardId: 1, year: 1 }, { unique: true });

export default mongoose.model<IResultPdf>('Result', ResultSchema);
