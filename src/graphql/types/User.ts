import { GraphQLError } from 'graphql';

import { prisma } from '../../lib/prisma-client';
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
				const user = prisma.user.findUnique({
					...query,
					where: {
						id: ctx.user.id,
						email: ctx.user.email
					}
				});

				if (!user)
					throw new GraphQLError('User does not exist', {
						extensions: {
							code: 'NOT_FOUND'
						}
					});

				return user;
			}
		})
	})
});
