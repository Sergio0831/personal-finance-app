'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/components/Logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger
} from '@/components/ui/sidebar';

import {
	MinimizeMenu,
	NavBills,
	NavBudgets,
	NavOverview,
	NavPots,
	NavTransactions
} from '@/assets/icons';

const sidebarNav = [
	{
		icon: NavOverview,
		label: 'Overview',
		href: '/overview'
	},
	{
		icon: NavTransactions,
		label: 'Transactions',
		href: '/transactions'
	},
	{
		icon: NavBudgets,
		label: 'Budgets',
		href: '/budgets'
	},
	{
		icon: NavPots,
		label: 'Pots',
		href: '/pots'
	},
	{
		icon: NavBills,
		label: 'Recurring Bills',
		href: '/recurring-bills'
	}
];

const DashboardSidebar = () => {
	const path = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className='mb-6 py-10 pl-8'>
				<Logo />
			</SidebarHeader>
			<SidebarContent className='mb-6'>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarNav.map(item => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton asChild isActive={path === item.href}>
										<Link href={item.href}>
											<item.icon />
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarTrigger>
					<MinimizeMenu />
					<span>Minimize Menu</span>
				</SidebarTrigger>
			</SidebarFooter>
		</Sidebar>
	);
};

export default DashboardSidebar;
