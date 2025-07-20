import { z } from 'zod';

export const theme = [
  '#277C78',
  '#F2CDAC',
  '#82C9D7',
  '#626070',
  '#C94736',
  '#826CB0',
  '#597C7C',
  '#93674F',
  '#934F6F',
  '#3F82B2',
  '#97A0AC',
  '#7F9161',
  '#AF81BA',
  '#CAB361',
  '#BE6C49',
] as const;

export const ThemeEnum = z.enum(theme);
export type Theme = z.infer<typeof ThemeEnum>;

export const CreatePotSchema = z.object({
  input: z.object({
    name: z
      .string({ message: 'Pot name is required' })
      .min(2, { message: 'Pot name is to short' })
      .max(30, 'Pot name cannot exceed 30 characters'),
    target: z.coerce
      .number({ invalid_type_error: 'Target must be a number' })
      .min(1, { message: 'Target must be at least 1' })
      .max(1_000_000, { message: 'Target cannot exceed 1,000,000' }),
    theme: z.enum(theme, { message: 'Theme must be a valid hex color' }),
  }),
});

export type CreatePotSchemaType = z.infer<typeof CreatePotSchema>;
