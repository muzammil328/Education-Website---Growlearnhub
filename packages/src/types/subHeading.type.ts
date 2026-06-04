import { Document, Types } from 'mongoose';
import type { Status } from '../types';

export interface ISubHeading extends Document {
  name: string;
  slug: string;
  headingId: Types.ObjectId;
  chapterId: Types.ObjectId;
  bookId: Types.ObjectId;
  classId: Types.ObjectId;
  status: Status;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
