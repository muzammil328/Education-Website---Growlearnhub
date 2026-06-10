import { Document, Types } from 'mongoose';
import type { Status } from '../enums';

export interface IResult extends Document {
  name: string;
  slug: string;
  classId: Types.ObjectId;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
