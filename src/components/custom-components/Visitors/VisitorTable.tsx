'use client';

import React, { useMemo } from 'react';
import DataTable from '@/components/common/table/table';
import { ColumnDef } from '@tanstack/react-table';
import eyeIcon from '@/assets/images/eyeIcon.svg';
import blocked from '@/assets/images/Blocked.svg';
import inbox from '@/assets/images/Inbox.svg';
import Image from 'next/image';

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
  {
    id: 4,
    visitor: 'Guest 4',
    status: 'Inactive',
    lastActive: '1 hr ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 5,
    visitor: 'Guest 5',
    status: 'Active',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 6,
    visitor: 'Guest 6',
    status: 'Inactive',
    lastActive: '2 hrs ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 7,
    visitor: 'Guest 7',
    status: 'Active',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 8,
    visitor: 'Guest 8',
    status: 'Inactive',
    lastActive: '30 min ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 9,
    visitor: 'Guest 9',
    status: 'Active',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 10,
    visitor: 'Guest 10',
    status: 'Inactive',
    lastActive: '3 hrs ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 11,
    visitor: 'Guest 11',
    status: 'Inactive',
    lastActive: 'Currently Active',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'YES',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
  {
    id: 12,
    visitor: 'Guest 12',
    status: 'Inactive',
    lastActive: '1 hr ago',
    activeDuration: '00:24:46',
    numOfVisits: 12,
    engaged: 'NO',
    ipAddress: '192.147.761.255',
    action: 'action',
  },
];

const VisitorTable = () => {
  const data = useMemo(() => rawData, []);

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
        cell: () => (
          <div className="flex gap-3">
            <Image src={inbox} alt="Inbox" width={16} height={16} />
            <Image src={eyeIcon} alt="View" width={16} height={16} />
            <Image src={blocked} alt="Blocked" width={16} height={16} />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default VisitorTable;
