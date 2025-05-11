import { auth } from '@/lib/auth/auth';
import { PrismaClient } from '@/generated/prisma';
import { type Session } from '@auth/core/types';

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  session: Session | null;
};

export async function createContext(): Promise<GraphQLContext> {
  const session = await auth();

  return {
    prisma,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
