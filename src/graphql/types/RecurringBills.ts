import type { Transaction as TransactionType } from '@/generated/prisma';
import { prisma } from '../../lib/prisma-client';
import { builder } from '../builder';
import { Transaction } from './Transaction';

const RecurringBills = builder.objectRef<{
  recurringBills: TransactionType[];
  totalBills: number;
  totalUpcoming: number;
  dueSoon: number;
}>('RecurringBills');

RecurringBills.implement({
  fields: (t) => ({
    recurringBills: t.field({
      type: [Transaction],
      nullable: false,
      resolve: (parent) => parent.recurringBills,
    }),
    totalBills: t.float({
      nullable: false,
      resolve: (parent) => parent.totalBills,
    }),
    totalUpcoming: t.float({
      nullable: false,
      resolve: (parent) => parent.totalUpcoming,
    }),
    dueSoon: t.float({
      nullable: false,
      resolve: (parent) => parent.dueSoon,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    recurringBills: t.field({
      type: RecurringBills,
      nullable: false,
      resolve: async (_parent, _args, ctx) => {
        const now = new Date();
        const in7Days = new Date();
        in7Days.setDate(now.getDate() + 7);

        const recurringBills = await prisma.transaction.findMany({
          where: {
            userId: ctx.user.id,
            recurring: true,
          },
          orderBy: { date: 'desc' },
        });

        const totalBills = recurringBills.reduce(
          (sum, tx) => sum + Math.abs(tx.amount),
          0
        );

        const paidBills = recurringBills
          .filter((tx) => tx.date < now)
          .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

        const totalUpcoming = totalBills - paidBills;

        const dueSoon = recurringBills
          .filter((tx) => tx.date > now && tx.date <= in7Days)
          .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

        return {
          recurringBills,
          totalBills,
          totalUpcoming,
          dueSoon,
        };
      },
    }),
  }),
});
