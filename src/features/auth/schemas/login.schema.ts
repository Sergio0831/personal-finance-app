import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, 'Passwords must be at least 6 characters'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
