import { type Session } from '@auth/core/types';

import { auth } from '@/features/auth/auth';

export type GraphQLContext = {
	session: Session | null;
};

export async function createContext(): Promise<GraphQLContext> {
	const session = await auth();

	return {
		session
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
