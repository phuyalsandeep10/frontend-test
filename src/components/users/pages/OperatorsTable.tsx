'use client';

import React, { useState } from 'react';
import { ReuseableTable } from '@/components/users/ReuseableTable';
import { Icons } from '@/components/ui/Icons';
import ReusableDialog from '@/components/users/ReusableDialog';
import AddAgent from '@/components/users/pages/AddAgent';

export interface OrderRow {
  FullName: string;
  Roles: string;
  Shift: string;
  OperatingHours: string;
  Invitedon: string;
  Actions: string;
}

interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
}

export default function OperatorsTable() {
  const [modalData, setModalData] = useState<null | {
    type: string;
    row: OrderRow;
  }>(null);

  const orders: OrderRow[] = [
    {
      FullName: 'Yubesh Koirala',
      Roles: 'Admin',
      Shift: 'morning',
      OperatingHours: '9:00 - 17:00',
      Invitedon: '08/07/2025',
      Actions: '',
    },
    {
      FullName: 'Yubesh Koirala',
      Roles: 'Agent',
      Shift: 'Day',
      OperatingHours: '9:00 - 17:00',
      Invitedon: '08/07/2025',
      Actions: '',
    },
  ];

  const columns: Column<OrderRow>[] = [
    { key: 'FullName', label: 'Full Name' },
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
    { key: 'Shift', label: 'Shift' },
    {
      key: 'OperatingHours',
      label: 'Operating Hours',
      render: (row) => {
        const isOperating = row.OperatingHours.trim() !== '';
        return (
          <div className="flex items-center gap-2">
            <span>{row.OperatingHours}</span>
            <span
              className={`h-2 w-2 rounded-full ${
                isOperating ? 'bg-[#009959]' : 'bg-[#F61818]'
              }`}
            ></span>
          </div>
        );
      },
    },
    { key: 'Invitedon', label: 'Invited on' },
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
          <button aria-label="Delete agent" className="text-[#F61818]">
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
