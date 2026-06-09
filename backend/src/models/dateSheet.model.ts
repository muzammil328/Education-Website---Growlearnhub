import mongoose, { Document, Schema, Types } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';

export interface IDateSheet extends Document {
  classId: Types.ObjectId;
  boardId: Types.ObjectId;
  year: number;
  image: string; // image URL of the date sheet
  status: 'active' | 'inactive';
}

const DateSheetSchema = new Schema<IDateSheet>(
  {
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
    year: { type: Number, required: true, default: new Date().getFullYear() },
    image: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
  },
  { timestamps: true }
);

DateSheetSchema.index({ classId: 1, boardId: 1, year: 1 }, { unique: true });

export default mongoose.model<IDateSheet>('DateSheet', DateSheetSchema);
