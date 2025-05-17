import { builder } from '../builder';
import { getUserByEmail } from '../../features/auth/api';
import { RegisterSchema } from '../../features/auth/schemas';
import { hashPassword } from '../../features/auth/utils/hashPassword';

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

builder.mutationField('registerUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    validate: {
      schema: RegisterSchema,
    },
    resolve: async (query, _parent, { name, email, password }, ctx) => {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await hashPassword(password);

      const user = await ctx.prisma.user.create({
        ...query,
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return user;
    },
  }),
);
