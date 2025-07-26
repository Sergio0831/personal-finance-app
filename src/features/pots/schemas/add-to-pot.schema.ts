import { z } from 'zod';

export const AddToPotSchema = z.object({
  id: z.string({ required_error: 'Pot ID is required' }),
  amount: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be greater than zero')
    .min(1, { message: 'Amount must be at least 1' })
    .max(1_000_000, { message: 'Amount cannot exceed 1,000,000' }),
});

export type AddToPotSchemaType = z.infer<typeof AddToPotSchema>;
