import { Document, Types } from 'mongoose';
import type { Status } from '../enums';

export interface ISubHeading extends Document {
  name: string;
  slug: string;
  code?: string;
  headingId: Types.ObjectId;
  chapterId: Types.ObjectId;
  bookId: Types.ObjectId;
  classId: Types.ObjectId;
  serviceId: Types.ObjectId[];
  description?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  image?: string;
  content: string;
  totalWeight?: number;
  components?: any[];
  keywords?: string[];
  status: Status;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
