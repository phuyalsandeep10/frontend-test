'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/Icons';
import ReusableDialog from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReusableDialog';
import RoleForm from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/Roles/RoleForm';
import AddAgent from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/AddAgent';
import { ReuseableTable } from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReuseableTable';

export interface OrderRow {
  RoleName: string;
  agents: number;
  permission: string;
  date: string;
  Actions: string;
}

interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface RolesTableProps {
  handleOpenDialog: (options: {
    heading: string;
    subheading: string;
    onAction: () => void;
    headericon?: React.ReactNode;
  }) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({ handleOpenDialog }) => {
  const orders: OrderRow[] = [
    {
      RoleName: 'Agent',
      agents: 12,
      permission: 'Permission 1, Permission 2, Permission 3',
      date: '23, June, 2025',
      Actions: '',
    },
    {
      RoleName: 'Admin',
      agents: 7,
      permission: 'Permission 1, Permission 2, Permission 3',
      date: '06, August, 2025',
      Actions: '',
    },
  ];

  const columns: Column<OrderRow>[] = [
    { key: 'RoleName', label: 'Role Name' },
    { key: 'agents', label: 'No. of Agents' },
    { key: 'permission', label: 'Permission Summary' },
    { key: 'date', label: 'Created Date' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-[10px]">
          <ReusableDialog
            trigger={
              <button aria-label="Edit role">
                <Icons.ri_edit2_fill className="text-black" />
              </button>
            }
            title="Edit Role"
            dialogClass="!max-w-[676px] px-5"
          >
            <RoleForm
              defaultValues={{ roleName: row.RoleName }}
              onSubmit={(data) => console.log('Edited role:', data)}
            />
          </ReusableDialog>

          <button
            aria-label="Delete role"
            onClick={() =>
              handleOpenDialog({
                heading: 'Delete Role',
                subheading:
                  'This will remove all permissions assigned to this role. Are you sure you want to continue?',
                onAction: () => console.log('Deleted role:', row.RoleName),
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

  return (
    <div>
      {/* Header */}
      <div className="pb-6">
        <p className="text-brand-dark pb-1 text-sm leading-[21px] font-semibold">
          Workspace Roles
        </p>
        <span className="text-xs leading-[17px] font-normal">
          Customize roles to control what each team member can see and do.
        </span>
      </div>

      {/* Create Role Button */}
      <div className="flex justify-end gap-4 pb-4">
        <ReusableDialog
          trigger={
            <Button
              variant="outline"
              className="bg-brand-primary h-full max-h-[36px] rounded px-6 py-2.5 text-xs font-semibold text-white"
            >
              <Icons.plus_circle />
              Create New Role
            </Button>
          }
          title="Create New Role"
          dialogClass="!max-w-[676px] px-5"
        >
          <RoleForm
            onSubmit={(data) => {
              console.log('New role created:', data);
            }}
          />
        </ReusableDialog>
      </div>

      {/* Table */}
      <ReuseableTable columns={columns} data={orders} />
    </div>
  );
};

export default RolesTable;
