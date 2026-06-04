import mongoose, { Schema } from 'mongoose';
import type { IService } from '@muzammil328/education-packages/types';
import { EntityStatus } from '@muzammil328/education-packages/enums';

const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    description: { type: String },
    classId: [{ type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true }],
    status: { type: String, enum: Object.values(EntityStatus), default: EntityStatus.ACTIVE },
    image: { type: String },
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
