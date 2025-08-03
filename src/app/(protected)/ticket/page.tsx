import SettingsHeader from '@/components/custom-components/Settings/SettingHeader';
import Ticket from '@/modules/ticket/pages/Ticket';
import React from 'react';

const page = () => {
  return (
    <>
      <div>
        <SettingsHeader />
      </div>
      <div className="px-24 pt-11">
        <Ticket />
      </div>
    </>
  );
};

export default page;
