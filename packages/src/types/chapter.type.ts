import type { Status } from '../enums';
import { Document, Types } from 'mongoose';

export interface IChapter extends Document {
  name: string;
  slug: string;
  bookId: Types.ObjectId;
  classId: Types.ObjectId;
  description?: string;
  content?: string;
  status: 'active' | 'inactive';
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetChaptersInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
  classId?: string;
  bookId?: string;
}

export interface GetChapterDropdownInput {
  search?: string;
  classId?: string;
  bookId?: string;
}

export interface CreateChapterInput {
  name: string;
  status: Status;
  bookId: string;
  classId: string;
  order?: number;
  description?: string;
  content?: string;
}

export interface UpdateChapterInput {
  id: string;
  name: string;
  status: Status;
  bookId?: string;
  classId?: string;
  order?: number;
  description?: string;
  content?: string;
}
