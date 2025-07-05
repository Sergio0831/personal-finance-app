import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { SidebarProvider } from '@/components/ui/sidebar';
import DesktopSidebar from '@/features/dashboard/components/DesktopSidebar';
import MobileSidebar from '@/features/dashboard/components/MobileSidebar';

const DashboardLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DesktopSidebar />
      <MobileSidebar />
      <PageWrapper>{children}</PageWrapper>
    </SidebarProvider>
  );
};

export default DashboardLayout;
