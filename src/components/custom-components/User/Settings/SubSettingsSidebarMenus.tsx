'use client';

import React, { useState } from 'react';
import { Bell, Clock, ShieldQuestion, Monitor, User } from 'lucide-react';
import SidebarSection, {
  SidebarItem,
} from '../../SharedSidebar/SettingSidebar';
import { userRoutes } from '@/routes/userRoutes';
import { cn } from '@/lib/utils';

const sidebarSectionsData: {
  title: string;
  items: SidebarItem[];
}[] = [
  {
    title: 'Accounts',
    items: [
      {
        label: 'Account Information',
        href: userRoutes.SETTINGS.ACCOUNT_INFORMATION,
        icon: <User className="h-5 w-5" />,
      },
      {
        label: 'Notification',
        href: userRoutes.SETTINGS.NOTIFICATIONS,
        icon: <Bell className="h-5 w-5" />,
      },
      {
        label: 'Availability',
        href: userRoutes.SETTINGS.AVAILABILITY,
        icon: <Clock className="h-5 w-5" />,
      },
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Workspace Setting',
    items: [
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Chatbox Setting',
    items: [
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Inbox Setting',
    items: [
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Email Setting',
    items: [
      {
        label: 'Security',
        href: userRoutes.SETTINGS.SECURITY,
        icon: <ShieldQuestion className="h-5 w-5" />,
      },
      {
        label: 'Personalization',
        href: userRoutes.SETTINGS.PERSONALIZATION,
        icon: <Monitor className="h-5 w-5" />,
      },
    ],
  },
];

const Sidebar = () => {
  const [openSection, setOpenSection] = useState<string>('Accounts');

  const handleToggle = (title: string) => {
    setOpenSection((prev) => (prev === title ? '' : title));
  };

  return (
    <div
      className={cn('text-brand-dark w-full pt-2 pr-[7px] pl-[9px] text-sm')}
    >
      {sidebarSectionsData.map((section) => (
        <SidebarSection
          key={section.title}
          title={section.title}
          items={section.items}
          isOpen={openSection === section.title}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default Sidebar;
