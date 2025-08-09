import {
  CreateBudgetSchema,
  DeleteBudgetSchema,
  UpdateBudgetSchema,
} from '../../features/budgets/schemas';
import { prisma } from '../../lib/prisma-client';
import { builder, CategoryEnumType } from '../builder';
import { LastTransaction } from './LastTransaction';

// Budget type definition
export const BudgetInput = builder.inputType('BudgetInput', {
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

builder.mutationType({
  fields: (t) => ({
    createBudget: t.prismaField({
      type: Budget,
      args: {
        input: t.arg({ type: BudgetInput, required: true }),
      },
      validate: {
        schema: CreateBudgetSchema,
      },
      resolve: async (query, _parent, { input }, ctx) => {
        return await prisma.budget.create({
          ...query,
          data: {
            category: input.category,
            maximum: input.maximum,
            theme: input.theme,
            userId: ctx.user.id,
          },
        });
      },
    }),
    updateBudget: t.prismaField({
      type: Budget,
      args: {
        id: t.arg.string({ required: true }),
        input: t.arg({ type: BudgetInput, required: true }),
      },
      validate: {
        schema: UpdateBudgetSchema,
      },
      resolve: async (query, _parent, { id, input }, ctx) => {
        return await prisma.budget.update({
          ...query,
          where: { id, userId: ctx.user.id },
          data: {
            category: input.category,
            maximum: input.maximum,
            theme: input.theme,
          },
        });
      },
    }),
    deleteBudget: t.prismaField({
      type: Budget,
      args: {
        id: t.arg.string({ required: true }),
      },
      validate: {
        schema: DeleteBudgetSchema,
      },
      resolve: async (query, _parent, { id }, ctx) => {
        return await prisma.budget.delete({
          ...query,
          where: { id, userId: ctx.user.id },
        });
      },
    }),
  }),
});
