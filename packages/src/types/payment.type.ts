import { Document, Types } from 'mongoose';
import type { PaymentStatus, PaymentType } from '../enums';

export interface IPayment extends Document {
  user?: Types.ObjectId;
  classGroup?: Types.ObjectId; // for institutional payments
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  startDate?: Date; // for subscriptions
  endDate?: Date; // for subscriptions
  transactionId?: string;
  provider?: string; // e.g., Stripe, PayPal
  createdAt?: Date;
  updatedAt?: Date;
}
