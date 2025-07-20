import { CreatePotSchema } from '../../features/pots/schemas/add-new-pot.schema';
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
    name: t.string(),
    target: t.float(),
    theme: t.string(),
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
        const data: Record<string, unknown> = {};
        if (typeof input.name === 'string') {
          data.name = input.name;
        }
        if (typeof input.theme === 'string') {
          data.theme = input.theme;
        }
        if (typeof input.target === 'number') {
          data.target = input.target;
        }
        return await prisma.pot.update({
          ...query,
          where: { id, userId: ctx.user.id },
          data,
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
  }),
});
