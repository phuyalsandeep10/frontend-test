import React from 'react';
import Search from './Search';
import TicketResolved from './TicketResolved';
import InboxSidebar from './InboxSidebar';
import OtherBoxes from './OtherBoxes';
import ToolsAndFeatures from './ToolsAndFeatures';
import { Icons } from '@/components/ui/Icons';
const MainSidebar = () => {
  return (
    <div className="pl-3">
      <Search />
      <TicketResolved
        resolved={35}
        total={40}
        label="Ticket resolved"
        className="pt-10"
        icon={<Icons.ticketResolved className="h-3 w-3" />}
      />
      <TicketResolved
        resolved={5}
        total={40}
        label="Ticket Unresolved"
        icon={<Icons.ticketResolved className="h-3 w-3" />}
        className="pt-4"
      />
      <InboxSidebar />
      <OtherBoxes />
      <ToolsAndFeatures />
    </div>
  );
};

export default MainSidebar;
