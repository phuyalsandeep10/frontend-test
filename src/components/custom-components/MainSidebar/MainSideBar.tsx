import React from 'react';
import Search from './Search';
import TicketResolved from './TicketResolved';
import InboxSidebar from './InboxSidebar';
import OtherBoxes from './OtherBoxes';
import ToolsAndFeatures from './ToolsAndFeatures';
const MainSidebar = () => {
  return (
    <div className="pl-3">
      <Search />
      <TicketResolved
        resolved={35}
        total={40}
        label="Ticket resolved"
        className="pt-10"
      />
      <TicketResolved
        resolved={5}
        total={40}
        label="Ticket Unresolved"
        className="pt-4"
      />
      <InboxSidebar />
      <OtherBoxes />
      <ToolsAndFeatures />
    </div>
  );
};

export default MainSidebar;
