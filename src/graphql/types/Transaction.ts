import { prisma } from '../../lib/prisma-client';
import { CategoryEnumType, builder } from '../builder';
import { requireUser } from '../utils/guards';

// Transaction type definition
builder.prismaObject('Transaction', {
	fields: t => ({
		id: t.exposeID('id'),
		avatar: t.exposeString('avatar'),
		name: t.exposeString('name'),
		category: t.expose('category', { type: CategoryEnumType }),
		date: t.expose('date', { type: 'Date' }),
		amount: t.exposeFloat('amount'),
		recurring: t.exposeBoolean('recurring'),
		userId: t.exposeString('userId'),
		user: t.relation('user')
	})
});

builder.queryType({
	fields: t => ({
		transactions: t.prismaConnection({
			type: 'Transaction',
			cursor: 'id',
			args: {
				search: t.arg.string({ required: false }),
				category: t.arg({ type: CategoryEnumType, required: false }),
				sort: t.arg.string({ required: false }),
				recurring: t.arg.boolean({ required: false })
			},
			resolve: async (query, _parent, args, ctx) => {
				requireUser(ctx);

				return prisma.transaction.findMany({
					...query,
					where: {
						userId: ctx.user?.id,
						...(args.search && {
							name: { contains: args.search, mode: 'insensitive' }
						}),
						...(args.category && { category: args.category }),
						...(typeof args.recurring === 'boolean' && {
							recurring: args.recurring
						})
					},
					orderBy: {
						date: args.sort === 'oldest' ? 'asc' : 'desc'
					}
				});
			}
		}),
		transaction: t.prismaField({
			type: 'Transaction',
			nullable: true,
			args: {
				id: t.arg.id({ required: true })
			},
			resolve: async (query, _parent, args, ctx) => {
				requireUser(ctx);

				return prisma.transaction.findUnique({
					...query,
					where: { id: args.id }
				});
			}
		}),
		recentTransactions: t.prismaField({
			type: ['Transaction'],
			resolve: (query, _parent, _args, ctx) => {
				requireUser(ctx);

				return prisma.transaction.findMany({
					...query,
					where: { userId: ctx.user?.id },
					orderBy: { date: 'desc' },
					take: 5
				});
			}
		})
	})
});
