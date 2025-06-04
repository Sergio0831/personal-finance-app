import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { authConfig } from './auth.config';
import prisma from './lib/clients/prisma-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		}
	},
	...authConfig
});
