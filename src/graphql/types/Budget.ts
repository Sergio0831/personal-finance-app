
import { prisma } from '../../lib/prisma-client';
import { builder, CategoryEnumType } from '../builder';
import { LastTransaction } from './LastTransaction';

// Budget type definition
export const BudgetInput = builder.inputType('CreateBudgetInput', {
  fields: (t) => ({
    category: t.field({ type: CategoryEnumType, required: true }),
    maximum: t.float({ required: true }),
    theme: t.string({ required: true }),
  }),
});

export const Budget = builder.prismaObject('Budget', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    maximum: t.exposeFloat('maximum', { nullable: false }),
    category: t.expose('category', { type: CategoryEnumType, nullable: false }),
    theme: t.exposeString('theme', { nullable: false }),
    createdAt: t.expose('createdAt', {
      type: 'Date',
      nullable: false,
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
      nullable: false,
    }),
    // Custom computed field
    lastTransactions: t.field({
      type: [LastTransaction],
      nullable: false,
      resolve: async (budget, _args, ctx) => {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId: ctx.user.id,
            category: budget.category,
          },
          take: 3,
          orderBy: { date: 'desc' },
        });

        return transactions;
      },
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    budgets: t.prismaField({
      type: [Budget],
      nullable: false,
      resolve: async (query, _parent, _args, ctx) => {
        return await prisma.budget.findMany({
          ...query,
          where: { userId: ctx.user.id },
          orderBy: { createdAt: 'desc' },
        });
      },
    }),
  }),
});
