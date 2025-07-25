import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import UserSidebarFooterMenu from './UserSidebarFooterMenu';
import UserSidebarHeader from './UserSidebarHeader';
const CustomUserSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="px-3.5 py-[30px]">
        <UserSidebarHeader />
      </SidebarHeader>
      <SidebarContent className="px-3.5">
        {
          // Main sidebar menus here
        }
      </SidebarContent>
      <SidebarFooter className="px-3.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserSidebarFooterMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomUserSidebar;
