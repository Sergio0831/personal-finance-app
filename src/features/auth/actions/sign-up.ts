'use server';

import { APIError } from 'better-auth/api';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

import { RegisterSchema, RegisterSchemaType } from '../schemas';

export async function signUpWithCredentials(formValues: RegisterSchemaType) {
	const validatedFields = RegisterSchema.safeParse(formValues);

	if (!validatedFields.success) {
		return {
			error: 'Invalid fields!'
		};
	}

	const { name, email, password } = validatedFields.data;

	try {
		await auth.api.signUpEmail({
			headers: await headers(),
			body: {
				name,
				email,
				password
			}
		});

		return {
			error: null
		};
	} catch (error) {
		if (error instanceof APIError) {
			return {
				error: error.message || 'An error occurred during sign-in'
			};
		}

		return { error: 'Internal Server Error' };
	}
}
