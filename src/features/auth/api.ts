import prisma from '../../lib/clients/prisma-client';

export const getUserByEmail = async (email: string) => {
  try {
    const user = prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};
