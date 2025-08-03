'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import ReusableDialog from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReusableDialog';
import AddAgent from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/AddAgent';
import { ReuseableTable } from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents//ReuseableTable';
import { AgenChatHistoryCard } from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/AgenChatHistoryCard';
import MailIcon from '@/assets/images/mailIcon.svg';
import Image from 'next/image';

export interface OrderRow {
  invite: string;
  invite_Sent: string;
  status: string;
  Roles: string;
  OperatingHours: string;
  Actions: string;
}

interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
}

export interface InviteAgentProps {
  handleOpenDialog: (props: {
    heading: string;
    subheading: string;
    onAction: () => void;
    headericon?: React.ReactNode;
    submitButton?: string;
  }) => void;
}

export default function InviteTable({ handleOpenDialog }: InviteAgentProps) {
  const [modalData, setModalData] = useState<null | {
    type: string;
    row: OrderRow;
  }>(null);

  const orders: OrderRow[] = [
    {
      invite: 'unish@yahoo.com',
      invite_Sent: '08/07/2025',
      status: 'Sent',
      Roles: 'Admin',
      OperatingHours: '9:00 - 17:00',
      Actions: '',
    },
    {
      invite: 'yubeshkoirala11@gmail.com',
      invite_Sent: '08/07/2025',
      status: 'Rejected',
      Roles: 'Agent',
      OperatingHours: '9:00 - 17:00',
      Actions: '',
    },
  ];

  const columns: Column<OrderRow>[] = [
    { key: 'invite', label: 'Invited' },
    {
      key: 'invite_Sent',
      label: 'Invited sent on',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <div
          className="flex items-center gap-2"
          onClick={() =>
            handleOpenDialog({
              heading: 'Send Reminder',
              subheading:
                'Do you want to notify about the invitation you sent to join the workspace ?',
              onAction: () => {
                console.log('Operator deleted');
              },
              headericon: <Icons.ri_time_fill />,
            })
          }
        >
          <span>{row.status}</span>
          {row.status.toLowerCase().includes('sent') && (
            <Image
              src={MailIcon}
              alt="Mail Icon"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          )}
        </div>
      ),
    },
    {
      key: 'Roles',
      label: 'Roles',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.Roles.toLowerCase().includes('admin') ? (
            <Icons.ri_user_settings_fill />
          ) : (
            <Icons.ri_user_fill />
          )}
          <span>{row.Roles}</span>
        </div>
      ),
    },
    {
      key: 'OperatingHours',
      label: 'Operating Hours',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          {/* delete icon */}

          <button
            aria-label="Delete agent"
            onClick={() =>
              handleOpenDialog({
                heading: 'Delete Agent',
                subheading:
                  'This action will delete the agent. You can temporarily suspend the agent instead to retain their data.',
                onAction: () => {
                  console.log('Operator deleted');
                },
                headericon: <Icons.ri_delete_bin_7_fill />,
              })
            }
            className="text-[#F61818]"
          >
            <Icons.ri_delete_bin_5_line />
          </button>
        </div>
      ),
    },
  ];

  return <ReuseableTable columns={columns} data={orders} />;
}
