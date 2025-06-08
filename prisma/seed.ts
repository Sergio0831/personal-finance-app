import { hashPassword } from '@/features/auth/utils';

import { Prisma, PrismaClient } from '@/generated/prisma';

import { budgets, pots, transactions } from '@/data';

const prisma = new PrismaClient();

const DEFAULT_USERS = ['John', 'Maria'];

async function main() {
	console.log('🧹 Clearing existing data...');
	await prisma.$transaction([
		prisma.transaction.deleteMany(),
		prisma.pot.deleteMany(),
		prisma.budget.deleteMany(),
		prisma.user.deleteMany()
	]);
	console.log('✅ Data cleared.');

	for (const username of DEFAULT_USERS) {
		const email = `${username.toLowerCase()}@example.com`;

		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			console.log(`⚠️ User already exists: ${email}, skipping...`);
			continue;
		}

		const hashedPassword = await hashPassword('password123');

		const userData: Prisma.UserCreateInput = {
			email,
			name: username,
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
		};

		const user = await prisma.user.create({
			data: userData,
			include: {
				budgets: true,
				pots: true,
				transactions: true
			}
		});

		console.log(`✅ Created user: ${user.email}`);
	}
}

main()
	.then(() => {
		console.log('🎉 Seeding completed successfully');
	})
	.catch(error => {
		console.error('❌ Error during seeding:', error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
