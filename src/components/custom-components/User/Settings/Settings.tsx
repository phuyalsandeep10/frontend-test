'use client';

import SubSidebarContentWrapper from '../CustomUserSidebar/SubSidebarContentWrapper';
import SettingsHeader from './SettingHeader';
import SubSettingsSidebarMenus from './SubSettingsSidebarMenus';
import React from 'react';

const Settings = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <SubSidebarContentWrapper>
        <SubSettingsSidebarMenus />
      </SubSidebarContentWrapper>

      <div className="flex-1">
        <SettingsHeader />
        <div className="px-24 py-11">{children}</div>
      </div>
    </div>
  );
};

export default Settings;
