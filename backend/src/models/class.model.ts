import mongoose, { Document, Schema, Types } from 'mongoose';
import { Status, StatusEnum } from '@muzammil328/education-packages/enums';

export interface IClass extends Document {
  name: string;
  slug: string;
  description?: string;
  serviceId?: Types.ObjectId[];
  status: Status;
  image?: string;
  keywords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String },
    serviceId: [{ type: Schema.Types.ObjectId, ref: 'Service', index: true }],
    status: { type: String, enum: StatusEnum, default: StatusEnum.Active },
    image: { type: String },
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

// save slug from name if not provided
ClassSchema.pre<IClass>('validate', function (this: IClass, next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export const Class = mongoose.model<IClass>('Class', ClassSchema);
export default Class;
