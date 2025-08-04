'use client';

import React, { useState } from 'react';
import { TicketCardProps } from '../../type';
import TicketCard from '@/components/common/ticketCard/TicketCard';
import TicketTabs from '@/components/common/ticketCard/TicketTabs';
import { Icons } from '@/components/ui/Icons';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

const allTickets: TicketCardProps[] = [
  {
    id: 1,
    email: 'john@example.com',
    timeAgo: '1h',
    title: 'Issue with login',
    priority: 'High',
    status: 'Unassigned',
    avatarUrl: '',
  },
  {
    id: 2,
    email: 'jane@example.com',
    timeAgo: '2h',
    title: 'Page not loading',
    priority: 'Medium',
    status: 'Assigned',
    avatarUrl: '',
  },
  {
    id: 3,
    email: 'admin@example.com',
    timeAgo: '3h',
    title: 'Bug in dashboard',
    priority: 'Low',
    status: 'Solved',
    avatarUrl: '',
  },
  {
    id: 4,
    email: 'spam@example.com',
    timeAgo: '4h',
    title: 'Get rich quick!',
    priority: 'Low',
    status: 'Spam',
    avatarUrl: '',
  },
];

const tabs: { label: string; status: TicketCardProps['status'] | 'ALL' }[] = [
  { label: 'Unassigned Tickets', status: 'Unassigned' },
  { label: 'Assigned to me', status: 'Assigned' },
  { label: 'Solved Tickets', status: 'Solved' },
  { label: 'All Tickets', status: 'ALL' },
  { label: 'Spams', status: 'Spam' },
];

export default function CardView() {
  const [selectedStatus, setSelectedStatus] = useState<
    TicketCardProps['status'] | 'Unassigned'
  >('Unassigned');

  const [checkedTickets, setCheckedTickets] = useState<Record<number, boolean>>(
    {},
  );

  const filteredTickets =
    selectedStatus === 'ALL'
      ? allTickets
      : allTickets.filter((ticket) => ticket.status === selectedStatus);

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCheckedTickets((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  // Count how many are selected
  const selectedCountInCurrentTab = filteredTickets.filter(
    (ticket) => ticket.id && checkedTickets[ticket.id],
  ).length;

  return (
    <div className="pt-6 pb-10">
      {/* Tabs */}
      <TicketTabs
        tabs={tabs}
        selected={selectedStatus}
        onSelect={(status) => setSelectedStatus(status)}
      />

      {/* Selected Count */}
      {selectedCountInCurrentTab > 0 && (
        <div className="font-outfit mt-4 flex items-center justify-between text-base font-medium text-black">
          <span>
            {selectedCountInCurrentTab} ticket
            {selectedCountInCurrentTab > 1 ? 's' : ''} selected
          </span>

          <div className="text-gray-primary flex items-center gap-4.5">
            {selectedCountInCurrentTab > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button>
                    <Icons.git_merge className="h-6 w-6 cursor-pointer" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Merge</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Icons.arrow_left_right className="h-6 w-6 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Swap</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Icons.ri_user_fill className="h-6 w-6 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Assign</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Icons.error_warning2 className="h-6 w-6 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">More</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Icons.delete_bin_fill className="h-6 w-6 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Tickets */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            {...ticket}
            checked={checkedTickets[ticket.id!] || false}
            onCheckChange={(isChecked) =>
              handleCheckChange(ticket.id!, isChecked)
            }
          />
        ))}
      </div>
    </div>
  );
}
