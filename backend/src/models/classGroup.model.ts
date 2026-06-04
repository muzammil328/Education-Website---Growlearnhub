import mongoose, { Schema } from 'mongoose';
import type { IClassGroup } from '@muzammil328/education-packages/types';

const ClassGroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    classIds: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    subscription: { type: Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

ClassGroupSchema.index({ admin: 1 });

export default mongoose.model<IClassGroup>('ClassGroup', ClassGroupSchema);
