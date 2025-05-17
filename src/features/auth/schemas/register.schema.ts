import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email' }),
  password: z.string().min(1, 'Password is required').min(6, 'Minimum 6 characters required'),
});

export type SignupSchemaType = z.infer<typeof RegisterSchema>;
