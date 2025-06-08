'use server';

import prisma from '@/lib/clients/prisma-client';

import { RegisterSchema, RegisterSchemaType } from '../schemas';
import { getUserByEmail } from '../utils';
import { hashPassword } from '../utils';

import { budgets, pots, transactions } from '@/data';

export const register = async (values: RegisterSchemaType) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid registration data' };
	}

	const { name, email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'User already exists' };
	}

	const hashedPassword = await hashPassword(password);

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			balance: 4836,
			income: 3814.25,
			expenses: 1700.5,
			budgets: {
				create: budgets
			},
			pots: {
				create: pots
			},
			transactions: {
				create: transactions
			}
		}
	});

	return { message: 'User registered successfully' };
};
