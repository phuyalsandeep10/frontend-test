import { userRoutes } from '@/routes/userRoutes';
import Link from 'next/link';
import React from 'react';

const SubSettingsSidebarMenus = () => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <Link
          href={userRoutes.SETTINGS.ACCOUNT_INFORMATION}
          className="text-brand-primary"
        >
          Account Information
        </Link>
        <Link
          href={userRoutes.SETTINGS.NOTIFICATIONS}
          className="text-brand-primary"
        >
          Notifications
        </Link>
      </div>
    </div>
  );
};

export default SubSettingsSidebarMenus;
