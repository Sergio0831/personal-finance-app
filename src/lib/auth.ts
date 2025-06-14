import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import { hashPassword, verifyPassword } from './argon2';
import { prisma } from './prisma-client';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),

	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		autoSignIn: false,
		password: {
			hash: hashPassword,
			verify: verifyPassword
		}
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}
	},
	advanced: {
		database: {
			generateId: false
		}
	},
	plugins: [nextCookies()]
});
