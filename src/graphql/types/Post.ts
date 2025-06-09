import prisma from '@/lib/clients/prisma-client';

import { builder } from '../builder';

builder.prismaObject('Post', {
	fields: t => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		published: t.exposeBoolean('published')
	})
});

builder.queryType({
	fields: t => ({
		posts: t.prismaField({
			type: ['Post'],
			resolve: async query => {
				return prisma.post.findMany({ ...query });
			}
		})
	})
});
