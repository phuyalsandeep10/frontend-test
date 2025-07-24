import React from 'react';
import SubSidebarContentWrapper from '../CustomUserSidebar/SubSidebarContentWrapper';
import SubSettingsSidebarMenus from './SubSettingsSidebarMenus';

const Settings = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <SubSidebarContentWrapper>
        <SubSettingsSidebarMenus />
      </SubSidebarContentWrapper>
      <div className="flex-1">
        <div className="">
          <div className="border-b-gray-light flex h-auto w-full items-center justify-between border-b-1 px-24 xl:h-10">
            <div className="">Menus</div>
            <div className="">Search</div>
          </div>
          <div className="px-24 py-11">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
