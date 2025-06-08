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

import { sidebarItems } from '@/data/sidebar-items.data';

const DesktopSidebar = () => {
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
							{sidebarItems.map(item => (
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
			<SidebarFooter className='hidden pb-20'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarTrigger />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default DesktopSidebar;
