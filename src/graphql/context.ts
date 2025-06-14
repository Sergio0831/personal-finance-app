import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

type User = (typeof auth.$Infer.Session)['user'];

export type GraphQLContext = {
	user: User | null;
};

export async function createContext(): Promise<GraphQLContext> {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	return {
		user: session?.user || null
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
