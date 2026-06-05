import { Types } from 'mongoose';
import OtpModel from '../models/otp.model';
import type { IOtp } from '@muzammil328/education-packages/types';
import type { OtpPurposeValue } from '@muzammil328/education-packages/enums';
import { BaseRepository, DocumentId } from '@/config/db.config';

export class OtpRepository extends BaseRepository<IOtp> {
  constructor() {
    super(OtpModel);
  }

  async findByUserAndPurpose(userId: DocumentId, purpose: OtpPurposeValue) {
    return this.findOne({ userId, purpose });
  }

  async deleteManyByUserAndPurpose(userId: DocumentId, purpose: OtpPurposeValue) {
    return this.model.deleteMany({ userId, purpose });
  }

  async incrementAttempts(id: DocumentId) {
    return this.model.findByIdAndUpdate(id, { $inc: { attempts: 1 } }, { new: true });
  }
}

export const otpRepository = new OtpRepository();
