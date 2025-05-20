import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { LoginSchema } from '@/features/auth/schemas';

import { getUserByEmail } from './api';
import { verifyPassword } from './utils';

export const authConfig = {
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		Credentials({
			authorize: async credentials => {
				const validateFields = LoginSchema.safeParse(credentials);

				if (validateFields.success) {
					const { email, password } = validateFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordMatch = await verifyPassword(
						password,
						user.password
					);

					if (passwordMatch) return user;
				}

				return null;
			}
		})
	]
} satisfies NextAuthConfig;
