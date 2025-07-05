'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarItems } from '@/data/sidebar-items.data';
import { cn } from '@/lib/clsx';

const MobileSidebar = ({
  className,

  ...props
}: ComponentProps<'div'>) => {
  const path = usePathname();

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-50 block h-13 w-full rounded-t-md bg-sidebar px-4 pt-2 text-sidebar-foreground sm:h-[4.625rem] sm:px-10 md:hidden',
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full flex-col">
        <SidebarContent className="md:mb-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className="transition-colors"
                      isActive={path === item.href}
                    >
                      <Link className="" href={item.href}>
                        <item.icon />
                        <span className="hidden sm:block">{item.label}</span>
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
