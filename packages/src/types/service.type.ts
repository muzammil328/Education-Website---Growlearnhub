import { Document, Types } from 'mongoose';
import type { Status } from '../types';

export interface IService extends Document {
  name: string;
  slug: string;
  description?: string;
  classId: Types.ObjectId[];
  status: Status;
  image?: string;
  keywords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
