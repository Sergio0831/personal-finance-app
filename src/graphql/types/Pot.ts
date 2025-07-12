import { prisma } from '../../lib/prisma-client';
import { builder } from '../builder';

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
