'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, User, Phone, Plus } from 'lucide-react';
import SidebarList from '../SharedSidebar/SideBar';
import { cn } from '@/lib/utils';
import { userRoutes } from '@/routes/userRoutes';

const defaultInboxes = [
  {
    label: 'Main Inbox',
    icon: Mail,
    route: userRoutes.YOUR_INBOXES.MAIN_INBOX,
  },
  { label: 'Sales', icon: User, route: userRoutes.YOUR_INBOXES.SALES },
  { label: 'Support', icon: Phone, route: userRoutes.YOUR_INBOXES.SUPPORT },
];

export default function InboxSidebar() {
  const [subInboxes, setSubInboxes] = useState<string[]>([]);

  const handleAddSubInbox = () => {
    const name = prompt('Enter sub-inbox name');
    if (name) {
      setSubInboxes((prev) => [...prev, name]);
    }
  };

  return (
    <>
      <SidebarList title="Your Inboxes" sidebar={defaultInboxes} />
      <Button
        variant="outline"
        // onClick={handleAddSubInbox}
        className={cn(
          'text-theme-text-dark border-theme-text-primary hover:bg-theme-text-light font-outfit w-full cursor-pointer border-dashed text-sm font-medium',
        )}
      >
        <Plus size={20} className="mr-2" />
        New Sub-inbox
      </Button>
    </>
  );
}
