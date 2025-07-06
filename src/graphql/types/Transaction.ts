import { prisma } from '../../lib/prisma-client';
import { builder, CategoryEnumType } from '../builder';

// Transaction type definition
export const Transaction = builder.prismaObject('Transaction', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    avatar: t.exposeString('avatar', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    category: t.expose('category', { type: CategoryEnumType, nullable: false }),
    date: t.expose('date', { type: 'Date', nullable: false }),
    amount: t.exposeFloat('amount', { nullable: false }),
    recurring: t.exposeBoolean('recurring', { nullable: false }),
    userId: t.exposeString('userId', { nullable: false }),
    user: t.relation('user', { nullable: false }),
  }),
});

builder.queryType({
  fields: (t) => ({
    transactions: t.prismaField({
      type: [Transaction],
      nullable: false,
      resolve: async (query, _parent, _args, ctx) => {
        const transactions = await prisma.transaction.findMany({
          ...query,
          where: {
            userId: ctx.user?.id,
          },
          orderBy: {
            date: 'desc',
          },
        });

        return transactions;
      },
    }),

    recentTransactions: t.prismaField({
      type: [Transaction],
      nullable: false,
      resolve: async (query, _parent, _args, ctx) => {
        const transactions = await prisma.transaction.findMany({
          ...query,
          where: { userId: ctx.user.id },
          orderBy: { date: 'desc' },
          take: 5,
        });

        return transactions;
      },
    }),
  }),
});
