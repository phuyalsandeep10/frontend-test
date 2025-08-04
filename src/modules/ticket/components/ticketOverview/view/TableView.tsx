'use client';

import React, { useState } from 'react';
import TicketTabs from '@/components/common/ticketCard/TicketTabs';
import { TicketCardProps } from '../../type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/ui/Icons';
import Pagination from '@/components/common/pagination/Pagination';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

// Dummy ticket data - you can add more items here or fetch from API
const tickets: TicketCardProps[] = [
  {
    id: 1,
    email: 'user1@example.com',
    timeAgo: '2h ago',
    title: 'Login issue',
    priority: 'High',
    status: 'Assigned',
    created_by: 'Alice',
  },
  {
    id: 2,
    email: 'user2@example.com',
    timeAgo: '4h ago',
    title: 'Page not loading',
    priority: 'Medium',
    status: 'Unassigned',
    created_by: 'Bob',
  },
  {
    id: 3,
    email: 'user3@example.com',
    timeAgo: '1d ago',
    title: 'Bug in checkout',
    priority: 'Low',
    status: 'Solved',
    created_by: 'Charlie',
  },
  // Add more tickets to test pagination (at least > 10)
  ...Array.from({ length: 100 }, (_, i) => ({
    id: 4 + i,
    email: `user${4 + i}@example.com`,
    timeAgo: `${i + 5}h ago`,
    title: `Ticket ${4 + i}`,
    priority: ['Low', 'Medium', 'High'][i % 3],
    status: ['Assigned', 'Unassigned', 'Solved'][i % 3],
    created_by: ['Alice', 'Bob', 'Charlie'][i % 3],
  })),
];

const tabs = [
  { label: 'Unassigned Tasks', status: 'Unassigned' },
  { label: 'Assigned to me ', status: 'Assigned' },
  { label: 'Solved Tickets', status: 'Solved' },
  { label: 'All Tickets', status: 'ALL' },
  { label: 'Spams', status: 'Spam' },
];

const ITEMS_PER_PAGE = 10;

// Table header labels
// First is empty string for the checkbox column
const tableHeaders = [
  { key: 'checkbox', label: '' },
  { key: 'ticket', label: 'Ticket' },
  { key: 'status', label: 'Status' },
  { key: 'createdTime', label: 'Created Time' },
  { key: 'agent', label: 'Agent' },
  { key: 'priority', label: 'Priority' },
];

const TableView = () => {
  const [selectedTab, setSelectedTab] = useState<
    TicketCardProps['status'] | 'Unassigned'
  >('Unassigned');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTickets =
    selectedTab === 'ALL'
      ? tickets
      : tickets.filter((ticket) => ticket.status === selectedTab);

  const totalItems = filteredTickets.length;

  // Slice tickets for current page
  const pagedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const allChecked =
    pagedTickets.length > 0 &&
    pagedTickets.every((ticket) => selectedIds.includes(ticket.id!));
  const isIndeterminate = selectedIds.length > 0 && !allChecked;

  const toggleSelectAll = () => {
    if (allChecked) {
      // Unselect only current page items
      setSelectedIds((prev) =>
        prev.filter((id) => !pagedTickets.some((ticket) => ticket.id === id)),
      );
    } else {
      // Select current page items + keep previous selections
      setSelectedIds((prev) => [
        ...new Set([...prev, ...pagedTickets.map((t) => t.id!)]),
      ]);
    }
  };

  const toggleItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Calculate selected count only for the current filtered tickets
  const selectedCountInCurrentTab = selectedIds.filter((id) =>
    filteredTickets.some((ticket) => ticket.id === id),
  ).length;

  // When tab changes, reset page to 1
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  return (
    <div className="p-6">
      <TicketTabs
        tabs={tabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />

      {/* Selected Count and icons */}
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

      <div className="mt-4 rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary-hover hover:bg-secondary-hover font-outfit h-15 cursor-pointer text-xl leading-[30px] font-semibold">
              {tableHeaders.map(({ key, label }) => (
                <TableHead key={key}>
                  {key === 'checkbox' ? (
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={toggleSelectAll}
                      className={`bg-gray-primary h-4 w-4 cursor-pointer ${
                        allChecked ? 'accent-brand-primary' : ''
                      }`}
                      ref={(el) => {
                        if (el && 'indeterminate' in el) {
                          (el as HTMLInputElement).indeterminate =
                            isIndeterminate;
                        }
                      }}
                    />
                  ) : (
                    label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedTickets.map((ticket) => (
              <TableRow key={ticket.id} className="">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(ticket.id!)}
                    onCheckedChange={() => toggleItem(ticket.id!)}
                    className={`bg-gray-primary h-4 w-4 cursor-pointer ${
                      selectedIds.includes(ticket.id!)
                        ? 'accent-brand-primary'
                        : ''
                    }`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-outfit text-base font-normal text-black">
                      {ticket.created_by}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {ticket.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-outfit text-sm font-normal">
                  {ticket.status}
                </TableCell>
                <TableCell className="font-outfit text-base font-normal">
                  {ticket.timeAgo}
                </TableCell>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={ticket.avatarUrl || ''}
                      alt={ticket.created_by}
                    />
                    <AvatarFallback>
                      {ticket.created_by?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-outfit text-xs font-bold">
                  <span className="bg-black px-2 py-2 text-white">
                    {ticket.priority}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TableView;
