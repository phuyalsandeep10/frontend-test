'use client';

import React, { useMemo, useState, useRef } from 'react';
import DataTable from '@/components/common/table/table';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Icons } from '@/components/ui/Icons';
import VisitorDetailModal from '@/components/custom-components/Visitors/VisitorDetailModal';
import profile from '@/assets/images/profile.jpg';
import FilterComponent from './FilterComponent';
import DeleteModal from '@/components/modal/DeleteModal';

type VisitorData = {
  id: number;
  visitor: string;
  status?: string;
  lastActive: string;
  activeDuration: string;
  numOfVisits: number;
  engaged: string;
  ipAddress: string;
  action: string;
};

const rawData: VisitorData[] = [
  {
    id: 1,
    visitor: 'Guest 1',
    status: 'Active',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 2,
    visitor: 'Guest 2',
    status: 'Inactive',
    lastActive: '10 min ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 3,
    visitor: 'Guest 3',
    status: 'Active',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
];

const VisitorTable = () => {
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorData | null>(
    null,
  );
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPosition, setFilterPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleFilterClick = (e: React.MouseEvent) => {
    const icon = e.currentTarget as HTMLElement;
    const rect = icon.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY + 12,
      left: rect.left + window.scrollX + 12,
    });
    setIsFilterOpen((prev) => !prev);
  };

  const data = useMemo(() => rawData, []);

  const handleViewDetails = (visitor: VisitorData, event: React.MouseEvent) => {
    const eyeIcon = event.currentTarget as HTMLElement;
    const rect = eyeIcon.getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 330,
    });
    setSelectedVisitor(visitor);
  };

  const handleClose = () => {
    setSelectedVisitor(null);
    setModalPosition(null);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetVisitor, setDeleteTargetVisitor] =
    useState<VisitorData | null>(null);

  const statuses = [
    'Active',
    'Inactive',
    'Guest',
    'Engaged',
    'Registered Recently',
  ];
  const sortOptions = [
    'Oldest First',
    'Newest First',
    'A-Z (Name)',
    'Z-A (Name)',
    'Most Engaged',
  ];

  const columns: ColumnDef<VisitorData>[] = useMemo(
    () => [
      {
        accessorKey: 'visitor',
        header: 'Visitor',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'lastActive',
        header: 'Last Active',
        cell: ({ row }) => {
          const value = row.getValue('lastActive') as string;
          return (
            <span
              className={value === 'Currently Active' ? 'text-success' : ''}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'activeDuration',
        header: 'Active Duration',
      },
      {
        accessorKey: 'numOfVisits',
        header: 'Num of Visits',
      },
      {
        accessorKey: 'engaged',
        header: 'Engaged',
        cell: ({ row }) => {
          const value = row.getValue('engaged') as string;
          const isYes = value === 'YES';
          return (
            <span className={isYes ? 'text-success' : 'text-alert-prominent'}>
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'ipAddress',
        header: 'IP Address',
        cell: ({ row }) => {
          const ip = row.getValue('ipAddress') as string;
          const ipToCountryCode: Record<string, string> = {
            '192.147.761.255': 'NP',
          };
          const countryCode = ipToCountryCode[ip] || 'UN';
          const flagUrl = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
          return (
            <div className="flex items-center gap-2">
              <div className="border-border-grey/20 flex h-[24px] w-[24px] border p-[5px]">
                <Image
                  src={flagUrl}
                  alt={`${countryCode} flag`}
                  width={14}
                  height={10}
                  className="block"
                />
              </div>
              <span>{ip}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <div className="text-theme-text-primary flex gap-3">
            <Icons.ri_chat_ai_fill
              className="text-brand-primary h-4 w-4 cursor-pointer"
              onClick={() => console.log(`Chat with ${row.original.visitor}`)}
            />
            <Icons.ri_eye_fill
              className="text-info h-4 w-4 cursor-pointer"
              onClick={(e) => handleViewDetails(row.original, e)}
            />
            <Icons.ri_indeterminate_circle_fill
              className="text-alert-prominent h-4 w-4 cursor-pointer"
              onClick={() => {
                setDeleteTargetVisitor(row.original);
                setIsDeleteModalOpen(true);
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onFilterClick={handleFilterClick}
        showFilterIcon
        showSearch
      />

      {isDeleteModalOpen && deleteTargetVisitor && (
        <DeleteModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="Delete Ticket"
          description={`Are you sure you want to delete this ticket? This action cannot be undone.`}
          icon={<Icons.ri_delete_bin_7_fill className="text-alert-prominent" />}
          iconBgColor="bg-error-light"
          cancelText="Cancel"
          confirmText="Delete Ticket"
          cancelVariant="outline_gray"
          confirmVariant="destructive"
          cancelSize="sm"
          confirmSize="sm"
          onCancel={() => console.log('Cancel clicked')}
          onConfirm={() => {
            console.log(`Deleted!!`);
            setDeleteTargetVisitor(null);
          }}
        />
      )}

      {isFilterOpen && filterPosition && (
        <div
          style={{
            position: 'absolute',
            top: filterPosition.top,
            left: filterPosition.left,
            zIndex: 1000,
          }}
        >
          <FilterComponent
            statusOptions={statuses}
            sortOptions={sortOptions}
            statusLabel="Filter By Status"
            sortLabel="Filter By"
            onStatusChange={(statuses) => console.log('Statuses:', statuses)}
            onSortChange={(sort) => console.log('Sort Option:', sort)}
            getSortIcon={(option, isSelected) => {
              if (option === 'A-Z (Name)' || option === 'Z-A (Name)') {
                return isSelected ? (
                  <Icons.chevron_up className="h-2 w-2" />
                ) : (
                  <Icons.chevron_down className="h-2 w-2" />
                );
              }
              return null;
            }}
          />
        </div>
      )}
      {selectedVisitor && modalPosition && (
        <VisitorDetailModal
          name={selectedVisitor.visitor}
          image={profile.src}
          details={[
            { label: 'Email Address', value: 'Example123@gmail.com' },
            {
              label: 'Location',
              value: 'Madrid, Spain',
              icon: (
                <Icons.ri_map_pin_line className="text-theme-text-primary h-4 w-4" />
              ),
            },
            { label: 'Engaged', value: selectedVisitor.engaged },
            {
              label: 'IP Address',
              value: selectedVisitor.ipAddress,
              icon: (
                <Icons.ri_apple_line className="text-theme-text-primary h-4 w-4" />
              ),
            },
            {
              label: 'Browser',
              value: 'Brave',
              icon: (
                <Icons.ri_window_line className="text-theme-text-primary h-4 w-4" />
              ),
            },
            {
              label: 'Log in time',
              value: '10:22 AM',
              icon: (
                <Icons.ri_login_box_line className="text-theme-text-primary h-4 w-4" />
              ),
            },
          ]}
          activity={[
            {
              label: 'Visited: Dashboard',
              timestamp: 'Jun 17, 2025, 03:43 PM',
            },
            {
              label: 'Sent: Message',
              subLabel: 'Can I get a demo',
              timestamp: 'Jun 17, 2025, 03:43 PM',
            },
            {
              label: 'Visited: Signup',
              timestamp: 'Jun 17, 2025, 03:43 PM',
            },
          ]}
          onClose={handleClose}
          onStartChat={() =>
            console.log(`Start chat with ${selectedVisitor.visitor}`)
          }
          style={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

export default VisitorTable;
