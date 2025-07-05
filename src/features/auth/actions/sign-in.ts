'use server';

import { APIError } from 'better-auth/api';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

import { LoginSchema, type LoginSchemaType } from '../schemas';

export async function signInWithCredentials(formValues: LoginSchemaType) {
  const validatedFields = LoginSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return {
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error:
          error.message ||
          'An error occurred during sign-in. Please try again.',
      };
    }

    return { error: 'Internal Server Error' };
  }
}
