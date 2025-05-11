import { builder } from '../builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
  }),
});

builder.queryType({
  fields: (t) => ({
    user: t.prismaField({
      type: 'User',
      nullable: true,
      resolve: async (query, _parent, _args, ctx) => {
        if (!ctx.session?.user?.email) return null;

        return ctx.prisma.user.findUnique({
          ...query,
          where: { email: ctx.session.user.email },
        });
      },
    }),
  }),
});
