import { GraphQLError } from 'graphql';

import { Context } from '../context';

export function requireUser(ctx: Context) {
	if (!ctx.user?.id) {
		throw new GraphQLError('You must be logged in to perform this action', {
			extensions: {
				code: 'UNAUTHORIZED'
			}
		});
	}

	return ctx.user;
}
