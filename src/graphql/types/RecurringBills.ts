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
        const allBills = await prisma.transaction.findMany({
          where: {
            userId: ctx.user.id,
            recurring: true,
          },
          orderBy: {
            date: 'desc',
          },
        });

        // Sort and filter 8 unique bills by name (most recent instance of each)
        const uniqueMap = new Map<string, (typeof allBills)[0]>();
        for (const bill of allBills.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        )) {
          if (!uniqueMap.has(bill.name)) {
            uniqueMap.set(bill.name, bill);
          }
          if (uniqueMap.size >= 8) {
            break;
          }
        }

        const bills = [...uniqueMap.values()].sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        );
        const today = new Date().getDate();

        const paid = bills.filter(
          (bill) => new Date(bill.date).getDate() < today
        );
        const dueSoon = bills.filter((bill) => {
          const day = new Date(bill.date).getDate();
          return day >= today && day <= today + 3;
        });
        const upcoming = bills.filter(
          (bill) => new Date(bill.date).getDate() > today + 3
        );

        return {
          recurringBills: bills,
          totalBills: bills.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
          paidBills: {
            count: paid.length,
            total: paid.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
          },
          dueSoon: {
            count: dueSoon.length,
            total: dueSoon.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
          },
          totalUpcoming: {
            count: upcoming.length,
            total: [...dueSoon, ...upcoming].reduce(
              (sum, tx) => sum + Math.abs(tx.amount),
              0
            ),
          },
        };
      },
    }),
  }),
});
