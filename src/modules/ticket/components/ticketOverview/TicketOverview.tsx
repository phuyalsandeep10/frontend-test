'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import CardView from './view/CardView';
import KarbanView from './view/KarbanView';
import TableView from './view/TableView';
import { Icons } from '@/components/ui/Icons';
import SectionHeader from '../comman/Heading';

export default function TicketOverview() {
  const [activeTab, setActiveTab] = useState<'card' | 'table' | 'karban'>(
    'card',
  );

  return (
    <div className="max-w-full pt-11">
      <SectionHeader title="Ticket" />
      <div className="flex">
        <p className="font-outfit text-theme-text-primary mt-1 w-full text-xs font-normal">
          Manage and monitor support tickets across different statuses. Use the
          tabs to filter by assignment and resolution progress.
        </p>

        {/* The three clickable <p> tags */}

        <div className="flex cursor-pointer gap-5">
          <p
            className={cn(
              'rounded px-1',
              activeTab === 'card' ? 'text-black' : 'text-gray-primary',
            )}
            onClick={() => setActiveTab('card')}
          >
            <Icons.microsofit_fill />
          </p>
          <p
            className={cn(
              'rounded px-1',
              activeTab === 'table' ? 'text-black' : 'text-gray-primary',
            )}
            onClick={() => setActiveTab('table')}
          >
            <Icons.karaban_view />
          </p>
          <p
            className={cn(
              'rounded px-1',
              activeTab === 'karban'
                ? 'text-black'
                : 'hover:text-primary text-gray-600',
            )}
            onClick={() => setActiveTab('karban')}
          >
            <Icons.table_view />
          </p>
        </div>
      </div>
      {/* Switch condition to render components */}
      <div>
        {activeTab === 'card' && <CardView />}
        {activeTab === 'table' && <TableView />}
        {activeTab === 'karban' && <KarbanView />}
      </div>
    </div>
  );
}
