'use client';

import React from 'react';
import Image from 'next/image';
import { useTickets } from '../hooks/getApi/useTicket';

const TicketsPage = () => {
  const { data: tickets = [], isLoading, isError, error } = useTickets();
  console.log('ticket data', tickets);

  if (isLoading) return <p>Loading tickets...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Tickets</h1>
      {tickets.length === 0 && <p>No tickets found.</p>}
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>

          <div>
            <strong>Attachments:</strong>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {ticket.attachment.map((att, idx) => (
                <Image
                  key={idx}
                  src={att.attachment}
                  alt="attachment"
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain' }}
                />
              ))}
            </div>
          </div>

          <p>
            <strong>Priority:</strong> {ticket.priority.name}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status.name}
          </p>
          <p>
            <strong>Department:</strong> {ticket.department.name}
          </p>
          <p>
            <strong>Created By:</strong> {ticket.created_by.name}
          </p>
          <p>
            <strong>Created By:</strong>{' '}
            {ticket.customer_email || ticket.customer?.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TicketsPage;
