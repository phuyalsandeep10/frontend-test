import { Icons } from '@/components/ui/Icons';
import React from 'react';
import SLA from './sla/Sla';
import Priority from './Priority/Priority';

const TicketSystem = () => {
  return (
    <>
      <div>
        <h1 className="text-brand-dark flex items-center text-[32px] font-semibold">
          Ticket System Settings
          <Icons.help />
        </h1>
        <p className="font-outfit mt-1 text-xs font-normal text-black">
          Configure and customize your ticket management system.
        </p>
      </div>
      <div className="mt-11">
        <SLA />
      </div>
      <div className="mt-10">
        <Priority />
      </div>
    </>
  );
};

export default TicketSystem;
