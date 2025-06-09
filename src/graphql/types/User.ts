import prisma from '@/lib/clients/prisma-client';

import { builder } from '../builder';

// User type definition
builder.prismaObject('User', {
	fields: t => ({
		id: t.exposeID('id'),
		name: t.exposeString('name', { nullable: true }),
		email: t.exposeString('email', { nullable: true }),
		image: t.exposeString('image', { nullable: true })
	})
});

// Query to get the current user
builder.queryType({
	fields: t => ({
		user: t.prismaField({
			type: 'User',
			nullable: true,
			resolve: async (query, _parent, _args, ctx) => {
				if (!ctx.session?.user?.email) return null;

				return prisma.user.findUnique({
					...query,
					where: { email: ctx.session.user.email }
				});
			}
		})
	})
});
