import { Types } from 'mongoose';
import InstitutionModel from '../models/institution.model';
import { IInstitution, InstitutionType } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

export class InstitutionRepository extends BaseRepository<IInstitution> {
  constructor() {
    super(InstitutionModel);
  }

  async findByType(type: InstitutionType) {
    return this.findAll({ query: { type, isActive: true } });
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findActiveSubscriptions() {
    return this.findAll({
      query: {
        isActive: true,
        subscriptionPlan: { $ne: 'free' },
        subscriptionExpiresAt: { $gt: new Date() },
      },
    });
  }

  async updateSubscription(id: Types.ObjectId, plan: string, expiresAt: Date) {
    return this.findByIdAndUpdate(id, {
      subscriptionPlan: plan,
      subscriptionExpiresAt: expiresAt,
    });
  }
}
