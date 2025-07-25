import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronRight, User2 } from 'lucide-react';
import React from 'react';

const UserSidebarFooterMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> Username
          <ChevronRight className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent
        side="top"
        className="w-full"
      >
        <DropdownMenuItem>
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
};

export default UserSidebarFooterMenu;
