import mongoose, { Document, Schema, Types } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';

export interface IVuHandout extends Document {
  name: string;
  slug: string;
  courseCode: string;
  description?: string;
  fileUrl: string;
  classId: Types.ObjectId;
  serviceId: Types.ObjectId;
  status: 'active' | 'inactive';
  order?: number;
}

const VuHandoutSchema = new Schema<IVuHandout>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    courseCode: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fileUrl: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true, index: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

VuHandoutSchema.index({ classId: 1, serviceId: 1 });
VuHandoutSchema.index({ slug: 1, serviceId: 1 }, { unique: true });

export default mongoose.model<IVuHandout>('VuHandout', VuHandoutSchema);
