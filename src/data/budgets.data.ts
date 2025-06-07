import { Category } from '@/generated/prisma';

export const budgets = [
	{
		category: Category.Entertainment,
		maximum: 50.0,
		theme: '#277C78'
	},
	{
		category: Category.Bills,
		maximum: 750.0,
		theme: '#82C9D7'
	},
	{
		category: Category.DiningOut,
		maximum: 75.0,
		theme: '#F2CDAC'
	},
	{
		category: Category.PersonalCare,
		maximum: 100.0,
		theme: '#626070'
	}
];
