'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/components/Logo';
import LogoMobile from '@/components/LogoMobile';
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
		<Sidebar collapsible='icon'>
			<SidebarHeader className='relative mb-6 hidden py-10 pl-8'>
				<LogoMobile className='absolute opacity-0 transition-opacity group-data-[collapsible=icon]:opacity-100' />
				<Logo className='absolute opacity-100 transition-opacity group-data-[collapsible=icon]:opacity-0' />
			</SidebarHeader>
			<SidebarContent className='md:mb-6'>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className=''>
							{sidebarNav.map(item => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										className='transition-colors'
										asChild
										isActive={path === item.href}
										tooltip={item.label}
									>
										<Link href={item.href} className=''>
											<item.icon />
											<span className='hidden sm:block'>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='hidden pb-6'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarTrigger />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default DashboardSidebar;
