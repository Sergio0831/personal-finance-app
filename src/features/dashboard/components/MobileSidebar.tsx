'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentProps } from 'react';

import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar';

import { cn } from '@/lib/clsx';

import { sidebarItems } from '@/data/sidebar-items.data';

const MobileSidebar = ({
	className,

	...props
}: ComponentProps<'div'>) => {
	const path = usePathname();

	return (
		<div
			className={cn(
				'bg-sidebar text-sidebar-foreground fixed bottom-0 left-0 z-50 block h-13 w-full rounded-t-md px-4 pt-2 sm:h-[4.625rem] sm:px-10 md:hidden',
				className
			)}
			{...props}
		>
			<div className='flex h-full w-full flex-col'>
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
			</div>
		</div>
	);
};

export default MobileSidebar;
