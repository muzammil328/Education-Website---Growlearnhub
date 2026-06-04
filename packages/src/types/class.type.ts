import { Status } from '.';
import { Document, Types } from 'mongoose';

export interface IClass extends Document {
  name: string;
  slug: string;
  description?: string;
  serviceId?: Types.ObjectId[];
  status: 'active' | 'inactive';
  image?: string;
  keywords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetClassesInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  search?: string;
}

export interface GetClassDropdownInput {
  search?: string;
  serviceId?: string;
}

export interface CreateClassInput {
  name: string;
  slug?: string;
  description?: string;
  serviceId?: string[];
  image?: string;
  keywords?: string[];
  status: Status;
}

export interface UpdateClassInput {
  id: string;
  name: string;
  status: Status;
  description?: string;
  serviceId?: string[];
  image?: string;
  keywords?: string[];
}
