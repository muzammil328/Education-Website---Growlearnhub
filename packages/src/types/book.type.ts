import { SortDirection, Status } from '.';
import { Document, Types } from 'mongoose';

export interface IVUAssessmentComponent {
  title: string;
  weight: number; // percentage
  description?: string;
}

export interface MediumComponent {
  slug: string;
  name: string;
  fileId: string;
}

export interface IBook extends Document {
  name: string;
  slug: string;
  code: string; // CS001, MTH001, MGT211, etc.
  description?: string;
  classId: Types.ObjectId;
  creditHours?: number;
  fileId?: string; // Google Drive file ID
  pages?: number;
  chapters?: number;
  status: 'active' | 'inactive';
  image?: string;
  totalWeight?: number; // should equal 100
  components: IVUAssessmentComponent[];
  medium?: MediumComponent[];
  keywords?: string[];
  boardId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetBooksInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: SortDirection;
  search?: string;
  classId?: string;
  className?: string;
}

export interface GetDropdownInput {
  search?: string;
  classId?: string;
}

export interface CreateBookInput {
  name: string;
  code: string;
  status?: Status;
  classId: string | string[];
  description?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  image?: string;
  order?: number;
  totalWeight?: number;
  components?: Array<{ title: string; weight: number; description?: string }>;
  keywords?: string[];
}

export interface UpdateBookInput {
  id: string;
  name: string;
  code: string;
  status?: Status;
  classId?: string | string[];
  description?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  image?: string;
  order?: number;
  totalWeight?: number;
  components?: Array<{ title: string; weight: number; description?: string }>;
  keywords?: string[];
}
