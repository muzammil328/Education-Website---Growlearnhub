import mongoose, { Schema } from 'mongoose';
import type { IPayment } from '@muzammil328/education-packages/types';
import { PaymentStatusEnum, PaymentTypeEnum } from '@muzammil328/education-packages/enums';

const PaymentSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    classGroup: { type: Schema.Types.ObjectId, ref: 'ClassGroup' },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'PKR' },
    type: { type: String, enum: Object.values(PaymentTypeEnum), required: true },
    status: { type: String, enum: Object.values(PaymentStatusEnum), required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    transactionId: { type: String },
    provider: { type: String },
  },
  { timestamps: true }
);

PaymentSchema.index({ user: 1 });
PaymentSchema.index({ classGroup: 1 });

export default mongoose.model<IPayment>('Payment', PaymentSchema);
