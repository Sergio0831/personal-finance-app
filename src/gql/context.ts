import { type Session } from '@auth/core/types';

import { auth } from '@/features/auth/auth';

import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export type GraphQLContext = {
	prisma: PrismaClient;
	session: Session | null;
};

export async function createContext(): Promise<GraphQLContext> {
	const session = await auth();

	return {
		prisma,
		session
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
