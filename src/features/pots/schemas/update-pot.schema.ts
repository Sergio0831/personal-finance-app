import { z } from 'zod';
import { theme } from './add-new-pot.schema';

export const UpdatePotSchema = z.object({
  id: z.string({ required_error: 'Pot ID is required' }),
  input: z.object({
    name: z
      .string()
      .min(2, 'Pot name must be at least 2 characters')
      .max(30, 'Pot name cannot exceed 30 characters')
      .optional(),
    target: z.coerce
      .number({ invalid_type_error: 'Target must be a number' })
      .min(1, { message: 'Target must be at least 1' })
      .max(1_000_000, { message: 'Target cannot exceed 1,000,000' })
      .optional(),
    theme: z
      .enum(theme, { message: 'Theme must be a valid hex color' })
      .optional(),
  }),
});

export type UpdatePotSchemaType = z.infer<typeof UpdatePotSchema>;
