'use client';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';

import { useIsMobile } from '@/hooks/useIsMobile';

import { cn } from '@/lib/utils';

import { MinimizeMenu } from '@/assets/icons';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '18.75rem';
const SIDEBAR_WIDTH_ICON = '5.5rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
	state: 'expanded' | 'collapsed';
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.');
	}

	return context;
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<'div'> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === 'function' ? value(open) : value;
			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[setOpenProp, open]
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
	}, [isMobile, setOpen, setOpenMobile]);

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleSidebar]);

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? 'expanded' : 'collapsed';

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar
		}),
		[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot='sidebar-wrapper'
					style={
						{
							'--sidebar-width': SIDEBAR_WIDTH,
							'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
							...style
						} as React.CSSProperties
					}
					className={cn(
						'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
						className
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	side = 'left',
	variant = 'sidebar',
	collapsible = 'offcanvas',
	className,
	children,
	...props
}: React.ComponentProps<'div'> & {
	side?: 'left' | 'right';
	variant?: 'sidebar' | 'floating' | 'inset';
	collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
	const { isMobile, state } = useSidebar();

	if (collapsible === 'none') {
		return (
			<div
				data-slot='sidebar'
				className={cn(
					'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<div
				data-slot='sidebar'
				data-sidebar='sidebar'
				data-mobile='true'
				className={cn(
					'bg-sidebar text-sidebar-foreground fixed bottom-0 left-0 z-50 h-13 w-full rounded-t-md px-4 pt-2 sm:h-[4.625rem] sm:px-10',
					className
				)}
				{...props}
			>
				<div className='flex h-full w-full flex-col'>{children}</div>
			</div>
		);
	}

	return (
		<div
			className='group peer text-sidebar-foreground'
			data-state={state}
			data-collapsible={state === 'collapsed' ? collapsible : ''}
			data-variant={variant}
			data-side={side}
			data-slot='sidebar'
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot='sidebar-gap'
				className={cn(
					'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
					'group-data-[collapsible=offcanvas]:w-0',
					'group-data-[side=right]:rotate-180',
					variant === 'floating' || variant === 'inset'
						? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
						: 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
				)}
			/>
			<div
				data-slot='sidebar-container'
				className={cn(
					'fixed inset-y-0 z-10 h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
					side === 'left'
						? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
						: 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
					// Adjust the padding for floating and inset variants.
					variant === 'floating' || variant === 'inset'
						? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
						: 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
					className
				)}
				{...props}
			>
				<div
					data-sidebar='sidebar'
					data-slot='sidebar-inner'
					className='bg-sidebar flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm md:rounded-r-2xl'
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-header'
			data-sidebar='header'
			className={cn('flex-col gap-2 p-2 md:flex', className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-footer'
			data-sidebar='footer'
			className={cn('flex-col gap-2 md:flex', className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-content'
			data-sidebar='content'
			className={cn(
				'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-group'
			data-sidebar='group'
			className={cn(
				'relative flex w-full min-w-0 flex-col md:pr-6 md:group-data-[collapsible=icon]:pr-2',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-group-content'
			data-sidebar='group-content'
			className={cn('w-full text-sm', className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot='sidebar-menu'
			data-sidebar='menu'
			className={cn(
				'flex w-full min-w-0 justify-between gap-1 md:flex-col',
				className
			)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='sidebar-menu-item'
			data-sidebar='menu-item'
			className={cn('group/menu-item relative flex-1', className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	'peer/menu-button cursor-pointer flex flex-col md:flex-row w-full items-center gap-x-4 gap-y-1 md:overflow-hidden rounded-t-md md:rounded-tl-none md:rounded-e-xl md:px-6 md:py-4 py-2 outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:text-sidebar-primary focus-visible:ring-2 border-b-4  border-b-transparent md:border-b-0 md:border-l-4 md:border-l-transparent disabled:pointer-events-none disabled:opacity-50 md:group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:border-b-accent md:data-[active=true]:border-l-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-primary data-[active=true]:[&>svg]:text-accent [&>span:last-child]:truncate [&>svg]:size-6 [&>svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'hover:text-sidebar-primary'
			},
			size: {
				default: 'md:h-14 text-preset-5 font-bold md:text-preset-3'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = 'default',
	size = 'default',
	tooltip,
	className,
	...props
}: React.ComponentProps<'button'> & {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : 'button';
	const { isMobile, state } = useSidebar();

	const button = (
		<Comp
			data-slot='sidebar-menu-button'
			data-sidebar='menu-button'
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);

	if (!tooltip) {
		return button;
	}

	if (typeof tooltip === 'string') {
		tooltip = {
			children: tooltip
		};
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side='right'
				align='center'
				hidden={state !== 'collapsed' || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	);
}

function SidebarTrigger({
	className,
	onClick
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { toggleSidebar } = useSidebar();

	return (
		<SidebarMenuButton
			data-sidebar='trigger'
			data-slot='sidebar-trigger'
			onClick={event => {
				onClick?.(event);
				toggleSidebar();
			}}
			className={cn(
				'transition-colors [&>svg]:transition-transform group-data-[collapsible=icon]:[&>svg]:rotate-180',
				className
			)}
			tooltip='Maximize Menu'
		>
			<MinimizeMenu />
			<span className='sr-only'>Toggle Sidebar</span>
			<span>Minimize Menu</span>
		</SidebarMenuButton>
	);
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarTrigger,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	useSidebar
};
