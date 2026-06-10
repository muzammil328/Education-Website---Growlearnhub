import { Document, Types } from 'mongoose';
import type { Status } from '../enums';

export interface IService extends Document {
  name: string;
  slug: string;
  code?: string;
  description?: string;
  classId: Types.ObjectId[];
  serviceId: Types.ObjectId[];
  status: Status;
  image?: string;
  keywords?: string[];
  creditHours?: number;
  fileId?: string;
  pages?: number;
  totalWeight?: number;
  components?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateServiceRequest {
  name: string;
  slug?: string;
  code?: string;
  description?: string;
  icon?: string;
  keywords?: string[];
  status?: Status;
  order?: number;
  classId?: string[];
  serviceId?: string[];
  image?: string;
  creditHours?: number;
  fileId?: string;
  pages?: number;
  totalWeight?: number;
  components?: any[];
}
