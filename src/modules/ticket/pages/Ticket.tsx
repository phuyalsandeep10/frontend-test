import React from 'react';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketOverview from '../components/ticketOverview/TicketOverview';

const Ticket = () => {
  return (
    <div>
      <CreateTicketForm />
      <TicketOverview />
    </div>
  );
};

export default Ticket;
