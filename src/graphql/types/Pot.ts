import { GraphQLError } from 'graphql';
import { CreatePotSchema } from '../../features/pots/schemas/add-new-pot.schema';
import { AddToPotSchema } from '../../features/pots/schemas/add-to-pot.schema';
import { DeletePotSchema } from '../../features/pots/schemas/delete-pot.schema';
import { UpdatePotSchema } from '../../features/pots/schemas/update-pot.schema';
import { prisma } from '../../lib/prisma-client';
import { builder } from '../builder';

const CreatePotInput = builder.inputType('CreatePotInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    target: t.float({ required: true }),
    theme: t.string({ required: true }),
  }),
});

const UpdatePotInput = builder.inputType('UpdatePotInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    target: t.float({ required: true }),
    theme: t.string({ required: true }),
  }),
});

export const Pot = builder.prismaObject('Pot', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    target: t.exposeFloat('target', { nullable: false }),
    total: t.exposeFloat('total', { nullable: false }),
    theme: t.exposeString('theme', { nullable: false }),
    createdAt: t.expose('createdAt', {
      type: 'Date',
      nullable: false,
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
      nullable: false,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    pots: t.prismaField({
      type: [Pot],
      nullable: false,
      resolve: async (query, _parent, _args, ctx) => {
        return await prisma.pot.findMany({
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
    createPot: t.prismaField({
      type: Pot,
      args: {
        input: t.arg({ type: CreatePotInput, required: true }),
      },
      validate: {
        schema: CreatePotSchema,
      },
      resolve: async (query, _parent, { input }, ctx) => {
        return await prisma.pot.create({
          ...query,
          data: {
            name: input.name,
            target: input.target,
            theme: input.theme,
            total: 0,
            userId: ctx.user.id,
          },
        });
      },
    }),
    updatePot: t.prismaField({
      type: Pot,
      args: {
        id: t.arg.string({ required: true }),
        input: t.arg({ type: UpdatePotInput, required: true }),
      },
      validate: {
        schema: UpdatePotSchema,
      },
      resolve: async (query, _parent, { id, input }, ctx) => {
        return await prisma.pot.update({
          ...query,
          where: { id, userId: ctx.user.id },
          data: {
            name: input.name,
            target: input.target,
            theme: input.theme,
          },
        });
      },
    }),
    deletePot: t.prismaField({
      type: Pot,
      args: {
        id: t.arg.string({ required: true }),
      },
      validate: {
        schema: DeletePotSchema,
      },
      resolve: async (query, _parent, { id }, ctx) => {
        return await prisma.pot.delete({
          ...query,
          where: { id, userId: ctx.user.id },
        });
      },
    }),
    addToPot: t.prismaField({
      type: Pot,
      args: {
        id: t.arg.string({ required: true }),
        amount: t.arg.float({ required: true }),
      },
      validate: {
        schema: AddToPotSchema,
      },
      resolve: async (query, _parent, { id, amount }, ctx) => {
        const pot = await prisma.pot.findFirstOrThrow({
          where: {
            id,
            userId: ctx.user.id,
          },
          select: {
            total: true,
            target: true,
          },
        });

        const newTotal = pot.total + amount;
        if (newTotal > pot.target) {
          throw new GraphQLError('Amount exceeds your saving target');
        }

        return await prisma.pot.update({
          ...query,
          where: { id, userId: ctx.user.id },
          data: {
            total: {
              increment: amount,
            },
          },
        });
      },
    }),
  }),
});
