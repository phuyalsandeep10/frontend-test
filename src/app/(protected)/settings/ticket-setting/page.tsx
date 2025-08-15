import Settings from '@/components/custom-components/Settings/Settings';
import TicketSystem from '@/modules/ticketSetting/TicketSystem';
import React from 'react';

const page = () => {
  return (
    <div>
      <Settings>
        <TicketSystem />
      </Settings>
    </div>
  );
};

export default page;
