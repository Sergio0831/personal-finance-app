import { cookies } from 'next/headers';
import { type ReactNode } from 'react';

import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';

import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = async ({
	children
}: Readonly<{ children: ReactNode }>) => {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<DashboardSidebar />
			<main className='px-4 py-6 sm:px-10 sm:py-8'>{children}</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
