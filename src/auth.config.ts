import { AuthError, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { LoginSchema } from '@/features/auth/schemas';

import { verifyPassword } from './features/auth/utils';
import prisma from './lib/clients/prisma-client';

export const authConfig = {
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		Credentials({
			authorize: async credentials => {
				if (!credentials) throw new AuthError('No credentials provided');

				const validation = LoginSchema.safeParse(credentials);

				if (!validation.success) {
					throw new AuthError('Invalid credentials format', {
						cause: validation.error
					});
				}

				const validateFields = LoginSchema.safeParse(credentials);

				if (!validateFields.success) {
					throw new Error('CredentialsSignin: Invalid input');
				}

				const { email, password } = validateFields.data;
				const user = await prisma.user.findUnique({ where: { email } });

				if (!user || !user.password) {
					throw new Error('CredentialsSignin: No user found');
				}

				const passwordMatch = await verifyPassword(password, user.password);

				if (!passwordMatch) {
					throw new Error('CredentialsSignin: Incorrect password');
				}

				// Return user object with required fields
				return {
					id: user.id,
					email: user.email,
					name: user.name ?? user.email
				};
			}
		})
	]
} satisfies NextAuthConfig;
