'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SidebarList from '../SharedSidebar/SideBar';
import { cn } from '@/lib/utils';
import { userRoutes } from '@/routes/userRoutes';
import { Icons } from '@/components/ui/Icons';

const MainSidebar = [
  {
    label: 'Main Inbox',
    icon: Icons.mail,
    route: userRoutes.YOUR_INBOXES.MAIN_INBOX,
  },
  { label: 'Sales', icon: Icons.client, route: userRoutes.YOUR_INBOXES.SALES },
  {
    label: 'Support',
    icon: Icons.phone,
    route: userRoutes.YOUR_INBOXES.SUPPORT,
  },
];

export default function InboxSidebar() {
  const [subInboxes, setSubInboxes] = useState<string[]>([]);

  // const handleAddSubInbox = () => {
  //   const name = prompt('Enter sub-inbox name');
  //   if (name) {
  //     setSubInboxes((prev) => [...prev, name]);
  //   }
  // };

  return (
    <>
      <SidebarList title="Your Inboxes" sidebar={MainSidebar} />
      <div className="mt-6">
        <Button
          variant="outline"
          // onClick={handleAddSubInbox}
          className={cn(
            'text-theme-text-dark border-theme-text-primary hover:bg-theme-text-light font-outfit w-full cursor-pointer border-dashed text-sm font-medium',
          )}
        >
          <Icons.plus className="mr-1 h-5 w-5" />
          New Sub-inbox
        </Button>
      </div>
    </>
  );
}
