import CustomUserSidebar from '@/components/custom-components/User/CustomUserSidebar/CustomUserSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

const UserDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <CustomUserSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};

export default UserDashboardLayout;
