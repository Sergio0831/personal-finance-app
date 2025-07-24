import { z } from 'zod';

export const UpdatePotSchema = z.object({
  id: z.string({ required_error: 'Pot ID is required' }),
  input: z
    .object({
      name: z
        .string()
        .min(2, 'Pot name must be at least 2 characters')
        .max(30, 'Pot name cannot exceed 30 characters'),
      target: z.coerce
        .number({ invalid_type_error: 'Target must be a number' })
        .min(1, { message: 'Target must be at least 1' })
        .max(1_000_000, { message: 'Target cannot exceed 1,000,000' }),
      theme: z.string().min(7, 'Theme must be a valid hex color'),
    })
    .refine(
      (data) =>
        Object.keys(data).some(
          (k) => data[k as keyof typeof data] !== undefined
        ),
      { message: 'Provide at least one field to update' }
    ),
});

export type UpdatePotSchemaType = z.infer<typeof UpdatePotSchema>;
