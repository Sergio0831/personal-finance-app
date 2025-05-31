import { type ReactNode } from 'react';

import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';

import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main>{children}</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
