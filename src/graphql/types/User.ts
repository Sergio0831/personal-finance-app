import { GraphQLError } from 'graphql';
import { z } from 'zod';

import { getUserByEmail } from '../../features/auth/api';
import { RegisterSchema } from '../../features/auth/schemas';
import { hashPassword } from '../../features/auth/utils/hashPassword';
import prisma from '../../lib/clients/prisma-client';
import { builder } from '../builder';

// Input type for registering a new user
const RegisterUserInput = builder.inputType('RegisterUserInput', {
	fields: t => ({
		name: t.string({ required: true }),
		email: t.string({ required: true }),
		password: t.string({ required: true })
	})
});

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

// Mutation to register a new user
builder.mutationType({
	fields: t => ({
		registerUser: t.prismaField({
			type: 'User',
			args: {
				input: t.arg({
					type: RegisterUserInput,
					required: true
				})
			},
			validate: {
				schema: z.object({ input: RegisterSchema })
			},
			resolve: async (query, _parent, { input }) => {
				const { name, email, password } = input;

				const existingUser = await getUserByEmail(email);

				if (existingUser) {
					throw new GraphQLError('User already exists');
				}

				const hashedPassword = await hashPassword(password);

				const user = await prisma.user.create({
					...query,
					data: {
						name,
						email,
						password: hashedPassword
					}
				});
				return user;
			}
		})
	})
});
