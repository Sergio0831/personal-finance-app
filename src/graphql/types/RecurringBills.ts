import type { Transaction as TransactionType } from '@/generated/prisma';
import { prisma } from '../../lib/prisma-client';
import { builder } from '../builder';
import { Transaction } from './Transaction';

const AmountSummary = builder.objectRef<{ count: number; total: number }>(
  'AmountSummary'
);

AmountSummary.implement({
  fields: (t) => ({
    count: t.int({
      nullable: false,
      resolve: (parent) => parent.count,
    }),
    total: t.float({
      nullable: false,
      resolve: (parent) => parent.total,
    }),
  }),
});

const RecurringBills = builder.objectRef<{
  recurringBills: TransactionType[];
  totalBills: number;
  paidBills: { count: number; total: number };
  totalUpcoming: { count: number; total: number };
  dueSoon: { count: number; total: number };
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
    paidBills: t.field({
      type: AmountSummary,
      nullable: false,
      resolve: (parent) => parent.paidBills,
    }),
    totalUpcoming: t.field({
      type: AmountSummary,
      nullable: false,
      resolve: (parent) => parent.totalUpcoming,
    }),
    dueSoon: t.field({
      type: AmountSummary,
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

        const paid = recurringBills.filter((tx) => tx.date < now);
        const paidBills = {
          count: paid.length,
          total: paid.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
        };

        const upcoming = recurringBills.filter((tx) => tx.date >= now);
        const totalUpcoming = {
          count: upcoming.length,
          total: upcoming.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
        };

        const soon = upcoming.filter((tx) => tx.date <= in7Days);
        const dueSoon = {
          count: soon.length,
          total: soon.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
        };

        return {
          recurringBills,
          totalBills,
          paidBills,
          totalUpcoming,
          dueSoon,
        };
      },
    }),
  }),
});
