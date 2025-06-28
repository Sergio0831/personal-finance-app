import { prisma } from '../../lib/prisma-client';
import { CategoryEnumType, builder } from '../builder';

// Transaction type definition
builder.prismaObject('Transaction', {
	fields: t => ({
		id: t.exposeID('id', { nullable: false }),
		avatar: t.exposeString('avatar', { nullable: false }),
		name: t.exposeString('name', { nullable: false }),
		category: t.expose('category', { type: CategoryEnumType, nullable: false }),
		date: t.expose('date', { type: 'Date', nullable: false }),
		amount: t.exposeFloat('amount', { nullable: false }),
		recurring: t.exposeBoolean('recurring', { nullable: false }),
		userId: t.exposeString('userId', { nullable: false }),
		user: t.relation('user', { nullable: false })
	})
});

builder.queryType({
	fields: t => ({
		transactions: t.prismaField({
			type: ['Transaction'],
			nullable: false,
			args: {
				recurring: t.arg.boolean({ required: false })
			},
			resolve: async (query, _parent, args, ctx) => {
				return prisma.transaction.findMany({
					...query,
					where: {
						userId: ctx.user?.id,
						...(typeof args.recurring === 'boolean' && {
							recurring: args.recurring
						})
					},
					orderBy: {
						date: 'desc'
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
			resolve: async (query, _parent, args) => {
				return prisma.transaction.findUnique({
					...query,
					where: { id: args.id }
				});
			}
		}),
		recentTransactions: t.prismaField({
			type: ['Transaction'],
			resolve: (query, _parent, _args, ctx) => {
				return prisma.transaction.findMany({
					...query,
					where: { userId: ctx.user.id },
					orderBy: { date: 'desc' },
					take: 5
				});
			}
		})
	})
});
