import React from 'react';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketOverview from '../components/ticketOverview/TicketOverview';
import TicketHeader from '../components/comman/Heading';
import { Icons } from '@/components/ui/Icons';

const Ticket = () => {
  return (
    <div>
      <TicketHeader
        title="Ticket"
        icon={<Icons.danger />}
        description="Organize, assign, and monitor issues seamlessly."
        className="pb-10"
      />
      <CreateTicketForm />
      <TicketOverview />
    </div>
  );
};

export default Ticket;
