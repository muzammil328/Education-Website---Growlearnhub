import PaymentModel from '../models/payment.model';
import { IPayment } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@muzammil328/foundation';

// ---------------- Payment REPOSITORY ----------------
export class PaymentRepository extends BaseRepository<IPayment> {
  constructor() {
    super(PaymentModel);
  }

  // ---------------- CUSTOM METHODS ----------------
}
