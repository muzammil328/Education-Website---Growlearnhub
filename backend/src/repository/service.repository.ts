import { Types } from 'mongoose';
import ServiceModel from '../models/service.model';
import { IService } from '../../../packages/src/types/service.type';
import { BaseRepository } from '@/config/db.config';

export class ServiceRepository extends BaseRepository<IService> {
  constructor() {
    super(ServiceModel);
  }

  async findBySlug(slug: string, classId?: Types.ObjectId) {
    const query: any = { slug: slug.toLowerCase() };
    if (classId) query.classId = classId;
    return this.findOne(query);
  }

  async findByClass(classId: Types.ObjectId, status?: string) {
    const query: any = { classId };
    if (status) query.status = status;
    return this.findAll({ query });
  }
}

export const serviceRepository = new ServiceRepository();
