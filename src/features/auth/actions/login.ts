'use server';

import { AuthError } from 'next-auth';

import prisma from '@/lib/clients/prisma-client';

import { LoginSchema, LoginSchemaType } from '../schemas';

import { signIn } from '@/auth';

export const login = async (values: LoginSchemaType) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: 'Invalid fields!'
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (!existingUser?.email) {
			return { error: "You havent't register yet!" };
		}
		if (!existingUser?.password) {
			return { error: 'Wrong password!' };
		}

		await signIn('credentials', {
			email,
			password,
			redirect: false
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
