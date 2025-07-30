'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import ReusableDialog from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReusableDialog';
import AddAgent from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/AddAgent';
import { ReuseableTable } from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReuseableTable';

export interface OrderRow {
  TeamName: string;
  Lead: string;
  Status: string;
  Actions: string;
}

interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TeamTableProps {
  handleOpenDialog: () => void; // or add parameters if needed
}

export default function TeamTable({ handleOpenDialog }: TeamTableProps) {
  const orders: OrderRow[] = [
    {
      TeamName: 'Team A',
      Lead: 'Joshna Khadka',
      Status: 'Admin',
      Actions: '',
    },
    {
      TeamName: 'Team B',
      Lead: 'Joshna Khadka',
      Status: 'Admin',
      Actions: '',
    },
  ];

  const columns: Column<OrderRow>[] = [
    { key: 'TeamName', label: 'Team Name' },
    {
      key: 'Lead',
      label: 'Lead',
      render: (row) => (
        <div className="flex gap-[10px]">
          <div className="bg-gray-primary flex h-[20px] w-[20px] items-center justify-center rounded-[50px] px-[2px] py-[2px]">
            {' '}
            <span className="text-brand-primary flex w-[11px] items-center justify-center">
              {<Icons.ri_user_fill />}
            </span>{' '}
          </div>
          <span>{row.Lead}</span>
        </div>
      ),
    },
    { key: 'Status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-[10px]">
          <ReusableDialog
            trigger={
              <button aria-label="Edit agent">
                <Icons.ri_edit2_fill className="text-[#000]" />
              </button>
            }
            title="Add Agent"
          >
            <AddAgent
              defaultValues={{}}
              onSubmit={(data) => {
                console.log('sublitted', data);
              }}
            />
          </ReusableDialog>

          <button aria-label="View agent">
            <Icons.ri_eye_fill />
          </button>
          <button
            aria-label="Delete agent"
            onClick={handleOpenDialog}
            className="text-[#F61818]"
          >
            <Icons.ri_delete_bin_5_line />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ReuseableTable columns={columns} data={orders} />
    </>
  );
}
