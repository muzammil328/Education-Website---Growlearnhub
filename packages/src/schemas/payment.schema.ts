import { z } from 'zod';

export const paymentPayloadSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
    type: z.enum(['subscription', 'one-time', 'institution']),
    status: z.enum(['pending', 'completed', 'failed', 'refunded']),
    user: z.string().optional(), // ObjectId as string
    classGroup: z.string().optional(), // ObjectId as string
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    transactionId: z.string().optional(),
    provider: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentPayloadSchema>;
export type CreatePaymentRequest = z.infer<typeof paymentPayloadSchema>;
export type UpdatePaymentRequest = Partial<z.infer<typeof paymentPayloadSchema>>;