import { Document, Types } from 'mongoose';

export interface IHeading extends Document {
  name: string;
  slug: string;
  chapterId: Types.ObjectId;
  bookId: Types.ObjectId;
  classId: Types.ObjectId;
  status: 'active' | 'inactive';
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
