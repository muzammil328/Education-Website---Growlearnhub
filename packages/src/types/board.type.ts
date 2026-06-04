import type { Status } from '../types';
import { Document, Types } from 'mongoose';

export interface IBoard extends Document {
  name: string;
  slug: string;
  classId: Types.ObjectId;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
