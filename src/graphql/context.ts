import { GraphQLError } from 'graphql';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

type User = (typeof auth.$Infer.Session)['user'];

export type GraphQLContext = {
  user: User;
};

export async function createContext(): Promise<GraphQLContext> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new GraphQLError('You must be logged in to perform this action', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  return {
    user: session.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
