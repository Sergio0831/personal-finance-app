import { z } from 'zod';
import { Category } from '../../../generated/prisma';

export const CreateBudgetSchema = z.object({
  input: z.object({
    category: z.nativeEnum(Category, {
      required_error: 'Category is required',
      invalid_type_error: 'Invalid category',
    }),
    maximum: z.coerce
      .number({ invalid_type_error: 'Maximum spent must be a number' })
      .positive('Amount must be greater than zero')
      .min(1, { message: 'Maximum spent must be at least 1' })
      .max(1_000_000, { message: 'Maximum spent cannot exceed 1,000,000' }),
    theme: z.string().min(7, 'Theme must be a valid hex color'),
  }),
});

export type CreateBudgetSchemaType = z.infer<typeof CreateBudgetSchema>;
