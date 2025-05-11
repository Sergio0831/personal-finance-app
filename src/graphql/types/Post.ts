import { builder } from '../builder';

builder.prismaObject('Post', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
    published: t.exposeBoolean('published'),
  }),
});

builder.queryType({
  fields: (t) => ({
    posts: t.prismaField({
      type: ['Post'],
      resolve: async (query, _parent, _args, ctx) => {
        return ctx.prisma.post.findMany({ ...query });
      },
    }),
  }),
});
