import mongoose, { Schema } from 'mongoose';
import type { IInstitution } from '@muzammil328/education-packages/types';
import { InstitutionTypeEnum, SubscriptionPlanEnum } from '@muzammil328/education-packages/enums';

const InstitutionSchema: Schema<IInstitution> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: Object.values(InstitutionTypeEnum), required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    subscriptionPlan: {
      type: String,
      enum: Object.values(SubscriptionPlanEnum),
      default: SubscriptionPlanEnum.FREE,
    },
    subscriptionExpiresAt: { type: Date },
    maxStudents: { type: Number, default: 50 },
    maxTeachers: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

InstitutionSchema.index({ email: 1 }, { unique: true });
InstitutionSchema.index({ type: 1, isActive: 1 });

export default mongoose.model<IInstitution>('Institution', InstitutionSchema);
