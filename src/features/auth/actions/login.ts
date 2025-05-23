'use server';

import { AuthError } from 'next-auth';

import { getUserByEmail } from '../api';
import { signIn } from '../auth';
import { LoginSchema, LoginSchemaType } from '../schemas';

export const login = async (values: LoginSchemaType) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: 'Invalid fields!'
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const existingUser = await getUserByEmail(email);
		if (!existingUser?.email) {
			return { error: "You havent't register yet!" };
		}
		if (!existingUser?.password) {
			return { error: 'Wrong password!' };
		}

		await signIn('credentials', {
			email,
			password,
			redirectTo: '/overview'
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };
				default:
					return { error: 'Something went wrong!' };
			}
		}

		throw error;
	}
};
